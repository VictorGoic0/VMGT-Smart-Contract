import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;

describe("VMGToken_v1", function () {
  async function deployToken() {
    const [owner, account1, account2] = await ethers.getSigners();
    const token = await ethers.deployContract("VMGToken_v1");
    await token.waitForDeployment();
    return { token, owner, account1, account2 };
  }

  // ---- Baseline ERC-20 (from V0) ----
  it("deploys with correct name and symbol", async function () {
    const { token } = await deployToken();
    expect(await token.name()).to.equal("VMGToken_v1");
    expect(await token.symbol()).to.equal("VMGT1");
  });

  it("mints the initial supply of 1,000,000 tokens to the deployer", async function () {
    const { token, owner } = await deployToken();
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
  });

  it("uses 18 decimals", async function () {
    const { token } = await deployToken();
    expect(await token.decimals()).to.equal(18);
  });

  it("owner() returns deployer", async function () {
    const { token, owner } = await deployToken();
    expect(await token.owner()).to.equal(owner.address);
  });

  it("reports balances correctly via balanceOf", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 10_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("transfers tokens correctly with transfer()", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 50_000n * 10n ** 18n;
    await expect(token.transfer(account1.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, account1.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("reverts transfers when balance is insufficient", async function () {
    const { token, account1, account2 } = await deployToken();
    await expect(
      token.connect(account1).transfer(account2.address, 1n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("reverts transfers to the zero address", async function () {
    const { token } = await deployToken();
    await expect(
      token.transfer(ethers.ZeroAddress, 1_000n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "ERC20InvalidReceiver");
  });

  it("sets allowance correctly with approve()", async function () {
    const { token, owner, account1 } = await deployToken();
    const allowanceAmount = 5_000n * 10n ** 18n;
    await expect(token.approve(account1.address, allowanceAmount))
      .to.emit(token, "Approval")
      .withArgs(owner.address, account1.address, allowanceAmount);
    expect(await token.allowance(owner.address, account1.address)).to.equal(allowanceAmount);
  });

  it("transferFrom transfers tokens using allowance", async function () {
    const { token, owner, account1 } = await deployToken();
    const allowanceAmount = 20_000n * 10n ** 18n;
    const spendAmount = 7_000n * 10n ** 18n;
    await token.approve(account1.address, allowanceAmount);
    await expect(
      token.connect(account1).transferFrom(owner.address, account1.address, spendAmount),
    )
      .to.emit(token, "Transfer")
      .withArgs(owner.address, account1.address, spendAmount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - spendAmount);
    expect(await token.balanceOf(account1.address)).to.equal(spendAmount);
  });

  it("reverts transferFrom when allowance is insufficient", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.approve(account1.address, 3_000n * 10n ** 18n);
    await expect(
      token.connect(account1).transferFrom(owner.address, account2.address, 5_000n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
  });

  // ---- Mint ----
  it("owner can mint new tokens", async function () {
    const { token, account1 } = await deployToken();
    const amount = 100_000n * 10n ** 18n;
    await token.mint(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("minting increases total supply", async function () {
    const { token, owner } = await deployToken();
    const amount = 50_000n * 10n ** 18n;
    await token.mint(owner.address, amount);
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY + amount);
  });

  it("minted tokens go to specified address", async function () {
    const { token, account1 } = await deployToken();
    const amount = 25_000n * 10n ** 18n;
    await token.mint(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("non-owner cannot mint tokens", async function () {
    const { token, account1, account2 } = await deployToken();
    await expect(
      token.connect(account1).mint(account2.address, 1n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("mint emits Transfer event from zero address", async function () {
    const { token, owner } = await deployToken();
    const amount = 10_000n * 10n ** 18n;
    await expect(token.mint(owner.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(ethers.ZeroAddress, owner.address, amount);
  });

  // ---- Burn ----
  it("token holder can burn their own tokens", async function () {
    const { token, owner } = await deployToken();
    const amount = 5_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
  });

  it("burning decreases total supply", async function () {
    const { token, owner } = await deployToken();
    const amount = 10_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - amount);
  });

  it("burning decreases holder balance", async function () {
    const { token, owner } = await deployToken();
    const amount = 20_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
  });

  it("burn emits Transfer event to zero address", async function () {
    const { token, owner } = await deployToken();
    const amount = 1_000n * 10n ** 18n;
    await expect(token.burn(amount))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, ethers.ZeroAddress, amount);
  });

  it("cannot burn more tokens than balance", async function () {
    const { token, account1 } = await deployToken();
    await expect(
      token.connect(account1).burn(1n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("token holder can approve and burnFrom", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 15_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    await token.approve(account1.address, amount);
    await token.connect(account1).burnFrom(owner.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - 2n * amount);
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - amount);
  });

  // ---- Pause ----
  it("owner can pause the contract", async function () {
    const { token } = await deployToken();
    await token.pause();
    expect(await token.paused()).to.equal(true);
  });

  it("transfers fail when contract is paused", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    await expect(
      token.transfer(account1.address, 1_000n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "EnforcedPause");
  });

  it("cannot transfer tokens while paused", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    await expect(
      token.transfer(account1.address, 1n * 10n ** 18n),
    ).to.be.revertedWithCustomError(token, "EnforcedPause");
  });

  it("owner can unpause the contract", async function () {
    const { token } = await deployToken();
    await token.pause();
    await token.unpause();
    expect(await token.paused()).to.equal(false);
  });

  it("transfers succeed after unpause", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    await token.unpause();
    const amount = 5_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("non-owner cannot pause contract", async function () {
    const { token, account1 } = await deployToken();
    await expect(token.connect(account1).pause()).to.be.revertedWithCustomError(
      token,
      "OwnableUnauthorizedAccount",
    );
  });

  it("non-owner cannot unpause contract", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    await expect(token.connect(account1).unpause()).to.be.revertedWithCustomError(
      token,
      "OwnableUnauthorizedAccount",
    );
  });

  it("pause emits Paused event", async function () {
    const { token, owner } = await deployToken();
    await expect(token.pause()).to.emit(token, "Paused").withArgs(owner.address);
  });

  it("unpause emits Unpaused event", async function () {
    const { token, owner } = await deployToken();
    await token.pause();
    await expect(token.unpause()).to.emit(token, "Unpaused").withArgs(owner.address);
  });

  it("can still burn tokens when paused", async function () {
    const { token, owner } = await deployToken();
    await token.pause();
    const amount = 1_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
  });

  it("owner can still mint tokens when paused", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    const amount = 30_000n * 10n ** 18n;
    await token.mint(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });
});

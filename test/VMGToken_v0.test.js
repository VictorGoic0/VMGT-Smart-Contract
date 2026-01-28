import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;

describe("VMGToken_v0", function () {
  async function deployToken() {
    const [deployer, account1, account2] = await ethers.getSigners();
    const token = await ethers.deployContract("VMGToken_v0");
    await token.waitForDeployment();
    return { token, deployer, account1, account2 };
  }

  it("deploys with correct name and symbol", async function () {
    const { token } = await deployToken();

    expect(await token.name()).to.equal("VMGToken_v0");
    expect(await token.symbol()).to.equal("VMGT0");
  });

  it("mints the initial supply of 1,000,000 tokens to the deployer", async function () {
    const { token, deployer } = await deployToken();

    const totalSupply = await token.totalSupply();
    const deployerBalance = await token.balanceOf(deployer.address);

    expect(totalSupply).to.equal(INITIAL_SUPPLY);
    expect(deployerBalance).to.equal(INITIAL_SUPPLY);
  });

  it("exposes totalSupply and INITIAL_SUPPLY consistently", async function () {
    const { token } = await deployToken();

    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(INITIAL_SUPPLY);
  });

  it("uses 18 decimals", async function () {
    const { token } = await deployToken();

    expect(await token.decimals()).to.equal(18);
  });

  it("reports balances correctly via balanceOf", async function () {
    const { token, deployer, account1 } = await deployToken();

    // transfer some tokens to account1
    const amount = 10_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);

    expect(await token.balanceOf(deployer.address)).to.equal(
      INITIAL_SUPPLY - amount,
    );
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("transfers tokens correctly with transfer()", async function () {
    const { token, deployer, account1 } = await deployToken();

    const amount = 50_000n * 10n ** 18n;

    await expect(token.transfer(account1.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(deployer.address, account1.address, amount);

    expect(await token.balanceOf(deployer.address)).to.equal(
      INITIAL_SUPPLY - amount,
    );
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("reverts transfers when balance is insufficient", async function () {
    const { token, account1, account2 } = await deployToken();

    const smallAmount = 1n * 10n ** 18n;

    // account1 starts with 0 tokens
    await expect(
      token.connect(account1).transfer(account2.address, smallAmount),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("reverts transfers to the zero address", async function () {
    const { token, deployer } = await deployToken();

    const amount = 1_000n * 10n ** 18n;

    await expect(
      token.transfer(ethers.ZeroAddress, amount),
    ).to.be.revertedWithCustomError(token, "ERC20InvalidReceiver");
  });

  it("sets allowance correctly with approve()", async function () {
    const { token, deployer, account1 } = await deployToken();

    const allowanceAmount = 5_000n * 10n ** 18n;

    await expect(token.approve(account1.address, allowanceAmount))
      .to.emit(token, "Approval")
      .withArgs(deployer.address, account1.address, allowanceAmount);

    expect(await token.allowance(deployer.address, account1.address)).to.equal(
      allowanceAmount,
    );
  });

  it("transferFrom transfers tokens using allowance and updates balances", async function () {
    const { token, deployer, account1 } = await deployToken();

    const allowanceAmount = 20_000n * 10n ** 18n;
    const spendAmount = 7_000n * 10n ** 18n;

    await token.approve(account1.address, allowanceAmount);

    await expect(
      token
        .connect(account1)
        .transferFrom(deployer.address, account1.address, spendAmount),
    )
      .to.emit(token, "Transfer")
      .withArgs(deployer.address, account1.address, spendAmount);

    expect(await token.balanceOf(deployer.address)).to.equal(
      INITIAL_SUPPLY - spendAmount,
    );
    expect(await token.balanceOf(account1.address)).to.equal(spendAmount);
  });

  it("transferFrom updates allowance after a transfer", async function () {
    const { token, deployer, account1 } = await deployToken();

    const allowanceAmount = 15_000n * 10n ** 18n;
    const spendAmount = 6_000n * 10n ** 18n;

    await token.approve(account1.address, allowanceAmount);

    await token
      .connect(account1)
      .transferFrom(deployer.address, account1.address, spendAmount);

    const remaining = allowanceAmount - spendAmount;
    expect(await token.allowance(deployer.address, account1.address)).to.equal(
      remaining,
    );
  });

  it("reverts transferFrom when allowance is insufficient", async function () {
    const { token, deployer, account1, account2 } = await deployToken();

    const allowanceAmount = 3_000n * 10n ** 18n;
    const spendAmount = 5_000n * 10n ** 18n;

    await token.approve(account1.address, allowanceAmount);

    await expect(
      token
        .connect(account1)
        .transferFrom(deployer.address, account2.address, spendAmount),
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
  });

  it("allowance() returns the correct value", async function () {
    const { token, deployer, account1 } = await deployToken();

    const allowanceAmount = 12_345n * 10n ** 18n;

    await token.approve(account1.address, allowanceAmount);

    expect(await token.allowance(deployer.address, account1.address)).to.equal(
      allowanceAmount,
    );
  });
});

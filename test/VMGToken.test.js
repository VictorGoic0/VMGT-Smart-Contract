import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;
const SUPPLY_CAP = 10_000_000n * 10n ** 18n;

describe("VMGToken (Production)", function () {
  async function deployToken() {
    const [owner, account1, account2, account3] = await ethers.getSigners();
    const token = await ethers.deployContract("VMGToken");
    await token.waitForDeployment();
    return { token, owner, account1, account2, account3 };
  }

  // ---- Baseline ERC-20 (from V0/V1) ----
  it("deploys with correct name and symbol", async function () {
    const { token } = await deployToken();
    expect(await token.name()).to.equal("VMGToken");
    expect(await token.symbol()).to.equal("VMGT");
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
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("transfers tokens correctly with transfer()", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 50_000n * 10n ** 18n;
    await expect(token.transfer(account1.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, account1.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  it("reverts transfers when balance is insufficient", async function () {
    const { token, account1, account2 } = await deployToken();
    await expect(
      token.connect(account1).transfer(account2.address, 1n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("reverts transfers to the zero address", async function () {
    const { token } = await deployToken();
    await expect(
      token.transfer(ethers.ZeroAddress, 1_000n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "ERC20InvalidReceiver");
  });

  it("sets allowance correctly with approve()", async function () {
    const { token, owner, account1 } = await deployToken();
    const allowanceAmount = 5_000n * 10n ** 18n;
    await expect(token.approve(account1.address, allowanceAmount))
      .to.emit(token, "Approval")
      .withArgs(owner.address, account1.address, allowanceAmount);
    expect(await token.allowance(owner.address, account1.address)).to.equal(
      allowanceAmount
    );
  });

  it("transferFrom transfers tokens using allowance", async function () {
    const { token, owner, account1 } = await deployToken();
    const allowanceAmount = 20_000n * 10n ** 18n;
    const spendAmount = 7_000n * 10n ** 18n;
    await token.approve(account1.address, allowanceAmount);
    await expect(
      token
        .connect(account1)
        .transferFrom(owner.address, account1.address, spendAmount)
    )
      .to.emit(token, "Transfer")
      .withArgs(owner.address, account1.address, spendAmount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - spendAmount
    );
    expect(await token.balanceOf(account1.address)).to.equal(spendAmount);
  });

  it("reverts transferFrom when allowance is insufficient", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.approve(account1.address, 3_000n * 10n ** 18n);
    await expect(
      token
        .connect(account1)
        .transferFrom(owner.address, account2.address, 5_000n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
  });

  // ---- Cap ----
  it("contract deploys with correct cap", async function () {
    const { token } = await deployToken();
    expect(await token.cap()).to.equal(SUPPLY_CAP);
  });

  it("cannot mint beyond cap", async function () {
    const { token, owner } = await deployToken();
    const extra = SUPPLY_CAP - INITIAL_SUPPLY;
    await expect(
      token.mint(owner.address, extra + 1n)
    ).to.be.revertedWithCustomError(token, "ERC20ExceededCap");
  });

  it("mint fails when cap would be exceeded", async function () {
    const { token, account1 } = await deployToken();
    const overCap = SUPPLY_CAP - INITIAL_SUPPLY + 1n;
    await expect(
      token.mint(account1.address, overCap)
    ).to.be.revertedWithCustomError(token, "ERC20ExceededCap");
  });

  it("getRemainingMintable returns correct value", async function () {
    const { token, owner } = await deployToken();
    expect(await token.remainingMintable()).to.equal(
      SUPPLY_CAP - INITIAL_SUPPLY
    );
    await token.mint(owner.address, 100_000n * 10n ** 18n);
    expect(await token.remainingMintable()).to.equal(
      SUPPLY_CAP - INITIAL_SUPPLY - 100_000n * 10n ** 18n
    );
  });

  // ---- Mint (V1 baseline, respects cap) ----
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

  it("non-owner cannot mint tokens", async function () {
    const { token, account1, account2 } = await deployToken();
    await expect(
      token.connect(account1).mint(account2.address, 1n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("mint emits Transfer event from zero address", async function () {
    const { token, owner } = await deployToken();
    const amount = 10_000n * 10n ** 18n;
    await expect(token.mint(owner.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(ethers.ZeroAddress, owner.address, amount);
  });

  // ---- Burn (V1 baseline) ----
  it("token holder can burn their own tokens", async function () {
    const { token, owner } = await deployToken();
    const amount = 5_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
  });

  it("burning decreases total supply", async function () {
    const { token, owner } = await deployToken();
    const amount = 10_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - amount);
  });

  it("cannot burn more tokens than balance", async function () {
    const { token, account1 } = await deployToken();
    await expect(
      token.connect(account1).burn(1n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });

  it("token holder can approve and burnFrom", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 15_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    await token.approve(account1.address, amount);
    await token.connect(account1).burnFrom(owner.address, amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - 2n * amount
    );
    expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY - amount);
  });

  // ---- Pause (V1 baseline) ----
  it("owner can pause the contract", async function () {
    const { token } = await deployToken();
    await token.pause();
    expect(await token.paused()).to.equal(true);
  });

  it("transfers fail when contract is paused", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    await expect(
      token.transfer(account1.address, 1_000n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "EnforcedPause");
  });

  it("owner can unpause the contract", async function () {
    const { token } = await deployToken();
    await token.pause();
    await token.unpause();
    expect(await token.paused()).to.equal(false);
  });

  it("non-owner cannot pause contract", async function () {
    const { token, account1 } = await deployToken();
    await expect(token.connect(account1).pause()).to.be.revertedWithCustomError(
      token,
      "OwnableUnauthorizedAccount"
    );
  });

  it("can still burn tokens when paused", async function () {
    const { token, owner } = await deployToken();
    await token.pause();
    const amount = 1_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
  });

  it("owner can still mint tokens when paused", async function () {
    const { token, account1 } = await deployToken();
    await token.pause();
    const amount = 30_000n * 10n ** 18n;
    await token.mint(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  // ---- Time-lock ----
  it("owner can lock tokens for an address", async function () {
    const { token, owner, account1 } = await deployToken();
    const amount = 50_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 3600n;
    await expect(token.lockTokens(account1.address, amount, unlockAt))
      .to.emit(token, "TokensLocked")
      .withArgs(account1.address, amount, unlockAt);
    expect(await token.getLockedBalance(account1.address)).to.equal(amount);
    expect(await token.getUnlockTime(account1.address)).to.equal(unlockAt);
  });

  it("locked balance is tracked correctly", async function () {
    const { token, account1 } = await deployToken();
    const amount = 20_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 3600n;
    await token.lockTokens(account1.address, amount, unlockAt);
    expect(await token.getLockedBalance(account1.address)).to.equal(amount);
  });

  it("unlock time is stored correctly", async function () {
    const { token, account1 } = await deployToken();
    await token.transfer(account1.address, 10_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 7200n;
    await token.lockTokens(account1.address, 5_000n * 10n ** 18n, unlockAt);
    expect(await token.getUnlockTime(account1.address)).to.equal(unlockAt);
  });

  it("cannot transfer locked tokens", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    const amount = 50_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 3600n;
    await token.lockTokens(account1.address, amount, unlockAt);
    await expect(
      token.connect(account1).transfer(account2.address, amount)
    ).to.be.revertedWith("VMGToken: transfer exceeds spendable (locked)");
  });

  it("can transfer unlocked tokens only", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    const total = 100_000n * 10n ** 18n;
    const lockedAmount = 40_000n * 10n ** 18n;
    await token.transfer(account1.address, total);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 3600n;
    await token.lockTokens(account1.address, lockedAmount, unlockAt);
    const spendable = total - lockedAmount;
    await token.connect(account1).transfer(account2.address, spendable);
    expect(await token.balanceOf(account2.address)).to.equal(spendable);
    expect(await token.balanceOf(account1.address)).to.equal(lockedAmount);
  });

  it("tokens automatically unlock after timestamp", async function () {
    const { token, account1 } = await deployToken();
    await token.transfer(account1.address, 10_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 2n;
    await token.lockTokens(account1.address, 10_000n * 10n ** 18n, unlockAt);
    expect(await token.isUnlocked(account1.address)).to.equal(false);
    await ethers.provider.send("evm_increaseTime", [3]);
    await ethers.provider.send("evm_mine", []);
    expect(await token.getLockedBalance(account1.address)).to.equal(0n);
    expect(await token.isUnlocked(account1.address)).to.equal(true);
  });

  it("can transfer all tokens after unlock time", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    const amount = 25_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 2n;
    await token.lockTokens(account1.address, amount, unlockAt);
    await ethers.provider.send("evm_increaseTime", [3]);
    await ethers.provider.send("evm_mine", []);
    await token.connect(account1).transfer(account2.address, amount);
    expect(await token.balanceOf(account2.address)).to.equal(amount);
    expect(await token.balanceOf(account1.address)).to.equal(0n);
  });

  it("lockTokens reverts when lock amount exceeds balance", async function () {
    const { token, account1 } = await deployToken();
    await token.transfer(account1.address, 1_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    await expect(
      token.lockTokens(
        account1.address,
        2_000n * 10n ** 18n,
        BigInt(block.timestamp) + 3600n
      )
    ).to.be.revertedWith("VMGToken: lock amount exceeds balance");
  });

  it("non-owner cannot lock tokens", async function () {
    const { token, account1, account2 } = await deployToken();
    await token.transfer(account1.address, 10_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    await expect(
      token
        .connect(account1)
        .lockTokens(
          account2.address,
          5_000n * 10n ** 18n,
          BigInt(block.timestamp) + 3600n
        )
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("unlockTokens clears lock after timestamp", async function () {
    const { token, account1 } = await deployToken();
    await token.transfer(account1.address, 10_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    const unlockAt = BigInt(block.timestamp) + 2n;
    await token.lockTokens(account1.address, 10_000n * 10n ** 18n, unlockAt);
    await ethers.provider.send("evm_increaseTime", [3]);
    await ethers.provider.send("evm_mine", []);
    await expect(token.unlockTokens(account1.address))
      .to.emit(token, "TokensUnlocked")
      .withArgs(account1.address, 10_000n * 10n ** 18n);
    expect(await token.getLockedBalance(account1.address)).to.equal(0n);
    expect(await token.getUnlockTime(account1.address)).to.equal(0n);
  });

  // ---- Transfer tax ----
  it("owner can set tax rate", async function () {
    const { token, owner } = await deployToken();
    await token.setTaxRate(100n);
    expect(await token.taxRate()).to.equal(100n);
  });

  it("tax rate cannot exceed maximum (5%)", async function () {
    const { token } = await deployToken();
    await expect(token.setTaxRate(501n)).to.be.revertedWith(
      "VMGToken: tax rate max 5%"
    );
    await token.setTaxRate(500n);
    expect(await token.taxRate()).to.equal(500n);
  });

  it("owner can set tax recipient", async function () {
    const { token, owner, account1 } = await deployToken();
    await token.setTaxRecipient(account1.address);
    expect(await token.taxRecipient()).to.equal(account1.address);
  });

  it("setTaxRecipient reverts for zero address", async function () {
    const { token } = await deployToken();
    await expect(token.setTaxRecipient(ethers.ZeroAddress)).to.be.revertedWith(
      "VMGToken: tax recipient zero"
    );
  });

  it("transfer collects correct tax amount", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.setTaxRecipient(account2.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const amount = 10_000n * 10n ** 18n;
    const expectedTax = (amount * 100n) / 10_000n;
    const expectedNet = amount - expectedTax;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(expectedNet);
    expect(await token.balanceOf(account2.address)).to.equal(expectedTax);
  });

  it("tax is sent to tax recipient", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.setTaxRecipient(account2.address);
    await token.setTaxRate(200n);
    await token.setTaxEnabled(true);
    const amount = 5_000n * 10n ** 18n;
    const expectedTax = (amount * 200n) / 10_000n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account2.address)).to.equal(expectedTax);
  });

  it("recipient receives amount minus tax", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.setTaxRecipient(account2.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const amount = 10_000n * 10n ** 18n;
    const expectedNet = amount - (amount * 100n) / 10_000n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(expectedNet);
  });

  it("transfer with tax emits TaxCollected event", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.setTaxRecipient(account2.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const amount = 10_000n * 10n ** 18n;
    const expectedTax = (amount * 100n) / 10_000n;
    await expect(token.transfer(account1.address, amount))
      .to.emit(token, "TaxCollected")
      .withArgs(account2.address, expectedTax);
  });

  it("minting does not trigger tax", async function () {
    const { token, owner, account1 } = await deployToken();
    await token.setTaxRecipient(account1.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const before = await token.balanceOf(account1.address);
    await token.mint(account1.address, 50_000n * 10n ** 18n);
    expect(await token.balanceOf(account1.address)).to.equal(
      50_000n * 10n ** 18n
    );
    expect(await token.balanceOf(account1.address)).to.equal(
      before + 50_000n * 10n ** 18n
    );
  });

  it("burning does not trigger tax", async function () {
    const { token, owner, account1 } = await deployToken();
    await token.setTaxRecipient(account1.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const amount = 10_000n * 10n ** 18n;
    await token.burn(amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
    expect(await token.balanceOf(account1.address)).to.equal(0n);
  });

  it("owner can enable/disable tax", async function () {
    const { token } = await deployToken();
    await token.setTaxEnabled(true);
    expect(await token.taxEnabled()).to.equal(true);
    await token.setTaxEnabled(false);
    expect(await token.taxEnabled()).to.equal(false);
  });

  it("transfers work without tax when disabled", async function () {
    const { token, owner, account1, account2 } = await deployToken();
    await token.setTaxRecipient(account2.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    await token.setTaxEnabled(false);
    const amount = 10_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
    expect(await token.balanceOf(account2.address)).to.equal(0n);
  });

  it("non-owner cannot set tax rate", async function () {
    const { token, account1 } = await deployToken();
    await expect(
      token.connect(account1).setTaxRate(100n)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("transfer to tax recipient does not apply tax again", async function () {
    const { token, owner, account1 } = await deployToken();
    await token.setTaxRecipient(account1.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    const amount = 10_000n * 10n ** 18n;
    await token.transfer(account1.address, amount);
    expect(await token.balanceOf(account1.address)).to.equal(amount);
  });

  // ---- Integration ----
  it("all features work together: cap, lock, tax, pause", async function () {
    const { token, owner, account1, account2, account3 } = await deployToken();
    expect(await token.cap()).to.equal(SUPPLY_CAP);
    expect(await token.remainingMintable()).to.equal(
      SUPPLY_CAP - INITIAL_SUPPLY
    );

    await token.mint(owner.address, 1_000_000n * 10n ** 18n);
    expect(await token.totalSupply()).to.equal(2_000_000n * 10n ** 18n);

    await token.transfer(account1.address, 100_000n * 10n ** 18n);
    const block = await ethers.provider.getBlock("latest");
    await token.lockTokens(
      account1.address,
      50_000n * 10n ** 18n,
      BigInt(block.timestamp) + 3600n
    );
    await token
      .connect(account1)
      .transfer(account2.address, 50_000n * 10n ** 18n);
    expect(await token.balanceOf(account2.address)).to.equal(
      50_000n * 10n ** 18n
    );

    await token.setTaxRecipient(account3.address);
    await token.setTaxRate(100n);
    await token.setTaxEnabled(true);
    await token.transfer(account1.address, 10_000n * 10n ** 18n);
    expect(await token.balanceOf(account3.address)).to.equal(100n * 10n ** 18n);

    await token.pause();
    await expect(
      token.transfer(account2.address, 1_000n * 10n ** 18n)
    ).to.be.revertedWithCustomError(token, "EnforcedPause");
    await token.unpause();
    await token.setTaxEnabled(false);
    await token.transfer(account2.address, 1_000n * 10n ** 18n);
    expect(await token.balanceOf(account2.address)).to.equal(
      51_000n * 10n ** 18n
    );
  });
});

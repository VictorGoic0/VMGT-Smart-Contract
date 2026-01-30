/**
 * Deploy VMGToken_v2 to the connected network.
 * Run on local: npx hardhat run scripts/deploy-v2.js
 * Run on Sepolia: npx hardhat run scripts/deploy-v2.js --network sepolia
 *
 * After Sepolia deploy, verify on Etherscan (if @nomicfoundation/hardhat-verify is installed):
 *   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
 * VMGToken_v2 has no constructor arguments.
 */
import { network } from "hardhat";

const { ethers } = await network.connect();

const [deployer] = await ethers.getSigners();

const CAP = 10_000_000n * 10n ** 18n;
const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;

console.log("Deployer address:", deployer.address);
const balance = await ethers.provider.getBalance(deployer.address);
console.log("Deployer balance (wei):", balance.toString());
console.log("Deployer balance (ETH):", ethers.formatEther(balance));

const token = await ethers.deployContract("VMGToken_v2");

await token.waitForDeployment();

const address = await token.getAddress();
console.log("VMGToken_v2 deployed to:", address);

const totalSupply = await token.totalSupply();
const deployerBalance = await token.balanceOf(deployer.address);
const owner = await token.owner();
const cap = await token.cap();
const remainingMintable = await token.remainingMintable();

console.log("Cap (max supply):", cap.toString());
console.log("Initial token supply:", totalSupply.toString());
console.log("Deployer token balance:", deployerBalance.toString());
console.log("Owner address:", owner);
console.log("Remaining mintable:", remainingMintable.toString());

const deployTx = token.deploymentTransaction();
if (deployTx) {
  const receipt = await deployTx.wait();
  if (receipt) {
    console.log("Gas used:", receipt.gasUsed.toString());
  }
}

// Set initial tax: 1% (100 basis points), recipient = deployer
const taxRateBps = 100n;
await token.setTaxRecipient(deployer.address);
await token.setTaxRate(taxRateBps);
await token.setTaxEnabled(true);
console.log("Tax configured: rate 1% (100 bps), recipient:", deployer.address);

const currentNetwork = network.name ?? "unknown";
if (currentNetwork === "sepolia") {
  console.log("\n--- Sepolia deployment ---");
  console.log("Contract address (save this):", address);
  console.log("Verify with: npx hardhat verify --network sepolia", address);
}

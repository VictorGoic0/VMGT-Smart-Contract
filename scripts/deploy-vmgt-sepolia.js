/**
 * Deploy VMGToken (production contract) to Sepolia for final test before mainnet.
 * Same contract and constructor as mainnet; use this to verify deployment flow.
 *
 * Run: npx hardhat run scripts/deploy-vmgt-sepolia.js --network sepolia
 *
 * After deploy, verify on Etherscan:
 *   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
 */
import { network } from "hardhat";

const { ethers } = await network.connect();

const [deployer] = await ethers.getSigners();

console.log("Deployer address:", deployer.address);
const balance = await ethers.provider.getBalance(deployer.address);
console.log("Deployer balance (ETH):", ethers.formatEther(balance));

const token = await ethers.deployContract("VMGToken");
await token.waitForDeployment();

const address = await token.getAddress();
console.log("VMGToken deployed to:", address);

const totalSupply = await token.totalSupply();
const deployerBalance = await token.balanceOf(deployer.address);
const owner = await token.owner();
const cap = await token.cap();
const name = await token.name();
const symbol = await token.symbol();

console.log("Name:", name);
console.log("Symbol:", symbol);
console.log("Cap (max supply):", ethers.formatEther(cap));
console.log("Total supply:", ethers.formatEther(totalSupply));
console.log("Deployer token balance:", ethers.formatEther(deployerBalance));
console.log("Owner:", owner);

const deployTx = token.deploymentTransaction();
if (deployTx) {
  const receipt = await deployTx.wait();
  if (receipt) {
    console.log("Gas used:", receipt.gasUsed.toString());
  }
}

console.log("\n--- Sepolia test deploy (VMGToken) ---");
console.log("Contract address (save for verification):", address);
console.log("Verify: npx hardhat verify --network sepolia", address);
console.log(
  "\nWhen ready for mainnet, use: npx hardhat run scripts/deploy-mainnet.js --network mainnet"
);

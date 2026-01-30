/**
 * Deploy VMGToken_v1 to the connected network.
 * Run on local: npx hardhat run scripts/deploy-v1.js
 * Run on Sepolia: npx hardhat run scripts/deploy-v1.js --network sepolia
 */
import { network } from "hardhat";

const { ethers } = await network.connect();

const [deployer] = await ethers.getSigners();

console.log("Deployer address:", deployer.address);
const balance = await ethers.provider.getBalance(deployer.address);
console.log("Deployer balance (wei):", balance.toString());
console.log("Deployer balance (ETH):", ethers.formatEther(balance));

const token = await ethers.deployContract("VMGToken_v1");

await token.waitForDeployment();

const address = await token.getAddress();
console.log("VMGToken_v1 deployed to:", address);

const totalSupply = await token.totalSupply();
const deployerBalance = await token.balanceOf(deployer.address);
const owner = await token.owner();
console.log("Initial token supply:", totalSupply.toString());
console.log("Deployer token balance:", deployerBalance.toString());
console.log("Owner address:", owner);

const deployTx = token.deploymentTransaction();
if (deployTx) {
  const receipt = await deployTx.wait();
  if (receipt) {
    console.log("Gas used:", receipt.gasUsed.toString());
  }
}

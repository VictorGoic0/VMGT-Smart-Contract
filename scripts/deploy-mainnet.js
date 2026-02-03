/**
 * VMGToken Production Mainnet Deployment Script
 *
 * CRITICAL: This script deploys to ETHEREUM MAINNET using REAL ETH.
 *
 * Prerequisites:
 * 1. MAINNET_RPC_URL in .env (Alchemy/Infura mainnet endpoint)
 * 2. MAINNET_PRIVATE_KEY in .env (deployer wallet with sufficient ETH)
 * 3. ETHERSCAN_API_KEY in .env (for verification)
 * 4. Estimated gas cost: 0.01-0.05 ETH (varies with gas prices)
 *
 * Safety Checks:
 * - Confirms network is mainnet
 * - Displays deployer address and balance
 * - Shows estimated gas costs
 * - Requires manual confirmation before deployment
 *
 * Usage:
 *   npx hardhat run scripts/deploy-mainnet.js --network mainnet
 */

import { ethers, network } from "hardhat";

async function main() {
  console.log("\n=".repeat(80));
  console.log("VMGToken Production Mainnet Deployment");
  console.log("=".repeat(80));

  // Safety check: Ensure we're on mainnet
  const chainId = (await ethers.provider.getNetwork()).chainId;
  console.log(`\n📡 Network: ${network.name}`);
  console.log(`🔗 Chain ID: ${chainId}`);

  if (chainId !== 1n) {
    console.error("\n❌ ERROR: Not on Ethereum Mainnet (Chain ID 1)");
    console.error("   Current Chain ID:", chainId);
    console.error("   Use --network mainnet flag");
    process.exit(1);
  }

  console.log("✅ Confirmed: Ethereum Mainnet");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await ethers.provider.getBalance(deployerAddress);
  const balanceEth = ethers.formatEther(balance);

  console.log("\n" + "=".repeat(80));
  console.log("Deployer Information");
  console.log("=".repeat(80));
  console.log(`Address: ${deployerAddress}`);
  console.log(`Balance: ${balanceEth} ETH`);

  // Check sufficient balance
  const minBalanceRequired = ethers.parseEther("0.01"); // Minimum 0.01 ETH
  if (balance < minBalanceRequired) {
    console.error("\n❌ ERROR: Insufficient balance for deployment");
    console.error(`   Current: ${balanceEth} ETH`);
    console.error(`   Required: At least 0.01 ETH`);
    process.exit(1);
  }

  console.log("✅ Sufficient balance for deployment");

  // Display contract parameters
  console.log("\n" + "=".repeat(80));
  console.log("Contract Parameters");
  console.log("=".repeat(80));
  console.log("Name:           VMGToken");
  console.log("Symbol:         VMGT");
  console.log("Initial Supply: 1,000,000 VMGT");
  console.log("Supply Cap:     10,000,000 VMGT");
  console.log("Decimals:       18");
  console.log("Owner:          " + deployerAddress);
  console.log("Paused:         false (transfers enabled)");
  console.log("Tax:            disabled (can be enabled by owner)");

  // Estimate gas costs
  console.log("\n" + "=".repeat(80));
  console.log("Gas Estimation");
  console.log("=".repeat(80));

  const VMGToken = await ethers.getContractFactory("VMGToken");
  const deploymentData = VMGToken.getDeployTransaction();
  const gasEstimate = await ethers.provider.estimateGas({
    data: deploymentData.data,
    from: deployerAddress,
  });

  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || ethers.parseUnits("50", "gwei"); // Fallback to 50 gwei
  const estimatedCost = gasEstimate * gasPrice;
  const estimatedCostEth = ethers.formatEther(estimatedCost);

  console.log(`Estimated Gas: ${gasEstimate.toString()} units`);
  console.log(`Gas Price:     ${ethers.formatUnits(gasPrice, "gwei")} gwei`);
  console.log(`Estimated Cost: ${estimatedCostEth} ETH`);
  console.log(
    `Remaining After: ${(
      parseFloat(balanceEth) - parseFloat(estimatedCostEth)
    ).toFixed(6)} ETH`
  );

  // Final confirmation
  console.log("\n" + "=".repeat(80));
  console.log("⚠️  FINAL CONFIRMATION REQUIRED");
  console.log("=".repeat(80));
  console.log("You are about to deploy VMGToken to ETHEREUM MAINNET.");
  console.log("This will use REAL ETH and cannot be undone.");
  console.log("\nTo proceed:");
  console.log("1. Review all parameters above");
  console.log("2. Ensure deployer address is correct");
  console.log("3. Verify sufficient ETH balance");
  console.log("4. Uncomment the deployment code in this script");
  console.log("\n⚠️  DEPLOYMENT CODE IS COMMENTED OUT FOR SAFETY");
  console.log("=".repeat(80));

  // DEPLOYMENT CODE - UNCOMMENT WHEN READY
  /*
  console.log("\n🚀 Starting deployment...\n");
  
  const token = await VMGToken.deploy();
  console.log("⏳ Waiting for deployment transaction...");
  
  await token.waitForDeployment();
  const contractAddress = await token.getAddress();
  
  console.log("\n" + "=".repeat(80));
  console.log("✅ DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(80));
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`Deployer:         ${deployerAddress}`);
  console.log(`Network:          Ethereum Mainnet`);
  console.log(`Chain ID:         1`);
  
  // Get deployment transaction details
  const deploymentTx = token.deploymentTransaction();
  if (deploymentTx) {
    console.log(`Transaction Hash: ${deploymentTx.hash}`);
    console.log(`Block Number:     ${deploymentTx.blockNumber || "Pending"}`);
    
    // Wait for receipt to get actual gas used
    const receipt = await deploymentTx.wait();
    if (receipt) {
      const gasUsed = receipt.gasUsed;
      const effectiveGasPrice = receipt.gasPrice || gasPrice;
      const actualCost = gasUsed * effectiveGasPrice;
      const actualCostEth = ethers.formatEther(actualCost);
      
      console.log(`Gas Used:         ${gasUsed.toString()} units`);
      console.log(`Effective Gas Price: ${ethers.formatUnits(effectiveGasPrice, "gwei")} gwei`);
      console.log(`Actual Cost:      ${actualCostEth} ETH`);
    }
  }
  
  // Verify contract state
  console.log("\n" + "=".repeat(80));
  console.log("Contract Verification");
  console.log("=".repeat(80));
  
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const cap = await token.cap();
  const owner = await token.owner();
  const paused = await token.paused();
  const deployerBalance = await token.balanceOf(deployerAddress);
  
  console.log(`Name:           ${name}`);
  console.log(`Symbol:         ${symbol}`);
  console.log(`Decimals:       ${decimals}`);
  console.log(`Total Supply:   ${ethers.formatEther(totalSupply)} ${symbol}`);
  console.log(`Supply Cap:     ${ethers.formatEther(cap)} ${symbol}`);
  console.log(`Owner:          ${owner}`);
  console.log(`Paused:         ${paused}`);
  console.log(`Deployer Balance: ${ethers.formatEther(deployerBalance)} ${symbol}`);
  
  // Verify owner
  if (owner.toLowerCase() === deployerAddress.toLowerCase()) {
    console.log("✅ Owner correctly set to deployer");
  } else {
    console.log("⚠️  WARNING: Owner mismatch!");
  }
  
  // Verify initial supply
  const expectedSupply = ethers.parseEther("1000000");
  if (totalSupply === expectedSupply) {
    console.log("✅ Initial supply correct (1,000,000 VMGT)");
  } else {
    console.log("⚠️  WARNING: Initial supply mismatch!");
  }
  
  // Next steps
  console.log("\n" + "=".repeat(80));
  console.log("Next Steps");
  console.log("=".repeat(80));
  console.log("1. Verify contract on Etherscan:");
  console.log(`   npx hardhat verify --network mainnet ${contractAddress}`);
  console.log("\n2. Add to MetaMask:");
  console.log(`   Token Address: ${contractAddress}`);
  console.log(`   Token Symbol:  VMGT`);
  console.log(`   Decimals:      18`);
  console.log("\n3. Test basic functions:");
  console.log("   - View balance in MetaMask");
  console.log("   - Perform small test transfer");
  console.log("   - Verify on Etherscan");
  console.log("\n4. Update documentation:");
  console.log("   - Add contract address to DEPLOYMENT-HISTORY.md");
  console.log("   - Update README.md with mainnet info");
  console.log("   - Save deployment transaction details");
  console.log("\n5. Security considerations:");
  console.log("   - Consider transferring ownership to multisig");
  console.log("   - Monitor contract events");
  console.log("   - Keep private keys secure");
  
  console.log("\n" + "=".repeat(80));
  console.log("Etherscan Links");
  console.log("=".repeat(80));
  console.log(`Contract: https://etherscan.io/address/${contractAddress}`);
  if (deploymentTx) {
    console.log(`Transaction: https://etherscan.io/tx/${deploymentTx.hash}`);
  }
  
  console.log("\n" + "=".repeat(80));
  console.log("✅ Deployment Complete!");
  console.log("=".repeat(80));
  */

  console.log("\n⚠️  Deployment code is commented out for safety.");
  console.log(
    "Review the script and uncomment the deployment section when ready.\n"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n" + "=".repeat(80));
    console.error("❌ DEPLOYMENT FAILED");
    console.error("=".repeat(80));
    console.error(error);
    process.exit(1);
  });

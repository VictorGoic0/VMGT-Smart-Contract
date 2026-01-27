# Tasks - V0: Basic ERC-20 Token

**PRD Reference**: Day 0 MVP - Basic ERC-20

This file contains all tasks for setting up the development environment and implementing the basic ERC-20 token contract (VMGToken_v0 / VMGT0).

---

## PR #1: Environment Setup & Prerequisites

**Description**: Set up development environment, install necessary tools, and acquire testnet ETH for deployment.

**PRD Section**: Technical Requirements - Development tools and testnet preparation

### Tasks:

1. [x] Install Node.js and npm (if not already installed)
2. [x] Install Hardhat development framework (`npm install --save-dev hardhat`)
3. [x] Initialize new Hardhat project (`npx hardhat init`)
4. [x] Install OpenZeppelin contracts library (`npm install @openzeppelin/contracts`)
5. [x] Configure Hardhat for Sepolia testnet in `hardhat.config.js`
6. [x] Create `.env` file for private keys and API keys
7. [x] Add `.env` to `.gitignore`
8. [x] Get Infura or Alchemy API key for Ethereum node access
9. [x] Set up MetaMask browser extension (if not already set up)
10. [x] Create primary MetaMask account for deployment
11. [x] Create secondary MetaMask account for testing transfers
12. [x] Get Sepolia testnet ETH from faucet (https://sepoliafaucet.com or similar)
13. [x] Verify testnet ETH received in MetaMask
14. [x] Install Etherscan API key for contract verification (optional but recommended)
15. [x] Create project directory structure (contracts/, test/, scripts/)

---

## PR #2: Basic ERC-20 Contract Implementation

**Description**: Implement core ERC-20 token contract with standard functionality.

**PRD Section**: Day 0 MVP - Core Features (Mint, Transfer, Balance, Approve)

### Tasks:

1. [x] Create `VMGToken_v0.sol` contract file in `contracts/` directory
2. [x] Import OpenZeppelin ERC-20 base contract
3. [x] Define contract with name "VMGToken_v0" and symbol "VMGT0"
4. [x] Implement constructor to mint 1,000,000 tokens to deployer address
5. [x] Set token decimals to 18 (standard ERC-20 decimal places)
6. [x] Verify `transfer()` function is inherited from OpenZeppelin
7. [x] Verify `balanceOf()` function is inherited from OpenZeppelin
8. [x] Verify `approve()` function is inherited from OpenZeppelin
9. [x] Verify `transferFrom()` function is inherited from OpenZeppelin
10. [x] Verify `allowance()` function is inherited from OpenZeppelin
11. [x] Add comments documenting contract purpose and functions
12. [x] Compile contract (`npx hardhat compile`)
13. [x] Fix any compilation errors
14. [x] Review OpenZeppelin ERC-20 implementation for understanding

---

## PR #3: Deployment Script

**Description**: Create deployment script for testnet deployment.

**PRD Section**: Day 0 MVP - Deploy to Ethereum testnet (Sepolia)

### Tasks:

1. [ ] Create `deploy-v0.js` script in `scripts/` directory
2. [ ] Import Hardhat ethers library
3. [ ] Write deployment function to deploy VMGToken_v0
4. [ ] Log deployer address and balance before deployment
5. [ ] Log contract address after deployment
6. [ ] Log initial token supply and deployer token balance
7. [ ] Add gas estimation logging
8. [ ] Test deployment script on Hardhat local network first
9. [ ] Deploy contract to Sepolia testnet (`npx hardhat run scripts/deploy-v0.js --network sepolia`)
10. [ ] Save contract address from deployment
11. [ ] Verify contract on Etherscan (`npx hardhat verify --network sepolia <address>`)
12. [ ] Check contract on Sepolia Etherscan
13. [ ] Confirm token details are correct on Etherscan

---

## PR #4: Unit Tests

**Description**: Write comprehensive unit tests for all ERC-20 functionality.

**PRD Section**: Testing Strategy - Unit tests for all contract functions

### Tasks:

1. [ ] Create `VMGToken_v0.test.js` in `test/` directory
2. [ ] Set up test fixtures and deployment helper
3. [ ] Write test: Contract deploys with correct name and symbol
4. [ ] Write test: Initial supply is 1,000,000 tokens
5. [ ] Write test: Deployer receives all initial tokens
6. [ ] Write test: Total supply is correct
7. [ ] Write test: Decimals is 18
8. [ ] Write test: `balanceOf()` returns correct balances
9. [ ] Write test: `transfer()` transfers tokens correctly
10. [ ] Write test: `transfer()` emits Transfer event
11. [ ] Write test: `transfer()` fails when insufficient balance
12. [ ] Write test: `transfer()` fails when transferring to zero address
13. [ ] Write test: `approve()` sets allowance correctly
14. [ ] Write test: `approve()` emits Approval event
15. [ ] Write test: `transferFrom()` transfers tokens with allowance
16. [ ] Write test: `transferFrom()` updates allowance after transfer
17. [ ] Write test: `transferFrom()` fails without sufficient allowance
18. [ ] Write test: `allowance()` returns correct allowance
19. [ ] Run all tests (`npx hardhat test`)
20. [ ] Ensure 100% test coverage for implemented features
21. [ ] Fix any failing tests

---

## PR #5: MetaMask Token Transfer Testing

**Description**: Manually test token transfers using MetaMask.

**PRD Section**: Day 0 MVP - Test token transfer using MetaMask

### Tasks:

1. [ ] Add VMGToken_v0 to MetaMask on primary account (import custom token)
2. [ ] Verify 1,000,000 tokens visible in primary account
3. [ ] Copy secondary account address
4. [ ] Initiate transfer of 10,000 tokens to secondary account
5. [ ] Confirm transaction in MetaMask
6. [ ] Wait for transaction confirmation on Sepolia
7. [ ] Check transaction on Sepolia Etherscan
8. [ ] Add VMGToken_v0 to MetaMask on secondary account
9. [ ] Verify 10,000 tokens received in secondary account
10. [ ] Verify primary account now has 990,000 tokens
11. [ ] Test transfer back from secondary to primary (5,000 tokens)
12. [ ] Verify balances update correctly
13. [ ] Screenshot transaction history for documentation

---

## PR #6: Documentation

**Description**: Create comprehensive documentation for V0 deployment.

**PRD Section**: Documentation Requirements - Deployment instructions

### Tasks:

1. [ ] Create `README-v0.md` file
2. [ ] Document project overview and purpose
3. [ ] List prerequisites and dependencies
4. [ ] Write setup instructions (installation steps)
5. [ ] Document how to get testnet ETH
6. [ ] Write compilation instructions
7. [ ] Write deployment instructions for testnet
8. [ ] Document how to verify contract on Etherscan
9. [ ] Write testing instructions
10. [ ] Document MetaMask setup for viewing tokens
11. [ ] Include contract address on Sepolia
12. [ ] Include Etherscan link to deployed contract
13. [ ] Document token specifications (name, symbol, supply)
14. [ ] List all implemented ERC-20 functions
15. [ ] Add troubleshooting section
16. [ ] Include gas costs for deployment
17. [ ] Document MetaMask transfer testing process
18. [ ] Add screenshots of successful deployment and transfers
19. [ ] Create `DEPLOYMENT-HISTORY.md` to track all deployments
20. [ ] Add V0 deployment details to deployment history (date, address, network, gas used)

---

## V0 Completion Checklist

- [ ] All PR tasks completed
- [ ] Contract successfully deployed to Sepolia testnet
- [ ] All unit tests passing
- [ ] Token transfers tested successfully in MetaMask
- [ ] Documentation complete and accurate
- [ ] Contract verified on Etherscan
- [ ] Ready to proceed to V1

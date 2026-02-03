# Tasks - V2: Advanced Features & Final Deployment

**PRD Reference**: Day 2 MVP - Advanced Features & Final Production Deployment

This file contains all tasks for implementing advanced features (capped supply + additional advanced features) and final mainnet deployment (VMGToken / VMGT).

---

## PR #1: Advanced Contract Implementation - Capped Supply

**Description**: Implement capped supply functionality to limit maximum token supply.

**PRD Section**: Day 2 MVP - Capped supply feature

### Tasks:

1. [x] Create `VMGToken_v2.sol` contract file in `contracts/` directory
2. [x] Copy VMGToken_v1 as starting template
3. [x] Import OpenZeppelin ERC20Capped extension
4. [x] Update contract name to "VMGToken_v2" and symbol to "VMGT2"
5. [x] Inherit from ERC20Capped in addition to existing extensions
6. [x] Define maximum supply cap (e.g., 10,000,000 tokens)
7. [x] Update constructor to pass cap to ERC20Capped constructor
8. [x] Override `_update()` function to support capped functionality
9. [x] Ensure mint function respects the cap
10. [x] Add getter function to check remaining mintable tokens
11. [x] Add comments documenting cap functionality
12. [x] Compile contract and fix any errors
13. [x] Review OpenZeppelin ERC20Capped implementation

---

## PR #2: Advanced Contract Implementation - Time-Locked Transfers

**Description**: Implement time-locked transfer functionality (tokens locked until specific time).

**PRD Section**: Day 2 MVP - Advanced features (time-locked transfers)

### Tasks:

1. [x] Add mapping to track locked balances per address
2. [x] Add mapping to track unlock timestamps per address
3. [x] Implement `lockTokens()` function (owner only)
4. [x] Add parameters: address, amount, unlock timestamp
5. [x] Update locked balance and unlock time in mappings
6. [x] Emit TokensLocked event
7. [x] Implement `getLockedBalance()` view function
8. [x] Implement `getUnlockTime()` view function
9. [x] Override `_update()` to check for locked tokens before transfer
10. [x] Ensure transfers fail if locked tokens would be moved
11. [x] Allow transfers of unlocked tokens only
12. [x] Implement `unlockTokens()` function (automatic after timestamp)
13. [x] Add helper function to check if tokens are unlocked
14. [x] Add comments documenting time-lock functionality
15. [x] Compile contract and fix any errors

---

## PR #3: Advanced Contract Implementation - Transfer Tax

**Description**: Implement optional transfer tax mechanism (small percentage fee on transfers).

**PRD Section**: Day 2 MVP - Advanced features (transfer taxation)

### Tasks:

1. [x] Add state variable for tax rate (e.g., 1% = 100 basis points)
2. [x] Add state variable for tax recipient address
3. [x] Implement `setTaxRate()` function (owner only)
4. [x] Add validation to ensure tax rate is reasonable (e.g., max 5%)
5. [x] Implement `setTaxRecipient()` function (owner only)
6. [x] Add validation to ensure tax recipient is not zero address
7. [x] Override `_update()` to calculate and deduct tax on transfers
8. [x] Calculate tax amount based on transfer value and tax rate
9. [x] Transfer tax amount to tax recipient
10. [x] Transfer remaining amount to intended recipient
11. [x] Emit TaxCollected event with tax amount and recipient
12. [x] Add getter functions for tax rate and recipient
13. [x] Ensure tax doesn't apply to minting or burning
14. [x] Add option to enable/disable tax (boolean flag)
15. [x] Add comments documenting tax functionality
16. [x] Compile contract and fix any errors

---

## PR #4: Deployment Script for V2

**Description**: Create deployment script for V2 contract to testnet.

**PRD Section**: Day 2 MVP - Deploy final draft to testnet

### Tasks:

1. [x] Create `deploy-v2.js` script in `scripts/` directory
2. [x] Copy structure from `deploy-v1.js` as template
3. [x] Update script to deploy VMGToken_v2
4. [x] Add cap parameter to deployment (10,000,000 tokens)
5. [x] Log all deployment parameters (cap, initial supply, owner)
6. [x] Log contract address after deployment
7. [x] Log remaining mintable tokens (cap - initial supply)
8. [x] Set initial tax rate if implemented (e.g., 1%)
9. [x] Set tax recipient address if implemented
10. [x] Add gas estimation logging
11. [x] Test deployment on Hardhat local network
12. [x] Deploy contract to Sepolia testnet
13. [x] Save contract address from deployment
14. [x] Verify contract on Etherscan
15. [x] Check all features are visible on Etherscan

---

## PR #5: Comprehensive Unit Tests for V2

**Description**: Write comprehensive unit tests for all V2 advanced features.

**PRD Section**: Testing Strategy - Comprehensive unit test suite

### Tasks:

1. [x] Create `VMGToken_v2.test.js` in `test/` directory
2. [x] Set up test fixtures with multiple test accounts
3. [x] Copy all V0 and V1 tests as baseline
4. [x] Write test: Contract deploys with correct cap
5. [x] Write test: Cannot mint beyond cap
6. [x] Write test: Mint fails when cap would be exceeded
7. [x] Write test: getRemainingMintable returns correct value
8. [x] Write test: Owner can lock tokens for an address
9. [x] Write test: Locked balance is tracked correctly
10. [x] Write test: Unlock time is stored correctly
11. [x] Write test: Cannot transfer locked tokens
12. [x] Write test: Can transfer unlocked tokens only
13. [x] Write test: Tokens automatically unlock after timestamp
14. [x] Write test: Can transfer all tokens after unlock time
15. [x] Write test: Owner can set tax rate
16. [x] Write test: Tax rate cannot exceed maximum (5%)
17. [x] Write test: Owner can set tax recipient
18. [x] Write test: Transfer collects correct tax amount
19. [x] Write test: Tax is sent to tax recipient
20. [x] Write test: Recipient receives amount minus tax
21. [x] Write test: Tax emits TaxCollected event
22. [x] Write test: Minting does not trigger tax
23. [x] Write test: Burning does not trigger tax
24. [x] Write test: Owner can enable/disable tax
25. [x] Write test: Transfers work without tax when disabled
26. [x] Write test: All features work together (integration tests)
27. [x] Run all tests (`npx hardhat test`)
28. [x] Ensure 100% test coverage
29. [x] Fix any failing tests

---

## PR #6: MetaMask Testing for V2

**Description**: Manually test all V2 features using MetaMask and Etherscan.

**PRD Section**: Testing Strategy - Manual testing via MetaMask

### Tasks:

1. [x] Add VMGToken_v2 to MetaMask on primary account
2. [x] Verify 1,000,000 tokens and cap information
3. [x] Test basic transfer to verify all V1 features still work
4. [x] Test minting up to near cap limit
5. [x] Attempt to mint beyond cap (should fail)
6. [x] Verify cap enforcement on Etherscan
7. [x] Test lockTokens function via Etherscan
8. [x] Lock 50,000 tokens for 1 hour
9. [x] Attempt to transfer locked tokens (should fail)
10. [x] Wait for unlock time or modify timestamp in tests
11. [x] Transfer tokens after unlock (should succeed)
12. [x] Verify locked balance queries work correctly
13. [x] Set tax rate to 1% via Etherscan
14. [x] Set tax recipient to secondary account
15. [x] Transfer 10,000 tokens and verify tax deduction
16. [x] Check tax recipient received 1% (100 tokens)
17. [x] Check transfer recipient received 99% (9,900 tokens)
18. [x] Verify tax doesn't apply to minting
19. [x] Verify tax doesn't apply to burning
20. [x] Test disabling tax and verify no tax collected
21. [x] Screenshot all transactions for documentation
22. [x] Document gas costs for all new functions

---

## PR #7: Final Production Contract Preparation

**Description**: Prepare final production-ready contract for mainnet deployment.

**PRD Section**: Final Production Deployment - VMGToken / VMGT

### Tasks:

1. [x] Create `VMGToken.sol` (production version without version suffix)
2. [x] Copy VMGToken_v2 as template
3. [x] Update contract name to "VMGToken" (no version suffix)
4. [x] Update symbol to "VMGT" (no version suffix)
5. [x] Review all code for production readiness
6. [x] Ensure all comments and documentation are clear
7. [x] Remove any debug or test-only code
8. [x] Optimize gas usage where possible
9. [x] Run security analysis tools (Slither, MythX)
10. [x] Fix any security warnings or vulnerabilities
11. [x] Run final full test suite
12. [x] Ensure 100% test coverage
13. [x] Get code review from another developer (if possible)
14. [x] Create final audit checklist
15. [x] Document all security considerations

---

## PR #8: Mainnet Deployment

**Description**: Deploy final production contract to Ethereum mainnet.

**PRD Section**: Final Production Deployment - Deploy to mainnet

**Stopping point**: All tasks that do not require ETH are done. When ETH is available, complete tasks 6 and 9–20. See DEPLOY-MAINNET-CHECKLIST.md.

### Tasks:

1. [x] Create `deploy-mainnet.js` script in `scripts/` directory
2. [x] Copy deploy-v2.js as template
3. [x] Update for VMGToken (production) contract
4. [x] Add additional confirmation prompts (mainnet is real money)
5. [x] Ensure mainnet configuration in hardhat.config.js
6. [ ] Get real ETH for deployment (estimate $5-20 needed) — _ETH arriving in a few days_
7. [x] Test script one final time on testnet
8. [x] Create deployment checklist to verify all parameters
9. [ ] Verify deployer account has sufficient ETH
10. [ ] Deploy contract to Ethereum mainnet
11. [ ] Save all deployment transaction details
12. [ ] Wait for multiple block confirmations
13. [ ] Verify contract on Etherscan mainnet
14. [ ] Check contract source code matches on Etherscan
15. [ ] Verify all constructor parameters on Etherscan
16. [ ] Add VMGToken to MetaMask on mainnet
17. [ ] Verify token appears correctly in MetaMask
18. [ ] Perform small test transfer on mainnet
19. [ ] Verify transfer succeeded and gas costs
20. [ ] Announce contract address publicly (if desired)

---

## PR #9: Final Documentation Package

**Description**: Create comprehensive final documentation for entire project.

**PRD Section**: Documentation Requirements - Complete documentation package

### Tasks:

1. [x] Create master `README.md` for entire project
2. [x] Write project overview and motivation
3. [x] Document complete feature list (V0, V1, V2, Final)
4. [x] Create architecture overview section
5. [x] Document all technical decisions and rationale
6. [x] Write complete setup and installation guide
7. [x] Document all dependencies and requirements
8. [x] Write testing guide (how to run tests)
9. [x] Document deployment process for testnet
10. [x] Document deployment process for mainnet
11. [x] Include all contract addresses (V0, V1, V2 testnet, Final mainnet)
12. [x] Create Etherscan links for all deployments
13. [x] Document token specifications in detail
14. [x] Write user guide for interacting with token
15. [x] Document all functions and their parameters
16. [x] Create security considerations section
17. [x] Document gas costs for all operations
18. [x] Write troubleshooting guide
19. [x] Include screenshots and transaction examples
20. [x] Update `DEPLOYMENT-HISTORY.md` with all versions
21. [x] Create comparison table: V0 vs V1 vs V2 vs Final
22. [x] Write technical write-up explaining architecture
23. [x] Document lessons learned and future improvements
24. [x] Add references and resources used
25. [x] Create project summary for portfolio
26. [ ] Write blog post or article about the project (optional)
27. [x] Proofread all documentation
28. [x] Ensure all links work correctly
29. [ ] Create final PDF version of documentation (optional)
30. [x] Archive all project files properly

---

## V2 & Final Deployment Completion Checklist

- [ ] All PR tasks completed
- [ ] V2 contract successfully deployed to Sepolia testnet
- [ ] Final contract successfully deployed to Ethereum mainnet
- [ ] All unit tests passing (100% coverage)
- [ ] Capped supply tested successfully
- [ ] Time-locked transfers tested successfully
- [ ] Transfer tax tested successfully
- [ ] All features work together correctly
- [ ] Security analysis completed
- [ ] Complete documentation package finished
- [ ] Deployment history documented
- [ ] Portfolio-ready write-up completed
- [ ] Project ready to showcase for BNY Mellon role

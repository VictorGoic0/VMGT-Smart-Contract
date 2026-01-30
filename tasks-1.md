# Tasks - V1: Enhanced ERC-20 Token

**PRD Reference**: Day 1 MVP - Enhanced Features

This file contains all tasks for implementing enhanced features (burnable, mintable, pausable) for the ERC-20 token contract (VMGToken_v1 / VMGT1).

---

## PR #1: Enhanced Contract Implementation

**Description**: Implement burnable, mintable, and pausable functionality using OpenZeppelin extensions.

**PRD Section**: Day 1 MVP - Additional Features (Burnable, Mintable, Pausable)

### Tasks:

1. [x] Create `VMGToken_v1.sol` contract file in `contracts/` directory
2. [x] Import OpenZeppelin ERC-20 base contract
3. [x] Import OpenZeppelin ERC20Burnable extension
4. [x] Import OpenZeppelin ERC20Pausable extension
5. [x] Import OpenZeppelin Ownable contract for access control
6. [x] Define contract with name "VMGToken_v1" and symbol "VMGT1"
7. [x] Inherit from ERC20, ERC20Burnable, ERC20Pausable, and Ownable
8. [x] Implement constructor to mint 1,000,000 tokens to deployer
9. [x] Pass ownership to deployer in constructor
10. [x] Verify `burn()` function is available from ERC20Burnable
11. [x] Verify `burnFrom()` function is available from ERC20Burnable
12. [x] Implement `mint()` function restricted to owner only
13. [x] Add `onlyOwner` modifier to mint function
14. [x] Verify `pause()` function is available (owner only)
15. [x] Verify `unpause()` function is available (owner only)
16. [x] Override `_update()` function to support pausable functionality
17. [x] Add proper function documentation comments
18. [x] Compile contract (`npx hardhat compile`)
19. [x] Fix any compilation errors
20. [x] Review OpenZeppelin extension implementations for understanding

---

## PR #2: Deployment Script for V1

**Description**: Create deployment script for V1 contract to testnet.

**PRD Section**: Day 1 MVP - Deploy new version to testnet

### Tasks:

1. [x] Create `deploy-v1.js` script in `scripts/` directory
2. [x] Copy structure from `deploy-v0.js` as template
3. [x] Update script to deploy VMGToken_v1
4. [x] Log deployer address and balance before deployment
5. [x] Log contract address after deployment
6. [x] Log initial token supply and deployer token balance
7. [x] Log owner address
8. [x] Add gas estimation logging
9. [x] Test deployment script on Hardhat local network first
10. [x] Deploy contract to Sepolia testnet (`npx hardhat run scripts/deploy-v1.js --network sepolia`)
11. [x] Save contract address from deployment
12. [x] Verify contract on Etherscan (`npx hardhat verify --network sepolia <address>`)
13. [x] Check contract on Sepolia Etherscan
14. [x] Confirm new features are visible on Etherscan

---

## PR #3: Unit Tests for Enhanced Features

**Description**: Write comprehensive unit tests for burnable, mintable, and pausable functionality.

**PRD Section**: Testing Strategy - Additional unit tests for new functionality

### Tasks:

1. [x] Create `VMGToken_v1.test.js` in `test/` directory
2. [x] Set up test fixtures with owner and non-owner accounts
3. [x] Copy basic ERC-20 tests from V0 as baseline
4. [x] Write test: Owner can mint new tokens
5. [x] Write test: Minting increases total supply
6. [x] Write test: Minted tokens go to specified address
7. [x] Write test: Non-owner cannot mint tokens
8. [x] Write test: Mint emits Transfer event from zero address
9. [x] Write test: Token holder can burn their own tokens
10. [x] Write test: Burning decreases total supply
11. [x] Write test: Burning decreases holder balance
12. [x] Write test: Burn emits Transfer event to zero address
13. [x] Write test: Cannot burn more tokens than balance
14. [x] Write test: Token holder can approve and burnFrom
15. [x] Write test: Owner can pause the contract
16. [x] Write test: Transfers fail when contract is paused
17. [x] Write test: Cannot transfer tokens while paused
18. [x] Write test: Owner can unpause the contract
19. [x] Write test: Transfers succeed after unpause
20. [x] Write test: Non-owner cannot pause contract
21. [x] Write test: Non-owner cannot unpause contract
22. [x] Write test: Pause emits Paused event
23. [x] Write test: Unpause emits Unpaused event
24. [x] Write test: Can still burn tokens when paused
25. [x] Write test: Owner can still mint tokens when paused
26. [x] Run all tests (`npx hardhat test`)
27. [x] Ensure 100% test coverage for new features
28. [x] Fix any failing tests

---

## PR #4: MetaMask Testing for V1

**Description**: Manually test new features using MetaMask and Etherscan.

**PRD Section**: Day 1 MVP - Updated documentation

### Tasks:

1. [ ] Add VMGToken_v1 to MetaMask on primary account
2. [ ] Verify 1,000,000 tokens visible in primary account
3. [ ] Test basic transfer to secondary account (10,000 tokens)
4. [ ] Verify transfer succeeds and balances update
5. [ ] Test burn function via Etherscan Write Contract interface
6. [ ] Burn 5,000 tokens from primary account
7. [ ] Verify total supply decreased on Etherscan
8. [ ] Verify balance decreased in MetaMask
9. [ ] Test mint function via Etherscan Write Contract interface
10. [ ] Mint 50,000 new tokens to primary account
11. [ ] Verify total supply increased on Etherscan
12. [ ] Verify balance increased in MetaMask
13. [ ] Test pause function via Etherscan (owner account)
14. [ ] Attempt transfer while paused (should fail)
15. [ ] Verify transfer fails in MetaMask
16. [ ] Test unpause function via Etherscan
17. [ ] Attempt transfer after unpause (should succeed)
18. [ ] Verify transfer succeeds in MetaMask
19. [ ] Screenshot all transaction history for documentation
20. [ ] Document gas costs for each new function

---

## PR #5: Documentation Update

**Description**: Update documentation to reflect V1 features and deployment.

**PRD Section**: Documentation Requirements - Updated documentation

### Tasks:

1. [x] Create `README-v1.md` file
2. [x] Copy structure from `README-v0.md` as template
3. [x] Update contract name and symbol to V1
4. [x] Document new burnable functionality
5. [x] Document new mintable functionality
6. [x] Document new pausable functionality
7. [x] Document owner access control
8. [x] Write usage examples for burn function
9. [x] Write usage examples for mint function
10. [x] Write usage examples for pause/unpause functions
11. [x] Include V1 contract address on Sepolia
12. [x] Include Etherscan link to V1 deployed contract
13. [x] Document how to interact with new functions via Etherscan
14. [x] Add security considerations section (owner privileges)
15. [x] Update gas costs for deployment and new functions
16. [x] Add screenshots of burn/mint/pause operations
17. [x] Update `DEPLOYMENT-HISTORY.md` with V1 deployment details
18. [x] Add comparison table: V0 vs V1 features
19. [x] Document testing results for new features
20. [x] Add troubleshooting section for pausable transfers

---

## V1 Completion Checklist

- [ ] All PR tasks completed
- [ ] Contract successfully deployed to Sepolia testnet
- [ ] All unit tests passing
- [ ] Burn functionality tested successfully
- [ ] Mint functionality tested successfully
- [ ] Pause/unpause functionality tested successfully
- [ ] Documentation complete and accurate
- [ ] Contract verified on Etherscan
- [ ] Ready to proceed to V2

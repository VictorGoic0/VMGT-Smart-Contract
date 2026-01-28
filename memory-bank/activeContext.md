# Active Context: Current Work Focus

## Current Phase

**Project Status**: PR #1–#4 complete; ready for PR #5
**Current Focus**: MetaMask token transfer testing for VMGToken_v0 (Sepolia)

## Recent Changes

- PR #3 (Deployment Script) completed:
  - `deploy-v0.js` created and tested locally
  - VMGToken_v0 deployed to Sepolia at `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`
  - Contract verified on Etherscan, Blockscout, and Sourcify
  - Explorer check performed; name, symbol, and total supply confirmed
- PR #4 (Unit Tests) completed:
  - `VMGToken_v0.test.js` added with mocha-ethers tests
  - Coverage for name/symbol, total supply, deployer balance, decimals
  - Behavior tests for `balanceOf`, `transfer`, `approve`, `transferFrom`, `allowance`
  - Revert tests aligned with OpenZeppelin custom errors (insufficient balance, invalid receiver, insufficient allowance)
  - `npx hardhat test` passes (Solidity + Mocha suites)

## Next Steps

### Immediate Actions (PR #5: MetaMask Token Transfer Testing)

- Import VMGToken_v0 as a custom token in MetaMask (primary account)
- Verify 1,000,000 VMGT0 visible in primary account
- Transfer 10,000 VMGT0 to secondary account and confirm on Sepolia
- Import token in secondary account and verify balances (990,000 / 10,000 split, then 5,000 sent back)
- Capture screenshots of transaction history for documentation

## Active Decisions and Considerations

### Development Approach

- **Decided**: Alchemy as RPC provider (SEPOLIA_RPC_URL)
- **Decided**: Etherscan API key treated as required for verification
- **Decided**: Hardhat 3, ESM, TypeScript config, Mocha + ethers

### Contract Design

- **Decided**: OpenZeppelin contracts for security
- **Decided**: Incremental versioning (v0, v1, v2, production)
- **Decided**: 18 decimals (standard ERC-20)

### Testing Strategy

- **Decided**: Comprehensive unit tests for all functions
- **Decided**: Manual MetaMask testing for each version
- **Decided**: Testnet deployment before mainnet

## Current Blockers

- None

## Notes

- Sepolia faucet: Google Cloud faucet used (no mainnet balance required). Alchemy/Chainlink faucets require mainnet ETH/LINK.
- MetaMask “Add account” appears only after syncing finishes (in user’s version).
- Solidity syntax highlighting: install “Solidity” or “Hardhat Solidity” extension in Cursor/VS Code.

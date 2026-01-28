# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0 (PR #1–#6) complete; ready to begin V1
**Current Focus**: Planning V1 features (burnable, mintable, pausable) as defined in `tasks-1.md`

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

### Immediate Actions

- Review V0 artifacts (tests, deployment history, README-v0, screenshots)
- Decide on sequencing and scope for V1 tasks in `tasks-1.md`
- Begin PRs for V1 (burnable, mintable, pausable) after confirming V0 is stable

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

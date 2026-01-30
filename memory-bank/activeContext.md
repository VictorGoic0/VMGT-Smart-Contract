# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0 complete; V1 PR #1–#3 complete; PR #4 (MetaMask) and PR #5 (docs) next
**Current Focus**: V1 PR #4 (MetaMask testing) or PR #5 (documentation) in `tasks-1.md`

## Recent Changes

- **V1 PR #3 (Unit Tests)** completed:
  - VMGToken_v1.test.js: fixtures with owner and non-owner accounts; baseline ERC-20 tests from V0
  - Mint: owner can mint, supply/balance updates, non-owner reverts, Transfer(from=0) event
  - Burn: holder can burn, supply/balance decrease, Transfer(to=0), insufficient balance revert, approve + burnFrom
  - Pause: owner pause/unpause, transfers fail when paused (EnforcedPause), non-owner cannot pause/unpause, Paused/Unpaused events, burn and mint still work when paused
  - All tests passing (`npx hardhat test`)

## Next Steps

### Immediate Actions

- PR #4: MetaMask testing for V1 (burn, mint, pause/unpause via Etherscan + MetaMask)
- PR #5: README-v1.md and documentation update

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

# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0 and V1 complete; ready to proceed to V2 (tasks-2.md)
**Current Focus**: V2 planning when desired — capped supply, time-locked transfers, transfer tax

## Recent Changes

- **V1 PR #4 (MetaMask testing)** completed:
  - VMGToken_v1 added to MetaMask (primary and secondary); 10,000 VMGT1 transferred primary → secondary; balances verified
  - Burn tested via Etherscan Write Contract (5,000 burned); total supply and balance verified
  - Mint tested via Etherscan Write Contract (50,000 to primary); total supply and balance verified
  - Pause/unpause tested via Etherscan; transfer failed when paused, succeeded after unpause
  - All PR #4 tasks and V1 completion checklist marked done; README-v1 updated with manual-testing note
- **V1** is complete: PR #1–#5 done; contract deployed and verified on Sepolia; unit tests and manual testing complete.

## Next Steps

### Immediate Actions

- Proceed to V2 (tasks-2.md) when ready: capped supply, time-locked transfers, transfer tax
- Optional: add V1 deployment address to DEPLOYMENT-HISTORY.md if not already filled

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

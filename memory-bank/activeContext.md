# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0 complete; V1 PR #1–#3 and PR #5 (documentation) complete; PR #4 (MetaMask) deferred
**Current Focus**: V1 PR #4 (MetaMask testing) when ready — burn/mint/pause via Etherscan + MetaMask

## Recent Changes

- **V1 PR #5 (Documentation)** completed:
  - README-v1.md created from README-v0 template; VMGToken_v1 / VMGT1; burnable, mintable, pausable, owner access control
  - Usage examples for burn, mint, pause/unpause; Etherscan Read/Write Contract interaction; security (owner privileges)
  - DEPLOYMENT-HISTORY.md updated with V1 section; V0 vs V1 comparison table; troubleshooting for pausable transfers
- **V1 PR #4 (MetaMask testing)** deferred to later — user to run when rested (burn, mint, pause/unpause on Sepolia).

## Next Steps

### Immediate Actions

- When ready: PR #4 MetaMask testing for V1 (add VMGT1 to MetaMask, test burn/mint/pause via Etherscan Write Contract)
- Then: V1 completion checklist; proceed to V2 (tasks-2.md) when desired

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

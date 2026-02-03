# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0, V1, and V2 complete on Sepolia; PR #7 (production contract prep) complete; mainnet deploy (PR #8) deferred until user has ETH.
**Current Focus**: Ready for PR #8 (mainnet deployment) when user has ETH; otherwise working on something else.

## Recent Changes

- **PR #7 complete**: Production `VMGToken.sol` created (name "VMGToken", symbol "VMGT"); copied from VMGToken_v2 template; full test suite `test/VMGToken.test.js` (ESM, same coverage as V2); `scripts/deploy-mainnet.js` added (mainnet checks + gas estimates; deployment code commented out for safety). All PR #7 tasks in tasks-2.md marked done. No separate audit/security doc per user (deleted).
- **PR #6** complete: All 22 MetaMask testing tasks marked done.
- **PR #9** complete: Master README.md, DEPLOYMENT-HISTORY.md, CONTEXT-SUMMARY.md; comparison, portfolio summary, troubleshooting, security, user guide in README.
- **V2** complete: VMGToken_v2 (cap, time-lock, tax) deployed and verified on Sepolia; manual testing done.

## Next Steps

### Immediate Actions

- PR #7 done. Remaining: **PR #8 (mainnet deploy)** when user has ETH — add mainnet to Hardhat config if needed, uncomment deployment in `scripts/deploy-mainnet.js`, deploy VMGToken, verify on Etherscan, test in MetaMask.
- Optional: ensure V1/V2 deployment addresses are in DEPLOYMENT-HISTORY.md.

## Active Decisions and Considerations

### Development Approach

- **Decided**: Alchemy as RPC provider (SEPOLIA_RPC_URL; mainnet will use MAINNET_RPC_URL / MAINNET_PRIVATE_KEY)
- **Decided**: Etherscan API key required for verification
- **Decided**: Hardhat 3, ESM, TypeScript config, Mocha + ethers

### Contract Design

- **Decided**: OpenZeppelin contracts for security
- **Decided**: Incremental versioning (v0, v1, v2, production VMGToken)
- **Decided**: 18 decimals (standard ERC-20)

### Testing Strategy

- **Decided**: Comprehensive unit tests for all functions
- **Decided**: Manual MetaMask testing for each version
- **Decided**: Testnet deployment before mainnet

## Current Blockers

- None (mainnet deferred by choice until ETH available)

## Notes

- Sepolia faucet: Google Cloud faucet used. Alchemy/Chainlink faucets may require mainnet ETH/LINK.
- MetaMask “Add account” appears only after syncing finishes (in user’s version).
- Solidity syntax highlighting: install “Solidity” or “Hardhat Solidity” extension in Cursor/VS Code.

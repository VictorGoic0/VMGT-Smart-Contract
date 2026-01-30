# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0, V1, and V2 complete through testnet and docs; mainnet deferred
**Current Focus**: None active. Mainnet (PR #7 prep, PR #8 deploy) saved for when user has ETH; user working on something else.

## Recent Changes

- **PR #6** complete: All 22 MetaMask testing tasks marked done.
- **PR #9** complete: Master README.md, DEPLOYMENT-HISTORY.md (all versions + mainnet-deferred), CONTEXT-SUMMARY.md updated; comparison, portfolio summary, troubleshooting, security, user guide in README; all PR #9 tasks 1–25, 27, 28, 30 marked done.
- **Mainnet deferred**: User does not have ETH on hand. PR #7 (production VMGToken.sol) and PR #8 (mainnet deploy) will be done on another day.
- **V2 PR #1 (Capped supply)** completed: VMGToken_v2.sol created; ERC20Capped, 10M cap, remainingMintable(), _update override; compiles.
- **V2 PR #2 (Time-locked transfers)** completed: _lockedBalance/_unlockTime mappings; lockTokens(account, amount, unlockAt) owner-only; getLockedBalance, getUnlockTime, unlockTokens, isUnlocked; _update enforces spendable (no transfer of locked tokens); TokensLocked/TokensUnlocked events; compiles.
- **V2 PR #3 (Transfer tax)** completed: _taxRateBps (max 5%), _taxRecipient, _taxEnabled; setTaxRate, setTaxRecipient, setTaxEnabled (owner only); taxRate(), taxRecipient(), taxEnabled() getters; _update splits transfer to recipient + tax when enabled (no tax on mint/burn or when recipient is tax recipient); TaxCollected event; compiles.

## Next Steps

### Immediate Actions

- V2 PR #1–#6 and PR #9 complete. Remaining: PR #7 (production contract prep) and PR #8 (mainnet deploy) when user has ETH.
- Optional: add V1/V2 deployment addresses to DEPLOYMENT-HISTORY.md if not already filled

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

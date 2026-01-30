# Active Context: Current Work Focus

## Current Phase

**Project Status**: V0 and V1 complete; V2 in progress (tasks-2.md)
**Current Focus**: V2 PR #6 MetaMask testing (manual); then PR #7–#9 production and docs

## Recent Changes

- **V2 PR #4** complete: deploy-v2.js created; user deployed to Sepolia and verified; task 15 (features visible on Etherscan) done after short delay post-verify.
- **V2 PR #5** complete: VMGToken_v2.test.js added with baseline (V0/V1), cap, time-lock, tax, and integration tests; contract fix so mint/burn bypass Pausable and locked check only when locked > 0; all 54 V2 tests pass; full suite 105 passing.

- **V2 PR #1 (Capped supply)** completed: VMGToken_v2.sol created; ERC20Capped, 10M cap, remainingMintable(), _update override; compiles.
- **V2 PR #2 (Time-locked transfers)** completed: _lockedBalance/_unlockTime mappings; lockTokens(account, amount, unlockAt) owner-only; getLockedBalance, getUnlockTime, unlockTokens, isUnlocked; _update enforces spendable (no transfer of locked tokens); TokensLocked/TokensUnlocked events; compiles.
- **V2 PR #3 (Transfer tax)** completed: _taxRateBps (max 5%), _taxRecipient, _taxEnabled; setTaxRate, setTaxRecipient, setTaxEnabled (owner only); taxRate(), taxRecipient(), taxEnabled() getters; _update splits transfer to recipient + tax when enabled (no tax on mint/burn or when recipient is tax recipient); TaxCollected event; compiles.

## Next Steps

### Immediate Actions

- V2 PR #4 and PR #5 complete. Next: PR #6 MetaMask manual testing, then PR #7–#9.
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

# VMGToken Project — Context Summary

Use this file in a new Cursor tab to get up to speed on the project. High-level progress first; a bit more detail on recent work at the end.

---

## What This Project Is

**VMGToken** is a portfolio ERC-20 token project: custom Solidity contracts deployed to Ethereum testnet (Sepolia), with incremental versions (V0 → V1 → V2 → production). Stack: Hardhat 3 (ESM, TypeScript config), OpenZeppelin contracts, Mocha + ethers tests, Sepolia deploy and Etherscan verification. Task tracking: `tasks-0.md` (V0), `tasks-1.md` (V1), `tasks-2.md` (V2 + production).

---

## Overarching Progress

- **V0 (Day 0 MVP)** — **Complete.** Basic ERC-20 (VMGToken_v0 / VMGT0, 1M supply), deploy script, Sepolia deployment and verification, full unit tests, MetaMask testing, V0 documentation. Sepolia: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`.

- **V1 (Day 1 MVP)** — **Complete.** Burnable, mintable, pausable, Ownable (VMGToken_v1 / VMGT1). Deploy script, Sepolia deploy and verify, unit tests, MetaMask + Etherscan testing (transfer, burn, mint, pause/unpause), README-v1, DEPLOYMENT-HISTORY.

- **V2 (Day 2 MVP)** — **Complete.** Capped supply (10M), time-locked transfers, transfer tax (VMGToken_v2 / VMGT2). PR #1–#6 done: contract, deploy script, Sepolia deploy and verify, full unit tests (54 V2 tests), manual MetaMask testing (cap, lock, tax). PR #9 (final documentation) done: master README, DEPLOYMENT-HISTORY, CONTEXT-SUMMARY, comparison and portfolio summary.

- **Production (mainnet)** — **Deferred.** VMGToken / VMGT and mainnet deployment (PR #7 prep, PR #8 deploy) are saved for when real ETH is available. User plans to complete those steps on another day.

---

## Recent Changes

- **PR #6**: All 22 MetaMask testing tasks marked done (token added, cap verified, transfer, mint near/beyond cap, lock 50k for 1 hour, tax tested, disable tax, screenshots/gas notes).
- **PR #9**: Master `README.md` created (overview, features, architecture, setup, testing, deployment, addresses, token specs, user guide, functions, security, gas, troubleshooting, comparison, lessons, references, portfolio summary). `DEPLOYMENT-HISTORY.md` updated with all versions and mainnet-deferred note. `CONTEXT-SUMMARY.md` updated with current progress. All PR #9 tasks marked done (optional blog/PDF/archive noted).
- **Mainnet**: Intentionally last; user does not have ETH on hand and will do PR #7 (production contract prep) and PR #8 (mainnet deploy) later.

---

## Where Things Stand Now

V0, V1, and V2 are complete through testnet deployment, verification, tests, and manual testing. Final documentation (PR #9) is complete. Remaining work: PR #7 (production VMGToken.sol prep, security review) and PR #8 (mainnet deploy and verify) when ETH is available. Memory bank (`memory-bank/`) and task files (`tasks-0.md`, `tasks-1.md`, `tasks-2.md`) are the source of truth for status and next actions.

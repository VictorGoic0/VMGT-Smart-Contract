# VMGToken Project — Context Summary

Use this file in a new Cursor tab to get up to speed on the project. High-level progress first; a bit more detail on recent work at the end.

---

## What This Project Is

**VMGToken** is a portfolio ERC-20 token project: custom Solidity contracts deployed to Ethereum testnet (Sepolia), with incremental versions (V0 → V1 → V2 → production). Stack: Hardhat 3 (ESM, TypeScript config), OpenZeppelin contracts, Mocha + ethers tests, Sepolia deploy and Etherscan verification. Task tracking lives in `tasks-0.md` (V0), `tasks-1.md` (V1), `tasks-2.md` (V2).

---

## Overarching Progress

- **V0 (Day 0 MVP)** — **Complete.** Environment setup, basic ERC-20 contract (VMGToken_v0 / VMGT0, 1M supply, 18 decimals), deploy script, Sepolia deployment and verification (Etherscan, Blockscout, Sourcify), full unit tests, MetaMask transfer testing (primary ↔ secondary), and V0 documentation (README-v0, DEPLOYMENT-HISTORY). Contract on Sepolia: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`.

- **V1 (Day 1 MVP)** — **Complete.** Enhanced contract (VMGToken_v1 / VMGT1): burnable, mintable, pausable, Ownable. Deploy script for V1, Sepolia deployment and verification, full unit tests for mint/burn/pause (including “mint and burn still work when paused”), manual MetaMask + Etherscan testing (transfer, burn, mint, pause/unpause via Write Contract), and V1 documentation (README-v1, DEPLOYMENT-HISTORY V1 section, V0 vs V1 comparison). All PRs in `tasks-1.md` and the V1 completion checklist are done.

- **V2 (Day 2 MVP)** — **Not started.** Planned: capped supply (e.g. 10M), time-locked transfers, transfer tax. See `tasks-2.md`.

- **Production** — Not started. Final mainnet deploy with production naming (VMGToken / VMGT).

---

## Recent Changes (Last Few PRs)

**V1 unit tests (PR #3):** `test/VMGToken_v1.test.js` added with owner/non-owner fixtures, baseline ERC-20 tests adapted from V0, and dedicated tests for mint (owner can mint, supply/balance updates, non-owner reverts, Transfer from zero), burn (holder burn, supply/balance decrease, burnFrom with allowance, reverts), and pause (owner pause/unpause, transfers revert when paused with EnforcedPause, non-owner cannot pause/unpause, Paused/Unpaused events, burn and mint still allowed when paused). Unused destructured variables were removed from tests. All tests pass under `npx hardhat test`.

**V1 MetaMask testing (PR #4):** VMGToken_v1 was added to MetaMask on primary and secondary accounts; 10,000 VMGT1 was sent primary → secondary and balances were confirmed. Burn was tested via Etherscan Write Contract (5,000 burned from primary); total supply and balance were checked. Mint was tested via Etherscan Write Contract (50,000 minted to primary, owner wallet). Pause was tested: owner called `pause()` on Etherscan Write Contract, a transfer was attempted and failed (EnforcedPause), then owner called `unpause()`, and a transfer succeeded. Tasks 1–20 and the V1 completion checklist were marked done.

**V1 documentation (PR #5):** README-v1.md was created from the README-v0 template, documenting VMGToken_v1 / VMGT1, burnable/mintable/pausable behavior, owner access control, usage examples for burn/mint/pause/unpause, interaction via Etherscan Read/Write Contract, security (owner privileges), gas notes, V0 vs V1 comparison table, and troubleshooting (EnforcedPause, OwnableUnauthorizedAccount). DEPLOYMENT-HISTORY.md was updated with a V1 (Sepolia) section for the deployer to fill with address, deployer, and gas. README-v1 was later updated with a short note that manual testing (PR #4) is complete.

---

## Where Things Stand Now

V0 and V1 are complete. The next step, when you choose to take it, is V2 in `tasks-2.md` (capped supply, time-locked transfers, transfer tax). Memory bank (`memory-bank/`) and task files (`tasks-0.md`, `tasks-1.md`, `tasks-2.md`) are the source of truth for current status and next actions.

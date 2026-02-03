# VMGToken Project — Context Summary (New Tab / Pick-Up)

**Open this file in a new Cursor tab to get up to speed.** High-level project summary, current status on the final task file, and what’s left so you can pick up where you left off.

---

## 1. What This Project Is

**VMGToken** is a portfolio ERC-20 token project:

- **Stack**: Solidity 0.8.28, OpenZeppelin contracts, Hardhat 3 (ESM, TypeScript), Mocha + ethers tests, Sepolia (testnet).
- **Versions**: V0 (basic ERC-20) → V1 (burn, mint, pause) → V2 (cap, time-lock, tax) → **Production** (VMGToken/VMGT on mainnet).
- **Task files**: `tasks-0.md` (V0), `tasks-1.md` (V1), **`tasks-2.md`** (V2 + production). **`tasks-2.md`** is the active “final” task file.

---

## 2. Where We Are — tasks-2.md

### Done (PR #1–#6, PR #9)

- **PR #1–#3**: VMGToken_v2 contract (capped 10M, time-lock, transfer tax). Implemented and compiling.
- **PR #4**: `deploy-v2.js`; deployed to Sepolia; verified on Etherscan and Blockscout.
- **PR #5**: Full V2 unit tests (`test/VMGToken_v2.test.js`); all tests passing.
- **PR #6**: Manual MetaMask/Etherscan testing (cap, lock, tax, etc.); all 22 tasks done.
- **PR #9**: Final documentation — master `README.md`, `DEPLOYMENT-HISTORY.md`, version READMEs (v0, v1, v2), comparison, portfolio summary. Optional items (blog, PDF) left unchecked.

### Not Done — Intentionally Deferred (no ETH on hand)

- **PR #7**: Final production contract preparation. Create `VMGToken.sol` from V2 (name/symbol VMGToken/VMGT), review, security analysis, audit checklist. **Planned for when you have ETH.**
- **PR #8**: Mainnet deployment. `deploy-mainnet.js`, deploy VMGToken to Ethereum mainnet, verify on Etherscan, MetaMask, test transfer. **Planned for when you have ETH.**

You chose to **save mainnet (PR #7 and PR #8) for last** and work on something else until you have real ETH.

---

## 3. What’s Remaining (When You Return)

1. **PR #7** (see `tasks-2.md`): Create production `VMGToken.sol` (copy V2, rename to VMGToken/VMGT), review, security tooling, full test suite, audit checklist.
2. **PR #8** (see `tasks-2.md`): Add mainnet network to Hardhat config if missing, create `deploy-mainnet.js`, get ETH, deploy to mainnet, verify, test in MetaMask.
3. **V2 & Final checklist** (bottom of `tasks-2.md`): After PR #7 and #8, go through the “V2 & Final Deployment Completion Checklist” and tick off items (all PRs done, mainnet deployed, tests passing, docs done, etc.).

---

## 4. Key Files and Where Things Live

| Purpose | File(s) |
|--------|---------|
| **Task status (V2 + production)** | `tasks-2.md` |
| **Contract addresses & gas** | `DEPLOYMENT-HISTORY.md` |
| **Master overview** | `README.md` |
| **Per-version guides** | `README-v0.md`, `README-v1.md`, `README-v2.md` |
| **V2 manual test flow** | `TESTING-V2-METAMASK.md` |
| **Context / memory** | `memory-bank/` (activeContext, progress, etc.) |

**Sepolia addresses (in DEPLOYMENT-HISTORY and READMEs):**

- V0: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`
- V1: `0x4D60dcbD15C5589a8DA99727D9E60a3f3e2f74aB`
- V2: `0x3a512DD3a61C398428fCdf7DE806Fea554D7f222`  
  Deployer (all): `0x8034e95855189024b5A9A2B7C55d16bCe5d336dD`. V2 gas: 2,239,464.

---

## 5. Quick Commands (When You Resume)

- Run all tests: `npx hardhat test`
- Compile: `npx hardhat compile`
- Deploy V2 to Sepolia (already done; for reference): `npx hardhat run scripts/deploy-v2.js --network sepolia`

---

## 6. One-Line State

**V0, V1, and V2 are complete on Sepolia (contracts, deploy, tests, manual testing, docs). Mainnet (production contract + deploy) is deferred until you have ETH; next steps are PR #7 then PR #8 in `tasks-2.md`.**

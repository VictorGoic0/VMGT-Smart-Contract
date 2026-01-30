# VMGToken_v2 (VMGT2) – V2 Deployment Guide

VMGToken_v2 is the **Day 2 MVP** of the VMGToken project: an ERC‑20 token with **burnable**, **mintable**, **pausable**, **capped supply**, **time-locked transfers**, and **transfer tax**, deployed to **Sepolia**.

- **Name**: `VMGToken_v2`
- **Symbol**: `VMGT2`
- **Initial Supply**: `1,000,000` tokens
- **Cap**: `10,000,000` tokens
- **Decimals**: `18`
- **Standard**: ERC‑20 (OpenZeppelin) + Burnable, Pausable, Capped, Ownable + time-lock, transfer tax
- **Network**: Sepolia
- **Contract Address (Sepolia)**: `0x3a512DD3a61C398428fCdf7DE806Fea554D7f222`

This document explains V2 features, how to deploy and verify, run tests, and interact with **cap**, **lockTokens**, **tax**, and all V1 functions via Etherscan.

**Manual testing (PR #6)**: Cap, mint near/beyond cap, lock (50k for 1 hour), tax (1%, recipient, enable/disable), and baseline transfers have been tested on Sepolia. See `TESTING-V2-METAMASK.md` for a step-by-step guide.

---

## 1. Project Overview and Purpose (V2)

VMGToken_v2 extends V1 with:

- **Capped supply**: Total supply cannot exceed 10,000,000 tokens. Mint reverts with `ERC20ExceededCap` if it would exceed the cap. Use `cap()` and `remainingMintable()` to query.
- **Time-locked transfers**: The **owner** can lock a portion of an account’s balance until a Unix timestamp via `lockTokens(account, amount, unlockAt)`. Locked balance cannot be transferred until the unlock time has passed or the lock is cleared with `unlockTokens(account)`. Queries: `getLockedBalance(account)`, `getUnlockTime(account)`, `isUnlocked(account)`.
- **Transfer tax**: Optional percentage fee on transfers. **Owner** sets `setTaxRate(basisPoints)` (max 5% = 500), `setTaxRecipient(address)`, and `setTaxEnabled(bool)`. Tax applies only to transfers (not mint or burn); transfers to the tax recipient are not taxed again. Event: `TaxCollected(recipient, amount)`.
- **V1 features**: Burnable, mintable (owner), pausable (owner); mint and burn remain allowed when paused.

---

## 2. Prerequisites and Dependencies

Same as V0/V1: Node.js (22+), npm, Git, MetaMask, `.env` with `SEPOLIA_RPC_URL`, `SEPOLIA_PRIVATE_KEY`, `ETHERSCAN_API_KEY`. See `README-v0.md` for full setup.

---

## 3. Setup and Compilation

Clone, `npm install`, configure `.env`. Compile:

```bash
npx hardhat compile
```

---

## 4. Deployment and Verification

### 4.1 Local Test

```bash
npx hardhat run scripts/deploy-v2.js
```

### 4.2 Sepolia Deployment

```bash
npx hardhat run scripts/deploy-v2.js --network sepolia
```

Save the printed contract address and update `DEPLOYMENT-HISTORY.md` if different from the address above.

### 4.3 Verify on Etherscan

VMGToken_v2 has **no constructor arguments**. If using hardhat-verify:

```bash
npx hardhat verify --network sepolia 0x3a512DD3a61C398428fCdf7DE806Fea554D7f222
```

Contract on Sepolia Etherscan:

- https://sepolia.etherscan.io/address/0x3a512DD3a61C398428fCdf7DE806Fea554D7f222

---

## 5. V2 Features: Cap, Time-Lock, Tax

### 5.1 Capped Supply

- **`cap()`**: Returns the maximum total supply (10,000,000 × 10^18).
- **`remainingMintable()`**: Returns `cap() - totalSupply()`; how many more tokens can be minted.
- **Mint**: Reverts with `ERC20ExceededCap` if `totalSupply() + amount` would exceed `cap()`.

**Usage**: Before minting, check `remainingMintable()` on Read Contract. Mint only up to that amount (or less).

### 5.2 Time-Locked Transfers

- **`lockTokens(address account, uint256 amount, uint256 unlockAt)`**: **Owner only.** Locks `amount` of `account`’s balance until Unix timestamp `unlockAt`. Account must have at least `amount`; `unlockAt` must be in the future. Overwrites any existing lock for that account.
- **`getLockedBalance(address account)`**: Returns the amount currently locked (0 after unlock time).
- **`getUnlockTime(address account)`**: Returns the unlock timestamp (0 if no lock).
- **`unlockTokens(address account)`**: Anyone can call. If `block.timestamp >= getUnlockTime(account)`, clears the lock and emits `TokensUnlocked`. No-op if not yet unlocked or already cleared.
- **`isUnlocked(address account)`**: Returns true if the account has no effective lock.

**Usage (lock 50,000 for 1 hour):**

1. Ensure the account has at least 50,000 VMGT2 (transfer from owner if needed).
2. Owner: Etherscan Write Contract → `lockTokens(account, 50000000000000000000000, unlockAt)`. For `unlockAt`, use a future Unix timestamp, e.g. `Math.floor(Date.now()/1000) + 3600` (1 hour) in the browser console.
3. That account cannot transfer the locked amount until `unlockAt` has passed. After that, they can transfer, or anyone can call `unlockTokens(account)` to clear the lock.

### 5.3 Transfer Tax

- **`setTaxRate(uint256 rateBps)`**: **Owner only.** Tax rate in basis points (e.g. 100 = 1%, 500 = 5%). Max 500 (5%).
- **`setTaxRecipient(address recipient)`**: **Owner only.** Address that receives the tax. Cannot be zero.
- **`setTaxEnabled(bool enabled)`**: **Owner only.** When true, transfers (except to the tax recipient) are taxed.
- **`taxRate()`**, **`taxRecipient()`**, **`taxEnabled()`**: Read current settings.

**Behavior**: On a transfer of `amount` when tax is enabled, `taxAmount = amount * taxRate / 10000` goes to the tax recipient and `amount - taxAmount` goes to the recipient. Mint and burn are not taxed.

**Usage**: Owner sets recipient and rate (e.g. 100 for 1%), then `setTaxEnabled(true)`. To disable tax, `setTaxEnabled(false)`.

---

## 6. V1 Features (Unchanged)

- **Burnable**: `burn(amount)`, `burnFrom(account, amount)`.
- **Mintable**: `mint(to, amount)` (owner only); respects cap.
- **Pausable**: `pause()`, `unpause()` (owner only); mint and burn still work when paused.
- **ERC-20**: `transfer`, `balanceOf`, `approve`, `allowance`, `transferFrom`.

See `README-v1.md` for detailed usage of burn, mint, and pause.

---

## 7. Interacting via Etherscan

1. Open https://sepolia.etherscan.io/address/0x3a512DD3a61C398428fCdf7DE806Fea554D7f222 → **Contract** → **Read Contract** / **Write Contract**.
2. **Read Contract**: `cap`, `remainingMintable`, `totalSupply`, `balanceOf`, `getLockedBalance`, `getUnlockTime`, `isUnlocked`, `taxRate`, `taxRecipient`, `taxEnabled`, `owner`, `paused`, etc.
3. **Write Contract** (connect wallet):
   - **Owner**: `mint`, `pause`, `unpause`, `lockTokens`, `setTaxRate`, `setTaxRecipient`, `setTaxEnabled`.
   - **Anyone**: `transfer`, `approve`, `burn`, `burnFrom`, `unlockTokens` (for an account past unlock time).

Amounts use 18 decimals (e.g. 50,000 tokens = `50000000000000000000000`).

---

## 8. Security Considerations

- **Owner** can mint (within cap), pause/unpause, lock tokens, and set tax rate/recipient/enabled. Secure the owner key; consider multisig for production.
- **Time-lock**: Only owner can lock; unlock time must be in the future; one lock per address (new lock overwrites).
- **Tax**: Max 5%; recipient must be set; tax does not apply to mint, burn, or transfers to the tax recipient.
- **Cap**: Immutable 10M; mint reverts if it would exceed cap.

---

## 9. Gas Costs

Deployment and key operations: gas is logged by `deploy-v2.js` and visible on Etherscan transaction receipts. See `DEPLOYMENT-HISTORY.md` for deploy gas; for individual functions, check the tx on Etherscan.

---

## 10. Running Tests

```bash
npx hardhat test
```

The V2 test file is `test/VMGToken_v2.test.js`. It covers:

- Baseline ERC‑20 and V1 behavior (transfer, mint, burn, pause).
- **Cap**: deploys with correct cap, cannot mint beyond cap, `remainingMintable` correct.
- **Time-lock**: owner locks, locked balance/unlock time tracked, cannot transfer locked, can transfer unlocked, auto-unlock after timestamp, `unlockTokens` clears lock.
- **Tax**: set rate (max 5%), set recipient, transfer collects tax, recipient gets net, TaxCollected event, mint/burn no tax, enable/disable.
- **Integration**: cap, lock, tax, pause together.

All tests should pass.

---

## 11. Comparison: V0 vs V1 vs V2

| Feature           | V0   | V1   | V2   |
|-------------------|------|------|------|
| ERC‑20 transfer   | Yes  | Yes  | Yes  |
| Burn              | No   | Yes  | Yes  |
| Mint (owner)      | No   | Yes  | Yes (capped) |
| Pause             | No   | Yes  | Yes  |
| Cap (10M)         | No   | No   | Yes  |
| Time-lock         | No   | No   | Yes  |
| Transfer tax      | No   | No   | Yes (optional, max 5%) |
| Owner access      | No   | Yes  | Yes  |

---

## 12. Troubleshooting

### 12.1 “VMGToken: transfer exceeds spendable (locked)”

- The sender has a time-lock on part of their balance. They can only transfer the unlocked portion. Check `getLockedBalance(sender)` and `getUnlockTime(sender)`. After unlock time, they can transfer or anyone can call `unlockTokens(sender)` to clear the lock.

### 12.2 “ERC20ExceededCap” on mint

- Mint would exceed the 10M cap. Check `remainingMintable()` and mint only up to that amount.

### 12.3 “VMGToken: tax rate max 5%”

- `setTaxRate` must be ≤ 500 (basis points).

### 12.4 “VMGToken: lock amount exceeds balance” / “unlock time must be in the future”

- For `lockTokens`, the account must have at least `amount` and `unlockAt` must be greater than current block timestamp.

### 12.5 EnforcedPause / OwnableUnauthorizedAccount

- Same as V1: see `README-v1.md` § 11.

---

## 13. Screenshots and Manual Testing

See `TESTING-V2-METAMASK.md` for a step-by-step manual test flow. Add screenshots of Etherscan transactions (lock, tax, cap enforcement) to the `screenshots/` directory if desired.

---

## 14. DEPLOYMENT-HISTORY.md

V2 Sepolia address is recorded in `DEPLOYMENT-HISTORY.md` and at the top of this file. Update gas used and deployer there if you redeploy.

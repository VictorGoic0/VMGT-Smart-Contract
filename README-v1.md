# VMGToken_v1 (VMGT1) – V1 Deployment Guide

VMGToken_v1 is the **Day 1 MVP** of the VMGToken project: an ERC‑20 token with **burnable**, **mintable**, and **pausable** functionality, deployed to **Sepolia**.

- **Name**: `VMGToken_v1`
- **Symbol**: `VMGT1`
- **Initial Supply**: `1,000,000` tokens
- **Decimals**: `18`
- **Standard**: ERC‑20 (OpenZeppelin) + Burnable, Pausable, Ownable
- **Network**: Sepolia
- **Contract Address (Sepolia)**: `0x4D60dcbD15C5589a8DA99727D9E60a3f3e2f74aB`

This document explains V1 features, how to deploy and verify, run tests, and interact with **mint**, **burn**, **pause**, and **unpause** via Etherscan.

**Manual testing (PR #4)**: Transfer (MetaMask), burn (Etherscan Write Contract), mint (Etherscan Write Contract), and pause/unpause (Etherscan Write Contract) have been tested on Sepolia; transfers fail when paused and succeed after unpause.

---

## 1. Project Overview and Purpose (V1)

VMGToken_v1 extends V0 with:

- **Burnable**: Token holders can destroy their own tokens (`burn`) or tokens they have allowance for (`burnFrom`), reducing total supply.
- **Mintable**: The **owner** (deployer) can mint new tokens to any address via `mint(to, amount)`.
- **Pausable**: The **owner** can `pause()` and `unpause()` the contract. When paused, **transfers** (and `transferFrom`) are blocked; **mint** and **burn** remain allowed for operational flexibility.
- **Owner access control**: `mint`, `pause`, and `unpause` are restricted to the owner (Ownable).

---

## 2. Prerequisites and Dependencies

Same as V0: Node.js (22+), npm, Git, MetaMask, `.env` with `SEPOLIA_RPC_URL`, `SEPOLIA_PRIVATE_KEY`, `ETHERSCAN_API_KEY`. See `README-v0.md` for full setup.

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
npx hardhat run scripts/deploy-v1.js
```

### 4.2 Sepolia Deployment

```bash
npx hardhat run scripts/deploy-v1.js --network sepolia
```

Save the printed contract address and update `DEPLOYMENT-HISTORY.md` with it, the deployer address, and gas used.

### 4.3 Verify on Etherscan

```bash
npx hardhat verify --network sepolia <V1_CONTRACT_ADDRESS>
```

Replace `<V1_CONTRACT_ADDRESS>` with the address from the deploy output. Then open:

- `https://sepolia.etherscan.io/address/<V1_CONTRACT_ADDRESS>#code`

---

## 5. New Features: Burnable, Mintable, Pausable

### 5.1 Burnable

- **`burn(uint256 amount)`**: Caller burns `amount` of their own tokens. Total supply and caller balance decrease.
- **`burnFrom(address account, uint256 amount)`**: Caller burns `amount` from `account` using their allowance (approve first). Total supply and `account` balance decrease.

**Usage example (holder burns own tokens):**

1. You hold VMGT1 in your wallet.
2. Call `burn(amount)` on the contract (e.g. via Etherscan “Write Contract” → Connect Wallet → `burn`, enter amount in wei, e.g. `5000000000000000000` for 5 tokens with 18 decimals).
3. Your balance and total supply decrease by `amount`.

**Usage example (burnFrom with allowance):**

1. Owner approves spender: `approve(spenderAddress, amount)`.
2. Spender calls `burnFrom(ownerAddress, amount)`.
3. Owner’s balance and total supply decrease; allowance is reduced.

### 5.2 Mintable

- **`mint(address to, uint256 amount)`**: **Owner only.** Mints `amount` tokens to `to`. Total supply increases.

**Usage example:**

1. Connect the **owner** wallet (deployer) on Etherscan “Write Contract”.
2. Call `mint(toAddress, amount)` with the recipient address and amount in wei (e.g. `100000000000000000000000` for 100,000 tokens).
3. Recipient balance and total supply increase.

### 5.3 Pausable and Owner Access Control

- **`pause()`**: **Owner only.** Pauses the contract. All **transfers** and **transferFrom** revert while paused. Mint and burn still work.
- **`unpause()`**: **Owner only.** Restores transfers.

**Usage example (pause/unpause):**

1. Owner calls `pause()`. Transfers are disabled; mint and burn still work.
2. Owner calls `unpause()`. Transfers work again.

**Owner-only functions:** `mint`, `pause`, `unpause`. Only the deployer (owner) can call these. Non-owner calls revert with `OwnableUnauthorizedAccount`.

---

## 6. Interacting with New Functions via Etherscan

1. Open the verified contract on Sepolia Etherscan: **Contract** tab → **Read Contract** / **Write Contract**.
2. **Read Contract**: `owner`, `paused`, `totalSupply`, `balanceOf`, etc.
3. **Write Contract**: Click “Connect to Web3” and connect the owner (for mint/pause/unpause) or any holder (for transfer/burn/approve).
   - **mint(to, amount)**: Owner only; use recipient address and amount in wei.
   - **burn(amount)**: Your balance; amount in wei.
   - **burnFrom(account, amount)**: After `approve`; amount in wei.
   - **pause()** / **unpause()**: Owner only; no arguments.

---

## 7. Security Considerations (Owner Privileges)

- **Owner** has exclusive right to **mint**, **pause**, and **unpause**. There is no timelock or multi-sig in this contract; the owner key must be secured.
- **Pausing** only blocks transfers; mint and burn remain available so the owner can still adjust supply or burn in an emergency.
- **Burn** and **burnFrom** are callable by any holder (within balance/allowance); they do not require owner.

---

## 8. Gas Costs

- **Deployment**: Logged by `deploy-v1.js` (see terminal output or `DEPLOYMENT-HISTORY.md` after filling the V1 row).
- **Mint / Burn / Pause / Unpause**: Gas depends on network; check transaction receipts on Etherscan after use.

---

## 9. Running Tests

```bash
npx hardhat test
```

The V1 test file is `test/VMGToken_v1.test.js`. It covers:

- Baseline ERC‑20 (name, symbol, supply, transfer, approve, transferFrom, allowance).
- **Mint**: owner can mint, supply/balance updates, non-owner reverts, Transfer(from=0) event.
- **Burn**: holder can burn, supply/balance decrease, Transfer(to=0), insufficient balance, approve + burnFrom.
- **Pause**: owner pause/unpause, transfers fail when paused (EnforcedPause), non-owner cannot pause/unpause, Paused/Unpaused events, burn and mint still work when paused.

All tests should pass.

---

## 10. Comparison: V0 vs V1

| Feature              | V0 (VMGToken_v0 / VMGT0) | V1 (VMGToken_v1 / VMGT1) |
|----------------------|---------------------------|---------------------------|
| ERC‑20 transfer      | Yes                       | Yes                       |
| approve / transferFrom | Yes                     | Yes                       |
| Initial supply 1M    | Yes                       | Yes                       |
| Burn                 | No                        | Yes (`burn`, `burnFrom`)  |
| Mint (post-deploy)   | No                        | Yes (owner only)          |
| Pause transfers      | No                        | Yes (owner only)          |
| Owner access control | No                        | Yes (Ownable)             |

---

## 11. Troubleshooting

### 11.1 Transfers fail with “EnforcedPause”

- Contract is paused. Only the **owner** can call `unpause()` from Etherscan “Write Contract” (connect owner wallet).

### 11.2 “OwnableUnauthorizedAccount” on mint / pause / unpause

- You are not the owner. Connect the **deployer** wallet when calling `mint`, `pause`, or `unpause`.

### 11.3 Other issues

- Same as V0: RPC, funds, Etherscan API key. See `README-v0.md` § 11.

---

## 12. Screenshots (To Be Added)

For documentation, add screenshots of:

- V1 deployment transaction and verified contract on Etherscan.
- Burn / mint / pause / unpause transactions (Etherscan or MetaMask).
- MetaMask VMGT1 balance (optional).

---

## 13. DEPLOYMENT-HISTORY.md

After deploying V1 to Sepolia, add the contract address, deployer, gas used, and Etherscan link to the V1 section in `DEPLOYMENT-HISTORY.md`.

# V2 Manual MetaMask & Etherscan Testing (PR #6)

Use this guide with your **V2 contract address** on Sepolia. Check off items in `tasks-2.md` PR #6 as you complete them.

**Contract**: VMGToken_v2 (VMGT2) · **Cap**: 10,000,000 · **Initial supply**: 1,000,000

---

## 1. Add token & verify basics

- **1–2** Add VMGToken_v2 to MetaMask (primary): Sepolia → Import token → paste V2 contract address, symbol VMGT2, 18 decimals. Verify primary shows 1,000,000 VMGT2. On Etherscan (Read Contract) confirm `totalSupply`, `cap`, `remainingMintable`.

## 2. V1-style behavior (transfer, mint, pause)

- **3** Basic transfer: send some VMGT2 from primary to secondary. Confirm balances in MetaMask and on Etherscan.
- **4** Mint near cap: Etherscan → Contract → Write Contract → Connect wallet (owner) → `mint(to: primary, amount: 8_000_000e18)` (or enough that totalSupply stays under 10M). Confirm balance and `totalSupply` / `remainingMintable` on Read Contract.
- **5–6** Mint beyond cap: try `mint(primary, amount)` such that new totalSupply would exceed 10M. Should fail (e.g. ERC20ExceededCap). Confirm cap enforcement on Read Contract.

## 3. Time-lock

- **7–8** Ensure secondary has at least 50,000 VMGT2 (transfer from primary if needed). Write Contract → `lockTokens(account: secondary, amount: 50_000e18, unlockAt: <future unix timestamp>)`. Use a timestamp 1 hour ahead: e.g. `Math.floor(Date.now()/1000) + 3600`. Confirm `getLockedBalance(secondary)` and `getUnlockTime(secondary)` on Read Contract.
- **9** Try transferring 50,000+ VMGT2 from secondary to primary. Should fail (transfer exceeds spendable / locked).
- **10–12** After unlock time: either wait 1 hour or use a very short lock (e.g. 60 seconds) and retry. Call `unlockTokens(secondary)` if needed. Then transfer from secondary; should succeed. Confirm `getLockedBalance(secondary)` is 0 and balances updated.

## 4. Transfer tax

- **13–14** Write Contract (owner): `setTaxRate(100)` (1%), `setTaxRecipient(secondary)`, `setTaxEnabled(true)`.
- **15–17** Transfer 10,000 VMGT2 from primary to a *different* address (e.g. a third MetaMask account), so tax recipient is secondary and recipient is someone else. Confirm: that recipient gets 9,900, secondary (tax recipient) gets 100. Use Read Contract `balanceOf` for both.
- **18–19** Mint to an address (owner): no tax. Burn from owner: no tax. Confirm balances and that tax recipient balance did not change from those actions.
- **20** `setTaxEnabled(false)`. Transfer again; full amount to recipient, no tax. Confirm tax recipient balance unchanged.

## 5. Documentation

- **21** Screenshot key transactions (Etherscan tx pages) and/or MetaMask activity.
- **22** Note gas used for new functions (lockTokens, setTaxRate, setTaxRecipient, setTaxEnabled, transfers with tax) from Etherscan transaction receipts.

---

**V2 contract address (Sepolia)**: paste yours here or use DEPLOYMENT-HISTORY.md.

When done, mark all PR #6 tasks in `tasks-2.md` as complete.

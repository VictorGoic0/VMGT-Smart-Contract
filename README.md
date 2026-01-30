# VMGToken — Portfolio ERC-20 Token Project

Custom ERC-20 smart contracts (Solidity) deployed to Ethereum Sepolia testnet, with incremental versions (V0 → V1 → V2) and a planned production mainnet deployment. Built with Hardhat 3, OpenZeppelin contracts, and Mocha + ethers tests.

---

## 1. Project Overview and Motivation

**VMGToken** demonstrates:

- Solidity development and ERC-20 implementation
- Testnet deployment (Sepolia) and Etherscan verification
- Progressive feature addition (burn, mint, pause, cap, time-lock, transfer tax)
- Unit tests and manual MetaMask/Etherscan testing
- Documentation suitable for portfolio review (e.g. BNY Mellon)

**Token (production)**: VMGToken (VMGT), 18 decimals, 1M initial supply, 10M cap.  
**Development versions**: VMGToken_v0 (VMGT0), VMGToken_v1 (VMGT1), VMGToken_v2 (VMGT2).

---

## 2. Feature List by Version

| Version   | Name / Symbol   | Features |
|----------|-----------------|----------|
| **V0**   | VMGToken_v0 / VMGT0 | Basic ERC-20: transfer, balanceOf, approve, transferFrom; 1M initial supply to deployer. |
| **V1**   | VMGToken_v1 / VMGT1 | V0 + burnable, mintable (owner), pausable (owner); mint/burn allowed when paused. |
| **V2**   | VMGToken_v2 / VMGT2 | V1 + capped supply (10M), time-locked transfers (lockTokens, unlockTokens), optional transfer tax (max 5%, owner sets rate/recipient, enable/disable). |
| **Final**| VMGToken / VMGT   | Same as V2 with production naming; mainnet only. |

---

## 3. Architecture Overview

- **Contracts**: `contracts/VMGToken_v0.sol`, `VMGToken_v1.sol`, `VMGToken_v2.sol`. Production: `VMGToken.sol` (to be added in PR #7).
- **Stack**: Solidity 0.8.28, OpenZeppelin (ERC20, ERC20Burnable, ERC20Pausable, ERC20Capped, Ownable), Hardhat 3 (ESM, TypeScript config), Mocha + ethers.
- **Networks**: Sepolia (testnet), Ethereum mainnet (production, when ready).
- **Deploy**: `scripts/deploy-v0.js`, `deploy-v1.js`, `deploy-v2.js`; mainnet script TBD (PR #8).
- **Tests**: `test/VMGToken_v0.test.js`, `VMGToken_v1.test.js`, `VMGToken_v2.test.js`.

---

## 4. Technical Decisions

- **OpenZeppelin**: Audited base contracts for security and consistency.
- **Incremental versions**: Separate contracts per phase (v0, v1, v2) for clear history and testnet validation before production.
- **Testnet-first**: All features deployed and tested on Sepolia before mainnet.
- **Owner-only admin**: Mint, pause/unpause, lockTokens, setTaxRate, setTaxRecipient, setTaxEnabled restricted to deployer (Ownable).

---

## 5. Setup and Installation

### Prerequisites

- Node.js 22+ (project uses latest stable)
- npm, Git, MetaMask
- Sepolia testnet ETH (faucet) for testnet; real ETH for mainnet

### Install

```bash
git clone <repo-url>
cd VMGT-Smart-Contract
npm install
```

### Environment

Copy `.env.example` to `.env` and set:

- `SEPOLIA_RPC_URL` — e.g. Alchemy Sepolia HTTPS URL  
- `SEPOLIA_PRIVATE_KEY` — deployer wallet private key  
- `ETHERSCAN_API_KEY` — for contract verification  

See `.env.example` and `README-v0.md` for full setup.

### Compile

```bash
npx hardhat compile
```

---

## 6. Dependencies

- **hardhat** ^3.x — build and test
- **@nomicfoundation/hardhat-toolbox-mocha-ethers** — Mocha + ethers
- **@openzeppelin/contracts** ^5.x — ERC20 and extensions
- **ethers** ^6.x — contract interaction
- **dotenv** — `.env` loading  
See `package.json` for exact versions.

---

## 7. Testing

Run all tests:

```bash
npx hardhat test
```

Run a single suite:

```bash
npx hardhat test test/VMGToken_v2.test.js
```

V0, V1, and V2 test files cover: deployment metadata, ERC-20 behavior, mint/burn/pause, cap, time-lock, and transfer tax. Manual testing: MetaMask + Etherscan (see `TESTING-V2-METAMASK.md` for V2).

---

## 8. Deployment

### Testnet (Sepolia)

```bash
npx hardhat run scripts/deploy-v0.js --network sepolia
npx hardhat run scripts/deploy-v1.js --network sepolia
npx hardhat run scripts/deploy-v2.js --network sepolia
```

Save the contract address from the output and update `DEPLOYMENT-HISTORY.md`. Verify on Etherscan (if hardhat-verify is installed):

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

V2 has no constructor arguments. V0 and V1 also have no constructor arguments.

### Mainnet (Production)

Mainnet deployment (VMGToken / VMGT) is planned for when real ETH is available. Script and steps will be in PR #8; see `tasks-2.md` for the checklist.

---

## 9. Contract Addresses and Etherscan

All deployment addresses and Etherscan links are in **`DEPLOYMENT-HISTORY.md`**.

- **V0 Sepolia**: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`  
  [Etherscan](https://sepolia.etherscan.io/address/0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E)
- **V1 Sepolia**: `0x4D60dcbD15C5589a8DA99727D9E60a3f3e2f74aB`  
  [Etherscan](https://sepolia.etherscan.io/address/0x4D60dcbD15C5589a8DA99727D9E60a3f3e2f74aB)
- **V2 Sepolia**: `0x3a512DD3a61C398428fCdf7DE806Fea554D7f222`  
  [Etherscan](https://sepolia.etherscan.io/address/0x3a512DD3a61C398428fCdf7DE806Fea554D7f222)
- **Production mainnet**: TBD (deferred until mainnet deploy)

---

## 10. Token Specifications

- **Name (prod)**: VMGToken  
- **Symbol (prod)**: VMGT  
- **Decimals**: 18  
- **Initial supply**: 1,000,000 tokens (1e6 × 10^18)  
- **Cap (V2 / prod)**: 10,000,000 tokens (1e7 × 10^18)  
- **Standard**: ERC-20 + Burnable, Pausable, Capped (V2), custom time-lock and tax (V2)

---

## 11. User Guide: Interacting with the Token

- **MetaMask**: Add custom token (contract address, symbol VMGT0/VMGT1/VMGT2, 18 decimals). Send/receive as usual.
- **Etherscan**: Contract → Read Contract (balances, totalSupply, cap, locked balance, tax settings). Write Contract (owner: mint, pause, unpause, lockTokens, setTaxRate, setTaxRecipient, setTaxEnabled; anyone: transfer, approve, burn, unlockTokens).
- **V2 specifics**: Use `lockTokens(account, amount, unlockAt)` with a future Unix timestamp; use `getLockedBalance` / `getUnlockTime` / `unlockTokens`. Tax: set recipient and rate, enable; transfers (except to tax recipient) are then taxed.

See `README-v0.md`, `README-v1.md`, and `TESTING-V2-METAMASK.md` for step-by-step flows.

---

## 12. Functions Summary

- **ERC-20**: `transfer`, `balanceOf`, `approve`, `allowance`, `transferFrom`  
- **V1+**: `mint(to, amount)`, `burn(amount)`, `burnFrom(account, amount)`, `pause()`, `unpause()` (owner)  
- **V2+**: `cap()`, `remainingMintable()`, `lockTokens(account, amount, unlockAt)`, `getLockedBalance(account)`, `getUnlockTime(account)`, `unlockTokens(account)`, `isUnlocked(account)`, `setTaxRate(bps)`, `setTaxRecipient(addr)`, `setTaxEnabled(bool)`, `taxRate()`, `taxRecipient()`, `taxEnabled()`

Full parameter and revert behavior: see contract NatSpec and `README-v1.md` for V1; V2 adds cap, time-lock, and tax as above.

---

## 13. Security Considerations

- **Owner key**: Deployer has mint, pause, lock, and tax control. Secure the private key and consider multisig for production.
- **Pausable**: Use pause in emergencies only; mint and burn remain active when paused.
- **Tax**: Max 5% (500 basis points); recipient must be set and tax enabled for it to apply.
- **Time-lock**: Only owner can lock; unlock time must be in the future; locked balance cannot be transferred until unlock or cleared via `unlockTokens`.
- **OpenZeppelin**: Contracts rely on audited OpenZeppelin code; review dependencies and upgrade policy for production.

---

## 14. Gas Costs

Gas used for deployment and key operations is logged by the deploy scripts and appears on Etherscan transaction receipts. See `DEPLOYMENT-HISTORY.md` for deploy gas; for individual functions, check the relevant tx on Etherscan.

---

## 15. Troubleshooting

- **EnforcedPause**: Transfers revert when the contract is paused. Owner must call `unpause()`.
- **OwnableUnauthorizedAccount**: Only the owner can call mint, pause, unpause, lockTokens, setTaxRate, setTaxRecipient, setTaxEnabled.
- **VMGToken: transfer exceeds spendable (locked)**: Sender is trying to transfer more than their unlocked balance. Check `getLockedBalance(sender)` and `getUnlockTime(sender)`.
- **ERC20ExceededCap**: Mint would exceed the 10M cap. Check `remainingMintable()`.
- **VMGToken: tax rate max 5%**: `setTaxRate` must be ≤ 500 (basis points).
- **Read/Write Contract not showing on Etherscan**: Contract must be verified; wait a short time after verification and refresh.

---

## 16. Screenshots and Transaction Examples

Screenshots from testing are in the `screenshots/` directory. Transaction examples and hashes can be recorded in `DEPLOYMENT-HISTORY.md` or in version-specific READMEs.

---

## 17. Deployment History and Comparison

**Deployment history**: `DEPLOYMENT-HISTORY.md` (all versions, networks, addresses, gas).

**Comparison**: V0 = base ERC-20; V1 = + burn, mint, pause; V2 = + cap (10M), time-lock, transfer tax; Final = V2 with production name/symbol and mainnet deployment.

---

## 18. Lessons Learned and Future Improvements

- Testnet verification on Etherscan can take a short delay before Read/Write Contract appears.
- Mint and burn in V2 bypass pause by design (calling ERC20._update for those paths); transfer remains pausable.
- Time-lock uses a single lock per address (new lock overwrites); could be extended to multiple locks per address.
- Mainnet deployment and production contract (VMGToken.sol) are deferred until ETH is available; see `tasks-2.md` PR #7 and PR #8.

---

## 19. References and Resources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Hardhat](https://hardhat.org/) / [Hardhat 3](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3)
- [Ethereum Sepolia](https://sepolia.dev/)
- [Etherscan](https://etherscan.io/) / [Sepolia Etherscan](https://sepolia.etherscan.io/)
- Project task tracking: `tasks-0.md`, `tasks-1.md`, `tasks-2.md`  
- Context summary: `CONTEXT-SUMMARY.md`  
- Memory bank: `memory-bank/`

---

## 20. Project Summary (Portfolio)

VMGToken is a multi-version ERC-20 token project (V0 → V1 → V2 → production) built with Solidity, OpenZeppelin, and Hardhat. It demonstrates testnet deployment and verification (Sepolia), unit and manual testing, and features such as capped supply, time-locked transfers, and configurable transfer tax. Production mainnet deployment is planned once ETH is available. The repository includes deployment history, version-specific READMEs, and a master README for quick onboarding and portfolio review.

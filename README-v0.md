# VMGToken_v0 (VMGT0) – V0 Deployment Guide

VMGToken_v0 is the **Day 0 MVP** of the VMGToken project: a basic ERC‑20 token deployed to the **Sepolia** Ethereum testnet.

- **Name**: `VMGToken_v0`
- **Symbol**: `VMGT0`
- **Initial Supply**: `1,000,000` tokens
- **Decimals**: `18`
- **Standard**: ERC‑20 (OpenZeppelin)
- **Network**: Sepolia
- **Contract Address (Sepolia)**: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`

This document explains how to:

- Set up the project locally
- Compile and deploy VMGToken_v0
- Verify the contract on Etherscan
- Run automated tests
- View the token and balances in MetaMask

---

## 1. Project Overview and Purpose

VMGToken is a **portfolio‑grade ERC‑20 token** project designed to demonstrate:

- Practical Solidity and Hardhat experience
- Testnet deployment on Sepolia
- Contract verification on multiple explorers
- Clean documentation and repeatable deployment processes

`VMGToken_v0` is the first iteration. It focuses on **core ERC‑20 behavior only**:

- Mint a fixed initial supply to the deployer
- Transfer tokens between addresses
- Check balances and allowances
- Approve and spend via `transferFrom`

Later versions (V1, V2, production) will add burnable, mintable, pausable, capped, and more advanced features.

---

## 2. Prerequisites and Dependencies

### 2.1 System Requirements

- **Node.js**: Latest stable (Node 22+ recommended)
- **npm**: Comes with Node
- **Git**: For cloning the repository
- **MetaMask**: Browser wallet extension

### 2.2 npm Dependencies

Installed via `npm install`:

- `hardhat` – development framework (Hardhat 3, ESM)
- `@nomicfoundation/hardhat-toolbox-mocha-ethers` – mocha + ethers integration
- `@nomicfoundation/hardhat-ethers`
- `@nomicfoundation/hardhat-ignition`
- `ethers`
- `@openzeppelin/contracts` – audited ERC‑20 implementation
- `dotenv` – loads `.env` into `process.env`
- Type definitions and test libs (`chai`, `mocha`, etc.)

### 2.3 Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```bash
SEPOLIA_RPC_URL=YOUR_ALCHEMY_OR_INFURA_SEPOLIA_URL
SEPOLIA_PRIVATE_KEY=YOUR_DEPLOYER_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

- `SEPOLIA_RPC_URL`: HTTPS RPC URL from Alchemy or Infura for the Sepolia network.
- `SEPOLIA_PRIVATE_KEY`: Exported from MetaMask (primary deployer account).
- `ETHERSCAN_API_KEY`: From your Etherscan account, used for verification.

**Security note**: `.env` is in `.gitignore` and must **not** be committed.

---

## 3. Setup Instructions

### 3.1 Clone and Install

```bash
git clone https://github.com/VictorGoic0/VMGT-Smart-Contract.git
cd VMGT-Smart-Contract
npm install
```

### 3.2 Configure Environment

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Fill in:

   - `SEPOLIA_RPC_URL`
   - `SEPOLIA_PRIVATE_KEY`
   - `ETHERSCAN_API_KEY`

3. Confirm `hardhat.config.ts` reads:
   - `SEPOLIA_RPC_URL` and `SEPOLIA_PRIVATE_KEY` via `configVariable`
   - `verify.etherscan.apiKey` from `process.env.ETHERSCAN_API_KEY`

---

## 4. Getting Sepolia Testnet ETH

VMGToken_v0 is deployed on **Sepolia**, so you need **testnet ETH** (not real money).

Typical steps:

1. In MetaMask, enable **Show test networks** and add **Sepolia** if needed.
2. Copy your **primary (deployer)** account address.
3. Visit a Sepolia faucet (e.g. Google’s Sepolia faucet).
4. Request funds to your deployer address.
5. Confirm the balance appears in MetaMask on the Sepolia network.

You should have enough test ETH to pay for contract deployment and a few transactions.

---

## 5. Compilation

To compile all contracts:

```bash
npx hardhat compile
```

This uses Solidity `0.8.28` with profiles configured in `hardhat.config.ts`.

If compilation fails, check:

- Node.js version (use a recent LTS or current)
- That `npm install` completed successfully

---

## 6. Deployment to Sepolia

The V0 deployment uses a custom script: `scripts/deploy-v0.js`.

### 6.1 Local Test Deployment (Optional)

You can first sanity‑check the script on a local Hardhat network:

```bash
npx hardhat run scripts/deploy-v0.js
```

This spins up an in‑memory chain, deploys `VMGToken_v0`, and logs:

- Deployer address and balance
- Deployed contract address
- Initial token supply
- Deployer token balance
- Gas usage

### 6.2 Sepolia Deployment

With `.env` configured:

```bash
npx hardhat run scripts/deploy-v0.js --network sepolia
```

On success, the script prints the **Sepolia contract address**. For the current V0:

- **VMGToken_v0 (Sepolia)**: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`

You can also find deployment metadata in `DEPLOYMENT-HISTORY.md`.

---

## 7. Verifying the Contract on Etherscan

With deployment complete and `ETHERSCAN_API_KEY` set, run:

```bash
npx hardhat verify --network sepolia 0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E
```

Under the hood:

- Hardhat uses the `verify.etherscan` config block.
- It first attempts verification with a **minimal compiler input**.
- If that fails, it automatically retries with the **full solc input**, which succeeded for this project.

Once finished, you should see:

- A success message in the terminal.
- Source code visible and verified on Etherscan.

**Direct Etherscan link:**

- `https://sepolia.etherscan.io/address/0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E#code`

---

## 8. Running Tests

The project includes:

- Foundry‑style Solidity tests (for `Counter.t.sol`).
- Mocha + ethers tests for `VMGToken_v0`.

To run everything:

```bash
npx hardhat test
```

The V0 test file is `test/VMGToken_v0.test.js` and covers:

- Deployment metadata (name, symbol, decimals).
- Initial supply and deployer balance.
- `balanceOf`, `transfer`, `approve`, `transferFrom`, `allowance`.
- Revert behavior for:
  - Insufficient balance
  - Invalid receiver (zero address)
  - Insufficient allowance

All tests should pass before considering V0 complete.

---

## 9. MetaMask Setup for Viewing VMGToken_v0

Even though PR #5 is a manual phase, here’s how to **view the token** in MetaMask.

### 9.1 Add VMGToken_v0 as a Custom Token (Primary Account)

1. Open MetaMask and switch to the **Sepolia** network.
2. Click **Import tokens** → **Custom token**.
3. Enter:
   - **Token contract address**: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`
   - **Token symbol**: `VMGT0` (MetaMask may fill this in automatically)
   - **Decimals**: `18` (should auto‑populate)
4. Confirm and add the token.

You should see:

- **Balance**: `1,000,000 VMGT0` in the **primary (deployer)** account.

### 9.2 Optional: Add to Secondary Account

Repeat the same **Import tokens** flow on your **secondary** account after you’ve transferred tokens to it (see PR #5 checklist).

---

## 10. Token Specifications and ERC‑20 Interface

### 10.1 Core Specs

- **Contract**: `VMGToken_v0`
- **Name**: `VMGToken_v0`
- **Symbol**: `VMGT0`
- **Initial Supply**: `1,000,000` tokens
- **Decimals**: `18`
- **Network**: Sepolia
- **Address**: `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E`

### 10.2 Implemented ERC‑20 Functions

Inherited from OpenZeppelin’s `ERC20`:

- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`
- `balanceOf(address)`
- `transfer(address,uint256)`
- `allowance(address,address)`
- `approve(address,uint256)`
- `transferFrom(address,address,uint256)`

Events:

- `Transfer(address indexed from, address indexed to, uint256 value)`
- `Approval(address indexed owner, address indexed spender, uint256 value)`

---

## 11. Troubleshooting

### 11.1 Hardhat Cannot Connect to Sepolia

- Symptom: RPC errors, timeouts, or “network not found”.
- Checks:
  - Verify `SEPOLIA_RPC_URL` is correct and has no quotes around it.
  - Ensure your Alchemy/Infura project allows Sepolia traffic.

### 11.2 Insufficient Funds for Deployment

- Symptom: Deployment transaction fails or is never mined.
- Checks:
  - Confirm your deployer account has enough **Sepolia test ETH** in MetaMask.
  - Try reducing other pending transactions or increasing gas price.

### 11.3 Etherscan Verification Fails with “API Key Empty”

- Symptom: `HHE80029: The Etherscan API key is empty.`
- Fix:
  - Ensure `ETHERSCAN_API_KEY` is set in `.env`.
  - Make sure `hardhat.config.ts` uses:
    - `verify.etherscan.apiKey: process.env.ETHERSCAN_API_KEY ?? ""`

### 11.4 Etherscan Verification Fails on First Try

- Symptom: “Initial verification attempt failed using the minimal compiler input” followed by success.
- Explanation:
  - Hardhat first tries a minimal compiler input, then automatically retries with the full solc input.
  - If the second attempt succeeds, this is expected behavior and not an error.

---

## 12. MetaMask Transfer Testing Process (PR #5 Preview)

Although PR #5 is executed manually, the high‑level flow is:

1. **Primary account** (deployer):
   - Import VMGToken_v0 as a custom token.
   - Confirm balance of `1,000,000 VMGT0`.
2. **Transfer 10,000 VMGT0** from primary → secondary.
3. Wait for transaction confirmation on Sepolia; inspect it on Etherscan.
4. In **secondary account**:
   - Import VMGToken_v0 and confirm `10,000 VMGT0`.
5. Verify primary now has `990,000 VMGT0`.
6. Transfer `5,000 VMGT0` from secondary → primary.
7. Confirm final balances:
   - Primary: `995,000 VMGT0`
   - Secondary: `5,000 VMGT0`
8. Capture screenshots of token balances and transaction history for documentation.

These steps, combined with the unit tests, validate that V0 behaves correctly on chain.

---

## 13. Screenshots (To Be Added)

For a complete portfolio package, add screenshots of:

- Successful deployment transaction on Etherscan.
- Verified contract code page.
- MetaMask balances for primary and secondary accounts.
- Token transfer transaction details.

These can be linked or embedded here once captured.

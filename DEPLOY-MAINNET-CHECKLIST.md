# Mainnet Deployment Checklist (PR #8)

Use this checklist when your ETH is available to deploy VMGToken to Ethereum mainnet.

---

## Before ETH is available (prep — do now)

- [x] Create `deploy-mainnet.js` (scripts/)
- [x] Script uses VMGToken (production) contract
- [x] Script has mainnet safety checks (chainId 1, balance check, warnings)
- [x] Mainnet network in Hardhat config (hardhat.config.ts)
- [x] .env.example includes MAINNET_RPC_URL, MAINNET_PRIVATE_KEY
- [x] Test deployment flow on testnet: run `npx hardhat run scripts/deploy-vmgt-sepolia.js --network sepolia` (optional; needs Sepolia ETH)
- [x] Deployment checklist created (this file)

---

## When ETH is available

### 1. Environment

- [ ] Add to `.env`:
  - `MAINNET_RPC_URL` — Alchemy/Infura mainnet HTTPS URL
  - `MAINNET_PRIVATE_KEY` — deployer wallet private key (same or different from Sepolia)
- [ ] ETHERSCAN_API_KEY set in .env (for verification)

### 2. Pre-deploy checks

- [ ] Deployer account has sufficient ETH (recommend ≥ 0.02 ETH for deploy + buffer)
- [ ] Deployer address is correct (check script output)
- [ ] You have reviewed contract parameters in the script output

### 3. Deploy

- [ ] Uncomment the deployment block in `scripts/deploy-mainnet.js` (search for `DEPLOYMENT CODE - UNCOMMENT`)
- [ ] Run: `npx hardhat run scripts/deploy-mainnet.js --network mainnet`
- [ ] Confirm script reports mainnet (Chain ID 1) and sufficient balance
- [ ] Let deployment complete; note contract address and transaction hash

### 4. After deploy

- [ ] Save deployment transaction details (tx hash, block number, gas used, contract address)
- [ ] Wait for multiple block confirmations (e.g. 3–5)
- [ ] Verify on Etherscan: `npx hardhat verify --network mainnet <CONTRACT_ADDRESS>`
- [ ] Check contract source on Etherscan matches VMGToken.sol
- [ ] Confirm constructor parameters on Etherscan (name VMGToken, symbol VMGT, cap 10M)

### 5. MetaMask and quick test

- [ ] Add VMGToken to MetaMask (mainnet): contract address, symbol VMGT, decimals 18
- [ ] Confirm token and balance show correctly
- [ ] Perform a small test transfer
- [ ] Confirm transfer and gas on Etherscan

### 6. Documentation

- [ ] Add mainnet contract address and tx details to DEPLOYMENT-HISTORY.md
- [ ] Update README.md with mainnet deployment info and Etherscan link
- [ ] (Optional) Announce contract address if desired

---

## Contract parameters (no constructor args)

| Parameter      | Value      |
| -------------- | ---------- |
| Name           | VMGToken   |
| Symbol         | VMGT       |
| Decimals       | 18         |
| Initial supply | 1,000,000  |
| Supply cap     | 10,000,000 |
| Owner          | Deployer   |
| Paused         | false      |
| Tax            | disabled   |

---

## Commands reference

```bash
# Test deploy same contract to Sepolia (optional)
npx hardhat run scripts/deploy-vmgt-sepolia.js --network sepolia

# Mainnet deploy (after uncommenting deployment code)
npx hardhat run scripts/deploy-mainnet.js --network mainnet

# Verify on Etherscan mainnet
npx hardhat verify --network mainnet <CONTRACT_ADDRESS>
```

---

## Stopping point (before ETH available)

All tasks that do **not** require ETH are done:

- Script created and mainnet-only with safety checks
- Mainnet config and .env.example updated
- Sepolia test script created (`deploy-vmgt-sepolia.js`) for final test on testnet
- This checklist is ready

When ETH is available, complete the “When ETH is available” section above.

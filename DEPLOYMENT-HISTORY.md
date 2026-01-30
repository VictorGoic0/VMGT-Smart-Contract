# Deployment History

All testnet deployments use Sepolia. Production mainnet deployment (VMGToken / VMGT) is planned for a later date when ETH is available.

---

## VMGToken_v0 (Sepolia)

| Field | Value |
|-------|--------|
| **Network** | Sepolia |
| **Contract address** | `0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E` |
| **Deployer** | `0x8034e95855189024b5A9A2B7C55d16bCe5d336dD` |
| **Gas used** | 951,420 |
| **Etherscan** | https://sepolia.etherscan.io/address/0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E |
| **Blockscout (verified)** | https://eth-sepolia.blockscout.com/address/0xC68280a3F4cd791feDb8997C6690Bce95dFFfE7E#code |

---

## VMGToken_v1 (Sepolia)

| Field | Value |
|-------|--------|
| **Network** | Sepolia |
| **Contract address** | *(paste from deploy output: `npx hardhat run scripts/deploy-v1.js --network sepolia`)* |
| **Deployer** | *(same as V0 deployer unless you used a different key)* |
| **Gas used** | *(from deploy script output)* |
| **Etherscan** | https://sepolia.etherscan.io/address/<V1_ADDRESS> |

*(Replace `<V1_ADDRESS>` with the V1 contract address. Verify: `npx hardhat verify --network sepolia <V1_ADDRESS>`.)*

---

## VMGToken_v2 (Sepolia)

| Field | Value |
|-------|--------|
| **Network** | Sepolia |
| **Contract address** | *(paste from deploy output: `npx hardhat run scripts/deploy-v2.js --network sepolia`)* |
| **Deployer** | *(same as V0/V1 deployer unless you used a different key)* |
| **Gas used** | *(from deploy script output)* |
| **Etherscan** | https://sepolia.etherscan.io/address/<V2_ADDRESS> |

*(Replace `<V2_ADDRESS>` with the V2 contract address. VMGToken_v2 has no constructor arguments for verification.)*

---

## VMGToken (Production — Mainnet)

| Field | Value |
|-------|--------|
| **Network** | Ethereum mainnet |
| **Contract address** | TBD |
| **Deployer** | TBD |
| **Gas used** | TBD |
| **Etherscan** | TBD |

*Mainnet deployment deferred until ETH is available. See `tasks-2.md` PR #7 (production contract prep) and PR #8 (mainnet deploy).*

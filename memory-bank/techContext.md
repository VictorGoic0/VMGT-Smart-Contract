# Technical Context: VMGToken Development Stack

## Technologies Used

### Core Technologies

- **Solidity**: Smart contract programming language
  - Version: Latest stable (0.8.x recommended)
  - Features: Built-in overflow protection, modern syntax

### Development Framework

- **Hardhat 3**: Ethereum development environment (ESM, `"type": "module"`)
  - Compilation, testing, deployment
  - Config: `hardhat.config.ts` (TypeScript)
  - Init: `npx hardhat --init` (not `npx hardhat init`)
  - Plugins: hardhat-toolbox-mocha-ethers, optional Etherscan for verification

### Contract Libraries

- **OpenZeppelin Contracts**: Audited smart contract library
  - ERC20: Base token implementation
  - ERC20Burnable: Token burning functionality
  - ERC20Pausable: Emergency pause mechanism
  - ERC20Capped: Maximum supply enforcement
  - Ownable: Access control pattern

### Testing

- **Hardhat Test**: Built-in testing framework
- **Ethers.js**: Ethereum library for testing
- **Chai**: Assertion library

### Deployment & Interaction

- **MetaMask**: Browser wallet (primary = deployer, secondary = transfer testing)
- **Etherscan**: Blockchain explorer and contract verification (API key in .env)
- **Alchemy**: RPC provider; `SEPOLIA_RPC_URL` in .env points to Alchemy Sepolia endpoint
- **dotenv**: Loads .env into process.env so Hardhat reads config variables

## Development Setup

### Prerequisites

- Node.js and npm (latest stable version)
- Git for version control
- MetaMask browser extension
- Testnet ETH from faucet (free)
- Real ETH for mainnet deployment ($5-20 estimated)

### Project Structure

```
VMGT-Smart-Contract/
├── contracts/          # VMGToken_v0.sol, VMGToken_v1.sol, VMGToken_v2.sol, VMGToken.sol (production)
├── test/               # VMGToken_v0.test.js, VMGToken_v1.test.js, VMGToken_v2.test.js, VMGToken.test.js
├── scripts/            # deploy-v0.js, deploy-v1.js, deploy-v2.js, deploy-mainnet.js (mainnet; deploy code commented out)
├── ignition/modules/   # Hardhat Ignition deployment modules (from init)
├── hardhat.config.ts   # Hardhat 3 config (Sepolia via configVariable)
├── .env                # Secrets: SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY, ETHERSCAN_API_KEY
├── .env.example        # Template for .env (git-tracked)
├── .gitignore          # Includes .env
└── package.json        # "type": "module", Hardhat 3, OpenZeppelin, dotenv, Mocha, ethers
```

### Environment Variables (.env)

- **SEPOLIA_RPC_URL**: Alchemy Sepolia HTTPS URL (from Alchemy dashboard)
- **SEPOLIA_PRIVATE_KEY**: Deployer wallet private key (MetaMask export)
- **ETHERSCAN_API_KEY**: For contract verification (etherscan.io/myapikey)
- **Mainnet (PR #8)**: MAINNET_RPC_URL, MAINNET_PRIVATE_KEY (when deploying to mainnet)

### Installation Steps (PR #1 – done)

1. Node.js and npm installed
2. Hardhat project initialized: `npx hardhat --init` (mocha-ethers template)
3. OpenZeppelin contracts installed
4. Sepolia network in hardhat.config.ts via `configVariable("SEPOLIA_RPC_URL")`
5. .env and .env.example created; .env in .gitignore; dotenv loaded in hardhat.config.ts
6. Alchemy API key → SEPOLIA_RPC_URL; Etherscan API key → ETHERSCAN_API_KEY
7. MetaMask: primary + secondary accounts; Sepolia added as network; testnet ETH via Google faucet

## Technical Constraints

### Blockchain Constraints

- **Immutability**: Deployed contracts cannot be modified
- **Gas Costs**: Every operation costs ETH
- **Network Congestion**: Transaction times vary
- **Finality**: Transactions require block confirmations

### Development Constraints

- **Version Compatibility**: Solidity version must match compiler
- **Gas Limits**: Contract size and operation costs
- **Testnet Limitations**: Fake ETH, may have downtime
- **Mainnet Costs**: Real money required for deployment

### Security Constraints

- **No Code Changes**: Bugs require new deployment
- **Access Control**: Owner privileges are permanent
- **Private Keys**: Must be kept secure
- **Smart Contract Audits**: Recommended before mainnet

## Dependencies

### npm Packages

- `hardhat`: Development framework
- `@openzeppelin/contracts`: Smart contract library
- `ethers`: Ethereum interaction library
- `dotenv`: Environment variable management

### External Services

- **Ethereum Network**: Sepolia testnet, Ethereum mainnet
- **Node Providers**: Infura or Alchemy (for network access)
- **Block Explorers**: Etherscan (for verification and interaction)
- **Faucets**: Sepolia testnet ETH faucets

## Deployment Platforms

### Testnet

- **Sepolia**: Ethereum testnet
- **Cost**: Free (testnet ETH from faucets)
- **Purpose**: Testing and development

### Mainnet

- **Ethereum Mainnet**: Production blockchain
- **Cost**: Real ETH ($5-20 estimated for deployment)
- **Purpose**: Final production deployment

## Compatibility Requirements

- Node.js: v22+ (project uses v24.x)
- Hardhat: 3.x (ESM; init: `npx hardhat --init`)
- OpenZeppelin Contracts: 5.x compatible with Solidity 0.8.x
- MetaMask: Latest browser extension; Sepolia added manually if not present
- Solidity: 0.8.28 (in hardhat.config.ts)

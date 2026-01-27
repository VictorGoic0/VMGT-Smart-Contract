# Project Brief: VMGToken ERC-20 Smart Contract

## Core Requirements

Build and deploy a custom ERC-20 token smart contract to demonstrate blockchain development capabilities. This project showcases smart contract development, Ethereum deployment experience, and Web3 interaction skills.

## Project Goals

- Develop hands-on Solidity smart contract experience
- Deploy contracts to Ethereum testnet (Sepolia) and mainnet
- Demonstrate understanding of token standards and blockchain fundamentals
- Create portfolio artifact with deployment history

## Token Specifications

- **Name**: VMGToken (production) / VMGToken_v0, VMGToken_v1, VMGToken_v2 (development versions)
- **Symbol**: VMGT (production) / VMGT0, VMGT1, VMGT2 (development versions)
- **Initial Supply**: 1,000,000 tokens
- **Standard**: ERC-20
- **Language**: Solidity
- **Decimals**: 18 (standard)

## Development Phases

### Day 0 MVP - Basic ERC-20 (V0)
- Core ERC-20 functionality (transfer, balance, approve)
- Mint initial supply to deployer
- Deploy to Sepolia testnet
- Unit tests and MetaMask testing

### Day 1 MVP - Enhanced Features (V1)
- Burnable: Destroy tokens to reduce supply
- Mintable: Create additional tokens post-deployment
- Pausable: Emergency stop mechanism for transfers
- Owner access control

### Day 2 MVP - Advanced Features (V2)
- Capped supply: Maximum token limit (10,000,000)
- Time-locked transfers: Tokens locked until specific time
- Transfer tax: Optional percentage fee on transfers
- Comprehensive testing and security review

### Final Production Deployment
- Deploy best version to Ethereum mainnet
- Professional naming (VMGToken/VMGT)
- Complete documentation package
- Portfolio-ready write-up

## Success Criteria

- Successfully deploy working ERC-20 token to testnet
- Complete token transfers between addresses
- Unit tests pass for all functionality
- Clean, well-documented code
- Successful mainnet deployment (stretch goal)
- Portfolio-ready documentation and write-up

## Key Constraints

- Each deployment creates immutable contract at new address
- Multiple testnet deployments demonstrate iterative development
- Final mainnet deployment uses professional naming
- Draft versions clearly marked (v0, v1, v2) to distinguish from production

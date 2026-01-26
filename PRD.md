# PRD: ERC-20 Token Smart Contract Development

## Overview

Build and deploy a custom ERC-20 token smart contract to demonstrate blockchain development capabilities. This project will showcase smart contract development, Ethereum deployment experience, and Web3 interaction skills.

## Background

Building an ERC-20 token contract provides tangible portfolio evidence of smart contract development skills.

## Objectives

- Develop hands-on Solidity smart contract experience
- Deploy contracts to Ethereum testnet and mainnet
- Demonstrate understanding of token standards and blockchain fundamentals
- Create portfolio artifact with deployment history

## Token Specifications

- **Name**: VMGToken
- **Symbol**: VMGT
- **Initial Supply**: 1,000,000 tokens
- **Standard**: ERC-20
- **Language**: Solidity

## Development Phases

### Day 0 MVP - Basic ERC-20

**Token Name**: VMGToken_v0 / VMGT0

**Core Features**:

- Mint initial supply (1M tokens)
- Transfer tokens between addresses
- Check token balance
- Approve spending allowances
- Standard ERC-20 interface compliance

**Deliverables**:

- Basic smart contract in Solidity
- Unit tests
- Deploy to Ethereum testnet (Sepolia)
- Test token transfer using MetaMask (multiple accounts within same wallet)
- Deployment documentation

### Day 1 MVP - Enhanced Features

**Token Name**: VMGToken_v1 / VMGT1

**Additional Features**:

- Burnable: Destroy tokens to reduce supply
- Mintable: Create additional tokens post-deployment
- Pausable: Emergency stop mechanism for transfers

**Deliverables**:

- Updated smart contract with enhanced features
- Additional unit tests for new functionality
- Deploy new version to testnet
- Updated documentation

### Day 2 MVP - Advanced Features

**Token Name**: VMGToken_v2 / VMGT2

**Additional Features**:

- Capped supply: Maximum token limit
- 1-2 advanced features from: staking mechanics, governance/voting, time-locked transfers, or transfer taxation

**Deliverables**:

- Fully-featured smart contract
- Comprehensive unit test suite
- Deploy final draft to testnet
- Complete documentation package

### Final Production Deployment

**Token Name**: VMGToken / VMGT

**Deliverables**:

- Deploy best version to Ethereum mainnet
- Full write-up including:
  - Project overview and technical decisions
  - Deployment addresses for all versions (testnet + mainnet)
  - Architecture and feature explanations
  - Testing methodology
  - Step-by-step deployment instructions
- Complete README with version history

## Technical Requirements

- Solidity for smart contract development
- Unit tests for all contract functions
- MetaMask for wallet interaction and token transfers
- Testnet ETH from faucet (free) for testnet deployments
- Real ETH for mainnet deployment (estimated $5-20 in gas fees)

## Key Concepts

- **Smart Contract**: Self-executing code on blockchain
- **ERC-20**: Token standard defining interface for fungible tokens
- **Testnet**: Testing environment (Sepolia) using fake ETH
- **Mainnet**: Production Ethereum blockchain
- **Immutability**: Deployed contracts cannot be modified; new features require new deployments

## Testing Strategy

- Unit tests for all contract functions
- Manual testing via MetaMask using multiple accounts
- Test token transfers between addresses
- Verify all features work as expected before mainnet deployment

## Documentation Requirements

- Deployment instructions for testnet and mainnet
- Full technical write-up explaining architecture and decisions
- Version history with all deployment addresses
- README with setup and usage instructions

## Success Criteria

- Successfully deploy working ERC-20 token to testnet
- Complete token transfers between addresses
- Unit tests pass for all functionality
- Clean, well-documented code
- (Stretch) Successful mainnet deployment
- Portfolio-ready documentation and write-up

## Notes

- Each deployment creates immutable contract at new address
- Multiple testnet deployments demonstrate iterative development
- Final mainnet deployment uses professional naming (VMGToken/VMGT)
- Draft versions clearly marked (v0, v1, v2) to distinguish from production

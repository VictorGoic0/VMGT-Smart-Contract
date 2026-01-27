# System Patterns: VMGToken Architecture

## System Architecture

### Contract Structure
```
VMGToken_v0 (Basic)
├── ERC20 (OpenZeppelin)
└── Standard ERC-20 functions

VMGToken_v1 (Enhanced)
├── ERC20 (OpenZeppelin)
├── ERC20Burnable (OpenZeppelin)
├── ERC20Pausable (OpenZeppelin)
└── Ownable (OpenZeppelin)

VMGToken_v2 (Advanced)
├── ERC20 (OpenZeppelin)
├── ERC20Burnable (OpenZeppelin)
├── ERC20Pausable (OpenZeppelin)
├── ERC20Capped (OpenZeppelin)
├── Ownable (OpenZeppelin)
└── Custom: Time-locked transfers
└── Custom: Transfer tax mechanism

VMGToken (Production)
└── Same as V2 with production naming
```

## Key Technical Decisions

### 1. OpenZeppelin Contracts Library
- **Decision**: Use OpenZeppelin's audited contracts
- **Rationale**: Security best practices, battle-tested code
- **Impact**: Reduced security risks, faster development

### 2. Incremental Versioning
- **Decision**: Deploy separate contracts for each version (v0, v1, v2)
- **Rationale**: Immutability of blockchain requires new deployments
- **Impact**: Clear version history, demonstrates iterative development

### 3. Hardhat Development Framework
- **Decision**: Use Hardhat for development, testing, and deployment
- **Rationale**: Industry standard, excellent tooling
- **Impact**: Streamlined development workflow

### 4. Testnet-First Approach
- **Decision**: Deploy to Sepolia testnet before mainnet
- **Rationale**: Test without real money, verify functionality
- **Impact**: Reduced risk, lower costs during development

### 5. Progressive Feature Addition
- **Decision**: Add features incrementally across versions
- **Rationale**: Demonstrates learning progression
- **Impact**: Clear feature evolution, manageable complexity

## Design Patterns in Use

### 1. Inheritance Pattern
- Contracts inherit from OpenZeppelin base contracts
- Extends functionality without duplicating code
- Follows Solidity best practices

### 2. Access Control Pattern
- Ownable contract for owner-only functions
- Modifiers (`onlyOwner`) for access control
- Standard pattern for administrative functions

### 3. Event-Driven Architecture
- Transfer events for token movements
- Approval events for allowance changes
- Paused/Unpaused events for state changes
- Enables off-chain monitoring and indexing

### 4. State Machine Pattern
- Pausable contract uses state machine (paused/unpaused)
- Time-locked transfers use timestamp-based state
- Clear state transitions

## Component Relationships

### Contract Dependencies
```
VMGToken_v0
└── OpenZeppelin ERC20

VMGToken_v1
├── OpenZeppelin ERC20
├── OpenZeppelin ERC20Burnable (depends on ERC20)
├── OpenZeppelin ERC20Pausable (depends on ERC20)
└── OpenZeppelin Ownable

VMGToken_v2
├── All V1 dependencies
├── OpenZeppelin ERC20Capped (depends on ERC20)
└── Custom time-lock and tax logic
```

### Deployment Flow
```
Development → Local Testing → Testnet Deployment → Verification → Mainnet Deployment
```

### Testing Flow
```
Unit Tests → Local Network Tests → Testnet Manual Tests → Mainnet Verification
```

## Security Patterns

1. **Checks-Effects-Interactions**: Prevent reentrancy attacks
2. **Access Control**: Owner-only functions for sensitive operations
3. **Input Validation**: Validate addresses, amounts, and parameters
4. **Overflow Protection**: Solidity 0.8+ automatic overflow checks
5. **Pausable Mechanism**: Emergency stop for critical issues

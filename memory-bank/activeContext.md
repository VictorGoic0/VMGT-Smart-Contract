# Active Context: Current Work Focus

## Current Phase

**Project Status**: PR #1 and PR #2 complete; ready for PR #3
**Current Focus**: Deployment Script (VMGToken_v0 to Sepolia)

## Recent Changes

- PR #2 (Basic ERC-20 Contract) completed
- VMGToken_v0.sol created: inherits OpenZeppelin ERC20, mints 1M to deployer, name/symbol VMGToken_v0/VMGT0, decimals 18
- transfer, balanceOf, approve, transferFrom, allowance inherited from ERC20 (node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol)
- Contract compiles successfully (`npx hardhat compile`)
- Solidity syntax highlighting: Cursor/VS Code extension (e.g. “Solidity” by Juan Blanco or “Hardhat Solidity” by Nomic Foundation)

## Next Steps

### Immediate Actions (PR #3: Deployment Script)
- Create deploy script for VMGToken_v0
- Test locally, then deploy to Sepolia
- Verify contract on Etherscan

### Phase 3: Unit Tests (PR #4)
- Create VMGToken_v0 test file
- Cover transfer, balanceOf, approve, transferFrom, allowance, events, edge cases

## Active Decisions and Considerations

### Development Approach
- **Decided**: Alchemy as RPC provider (SEPOLIA_RPC_URL)
- **Decided**: Etherscan API key treated as required for verification
- **Decided**: Hardhat 3, ESM, TypeScript config, Mocha + ethers

### Contract Design
- **Decided**: OpenZeppelin contracts for security
- **Decided**: Incremental versioning (v0, v1, v2, production)
- **Decided**: 18 decimals (standard ERC-20)

### Testing Strategy
- **Decided**: Comprehensive unit tests for all functions
- **Decided**: Manual MetaMask testing for each version
- **Decided**: Testnet deployment before mainnet

## Current Blockers

- None

## Notes

- Sepolia faucet: Google Cloud faucet used (no mainnet balance required). Alchemy/Chainlink faucets require mainnet ETH/LINK.
- MetaMask “Add account” appears only after syncing finishes (in user’s version).
- Solidity syntax highlighting: install “Solidity” or “Hardhat Solidity” extension in Cursor/VS Code.

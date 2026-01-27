// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title VMGToken_v0
 * @author VMGT Project
 * @notice Day 0 MVP: Basic ERC-20 token with initial supply minted to deployer.
 * @dev Inherits OpenZeppelin ERC20. Standard functions (transfer, balanceOf, approve,
 *      transferFrom, allowance) are inherited and need no override.
 */
contract VMGToken_v0 is ERC20 {
    /// @notice Initial supply: 1,000,000 tokens (18 decimals).
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /**
     * @notice Deploys the token and mints INITIAL_SUPPLY to the deployer.
     * @dev ERC20 decimals are 18 (OpenZeppelin default). transfer(), balanceOf(),
     *      approve(), transferFrom(), and allowance() are inherited from ERC20.
     */
    constructor() ERC20("VMGToken_v0", "VMGT0") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}

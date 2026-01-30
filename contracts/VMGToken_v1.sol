// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VMGToken_v1
 * @author VMGT Project
 * @notice Day 1 MVP: ERC-20 token with burnable, mintable, and pausable functionality.
 * @dev Inherits ERC20, ERC20Burnable, ERC20Pausable, Ownable. Transfers are blocked when
 *      paused; mint and burn remain allowed when paused for operational flexibility.
 */
contract VMGToken_v1 is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    /// @notice Initial supply: 1,000,000 tokens (18 decimals).
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /**
     * @notice Deploys the token, mints INITIAL_SUPPLY to the deployer, and sets deployer as owner.
     * @dev burn() and burnFrom() from ERC20Burnable; pause()/unpause() exposed below with onlyOwner.
     */
    constructor() ERC20("VMGToken_v1", "VMGT1") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Mints tokens to an address. Restricted to owner.
     * @param to Recipient of the minted tokens.
     * @param amount Amount to mint (18 decimals).
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @notice Pauses token transfers. Restricted to owner. Mint and burn remain allowed.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses token transfers. Restricted to owner.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Override to block only transfers when paused; mint and burn remain allowed.
     */
    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Pausable) {
        if (from != address(0) && to != address(0)) {
            _requireNotPaused();
        }
        ERC20._update(from, to, value);
    }
}

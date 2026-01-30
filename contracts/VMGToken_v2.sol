// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VMGToken_v2
 * @author VMGT Project
 * @notice Day 2 MVP: ERC-20 token with burnable, mintable, pausable, and capped supply.
 * @dev Inherits ERC20, ERC20Burnable, ERC20Pausable, ERC20Capped, Ownable. Total supply
 *      cannot exceed the cap; minting reverts with ERC20ExceededCap if it would exceed.
 *      Transfers are blocked when paused; mint and burn remain allowed when paused.
 */
contract VMGToken_v2 is ERC20, ERC20Burnable, ERC20Pausable, ERC20Capped, Ownable {
    /// @notice Initial supply: 1,000,000 tokens (18 decimals).
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /// @notice Maximum total supply cap: 10,000,000 tokens (18 decimals).
    uint256 public constant SUPPLY_CAP = 10_000_000 * 10 ** 18;

    /**
     * @notice Deploys the token with a supply cap, mints INITIAL_SUPPLY to the deployer, and sets deployer as owner.
     * @dev Cap is enforced by ERC20Capped; mint respects cap. burn() and burnFrom() from ERC20Burnable;
     *      pause()/unpause() exposed with onlyOwner.
     */
    constructor() ERC20("VMGToken_v2", "VMGT2") ERC20Capped(SUPPLY_CAP) Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @notice Mints tokens to an address. Restricted to owner. Reverts if mint would exceed supply cap.
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
     * @notice Returns how many more tokens can be minted without exceeding the cap.
     * @return Remaining mintable amount (cap - totalSupply).
     */
    function remainingMintable() public view returns (uint256) {
        return cap() - totalSupply();
    }

    /**
     * @dev Override to enforce: (1) only transfers are blocked when paused; (2) cap is enforced on mint via ERC20Capped.
     */
    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Pausable, ERC20Capped) {
        if (from != address(0) && to != address(0)) {
            _requireNotPaused();
        }
        super._update(from, to, value);
    }
}

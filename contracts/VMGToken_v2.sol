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
 * @notice Day 2 MVP: ERC-20 token with burnable, mintable, pausable, capped supply, time-locked transfers, and transfer tax.
 * @dev Inherits ERC20, ERC20Burnable, ERC20Pausable, ERC20Capped, Ownable. Total supply cannot exceed the cap.
 *      Transfers are blocked when paused; mint and burn remain allowed when paused. Owner can lock a portion
 *      of an account's balance until a timestamp; only unlocked (spendable) balance can be transferred.
 *      Optional transfer tax: when enabled, a percentage of each transfer goes to the tax recipient (max 5%).
 */
contract VMGToken_v2 is ERC20, ERC20Burnable, ERC20Pausable, ERC20Capped, Ownable {
    /// @notice Initial supply: 1,000,000 tokens (18 decimals).
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    /// @notice Maximum total supply cap: 10,000,000 tokens (18 decimals).
    uint256 public constant SUPPLY_CAP = 10_000_000 * 10 ** 18;

    /// @notice Maximum tax rate in basis points (500 = 5%).
    uint256 public constant MAX_TAX_BPS = 500;

    /// @notice Locked balance per address (amount that cannot be transferred until unlock time).
    mapping(address => uint256) private _lockedBalance;

    /// @notice Unlock timestamp per address; after this time, locked balance becomes spendable.
    mapping(address => uint256) private _unlockTime;

    /// @notice Tax rate in basis points (e.g. 100 = 1%). Max MAX_TAX_BPS (5%).
    uint256 private _taxRateBps;

    /// @notice Address that receives the transfer tax.
    address private _taxRecipient;

    /// @notice When true, transfers (excluding to tax recipient) are taxed.
    bool private _taxEnabled;

    /// @notice Emitted when owner locks tokens for an account until a timestamp.
    event TokensLocked(address indexed account, uint256 amount, uint256 unlockTime);

    /// @notice Emitted when locked tokens are cleared (after unlock or via unlockTokens).
    event TokensUnlocked(address indexed account, uint256 amount);

    /// @notice Emitted when tax is collected on a transfer (amount sent to tax recipient).
    event TaxCollected(address indexed recipient, uint256 amount);

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

    // ---------- Time-lock ----------

    /**
     * @notice Locks a portion of an account's balance until a timestamp. Restricted to owner.
     * @param account Address whose tokens are locked.
     * @param amount Amount to lock (18 decimals); account must have at least this balance.
     * @param unlockAt Unix timestamp after which the locked amount becomes spendable.
     * @dev Overwrites any existing lock for this account. Reverts if balance < amount or unlockAt is not in the future.
     */
    function lockTokens(address account, uint256 amount, uint256 unlockAt) public onlyOwner {
        require(balanceOf(account) >= amount, "VMGToken: lock amount exceeds balance");
        require(unlockAt > block.timestamp, "VMGToken: unlock time must be in the future");
        _lockedBalance[account] = amount;
        _unlockTime[account] = unlockAt;
        emit TokensLocked(account, amount, unlockAt);
    }

    /**
     * @notice Returns the amount currently locked for an account (0 after unlock time has passed).
     * @param account Address to query.
     * @return Amount that cannot be transferred (0 if block.timestamp >= unlock time).
     */
    function getLockedBalance(address account) public view returns (uint256) {
        return _effectiveLockedBalance(account);
    }

    /**
     * @notice Returns the unlock timestamp for an account's locked balance.
     * @param account Address to query.
     * @return Unix timestamp after which locked tokens become spendable; 0 if no lock.
     */
    function getUnlockTime(address account) public view returns (uint256) {
        return _unlockTime[account];
    }

    /**
     * @notice Clears the lock for an account once unlock time has passed. Callable by anyone.
     * @param account Address whose lock to clear.
     * @dev No-op if not yet unlocked or already cleared. Emits TokensUnlocked.
     */
    function unlockTokens(address account) public {
        uint256 locked = _lockedBalance[account];
        if (locked == 0) return;
        if (block.timestamp < _unlockTime[account]) return;
        _lockedBalance[account] = 0;
        _unlockTime[account] = 0;
        emit TokensUnlocked(account, locked);
    }

    /**
     * @notice Returns true if the account has no effective lock (no locked balance or unlock time has passed).
     * @param account Address to check.
     */
    function isUnlocked(address account) public view returns (bool) {
        return _effectiveLockedBalance(account) == 0;
    }

    /**
     * @dev Returns the amount currently locked for an account (0 after unlock time).
     */
    function _effectiveLockedBalance(address account) internal view returns (uint256) {
        if (block.timestamp >= _unlockTime[account]) return 0;
        return _lockedBalance[account];
    }

    // ---------- Transfer tax ----------

    /**
     * @notice Sets the transfer tax rate. Restricted to owner. Max 5% (500 basis points).
     * @param rateBps Tax rate in basis points (e.g. 100 = 1%, 500 = 5%).
     */
    function setTaxRate(uint256 rateBps) public onlyOwner {
        require(rateBps <= MAX_TAX_BPS, "VMGToken: tax rate max 5%");
        _taxRateBps = rateBps;
    }

    /**
     * @notice Sets the address that receives transfer tax. Restricted to owner.
     * @param recipient Address to receive tax; cannot be zero.
     */
    function setTaxRecipient(address recipient) public onlyOwner {
        require(recipient != address(0), "VMGToken: tax recipient zero");
        _taxRecipient = recipient;
    }

    /**
     * @notice Enables or disables transfer tax. Restricted to owner. Tax applies only when enabled.
     */
    function setTaxEnabled(bool enabled) public onlyOwner {
        _taxEnabled = enabled;
    }

    /**
     * @notice Returns the current tax rate in basis points.
     */
    function taxRate() public view returns (uint256) {
        return _taxRateBps;
    }

    /**
     * @notice Returns the address that receives transfer tax.
     */
    function taxRecipient() public view returns (address) {
        return _taxRecipient;
    }

    /**
     * @notice Returns true if transfer tax is enabled.
     */
    function taxEnabled() public view returns (bool) {
        return _taxEnabled;
    }

    /**
     * @dev Override to enforce: (1) only transfers blocked when paused (mint/burn bypass Pausable);
     *      (2) cap on mint; (3) transfers cannot move locked tokens; (4) when tax enabled, deduct tax.
     *      Mint and burn call ERC20._update directly so they are not blocked by Pausable.
     */
    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Pausable, ERC20Capped) {
        if (from == address(0)) {
            ERC20._update(from, to, value);
            if (totalSupply() > cap()) revert ERC20ExceededCap(totalSupply(), cap());
            return;
        }
        if (to == address(0)) {
            ERC20._update(from, to, value);
            return;
        }
        _requireNotPaused();
        uint256 locked = _effectiveLockedBalance(from);
        if (locked > 0) {
            uint256 bal = balanceOf(from);
            uint256 spendable = locked >= bal ? 0 : bal - locked;
            require(value <= spendable, "VMGToken: transfer exceeds spendable (locked)");
        }
        if (_taxEnabled && _taxRateBps > 0 && _taxRecipient != address(0) && to != _taxRecipient) {
            uint256 taxAmount = (value * _taxRateBps) / 10_000;
            uint256 netAmount = value - taxAmount;
            super._update(from, to, netAmount);
            super._update(from, _taxRecipient, taxAmount);
            emit TaxCollected(_taxRecipient, taxAmount);
            return;
        }
        super._update(from, to, value);
    }
}

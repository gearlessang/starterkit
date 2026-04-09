// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title MyToken
 * @notice ERC-20 token with burn, pause, and permit (gasless approvals) support.
 * @dev Inherits OpenZeppelin battle-tested implementations.
 */
contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18; // 1 billion tokens

    event Minted(address indexed to, uint256 amount);

    constructor(
        address initialOwner
    )
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
        ERC20Permit("MyToken")
    {}

    /// @notice Mint new tokens. Only callable by owner.
    /// @param to Recipient address
    /// @param amount Amount of tokens to mint (in wei)
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "MyToken: max supply exceeded");
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /// @notice Pause all token transfers. Only callable by owner.
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause all token transfers. Only callable by owner.
    function unpause() public onlyOwner {
        _unpause();
    }

    // Required override: ERC20 + ERC20Pausable
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}

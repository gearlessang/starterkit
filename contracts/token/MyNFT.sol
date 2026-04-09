// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MyNFT
 * @notice ERC-721 NFT collection with enumerable support and on-chain metadata URI.
 * @dev Includes a public mint with price enforcement and reentrancy protection.
 */
contract MyNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 10_000;
    uint256 public mintPrice = 0.05 ether;
    uint256 private _nextTokenId;

    bool public publicMintOpen = false;

    event NFTMinted(address indexed minter, uint256 indexed tokenId, string uri);
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);
    event Withdrawn(address indexed to, uint256 amount);

    constructor(address initialOwner)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner)
    {}

    // ─── External / Public ────────────────────────────────────────────────

    /// @notice Mint one NFT. Requires exact payment of `mintPrice`.
    /// @param uri IPFS or HTTP metadata URI for this token
    function mint(string calldata uri) external payable nonReentrant {
        require(publicMintOpen, "MyNFT: minting is not open");
        require(msg.value == mintPrice, "MyNFT: incorrect ETH value");
        require(_nextTokenId < MAX_SUPPLY, "MyNFT: max supply reached");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(msg.sender, tokenId, uri);
    }

    /// @notice Owner-only free mint (airdrops, team allocation, etc.)
    function ownerMint(address to, string calldata uri) external onlyOwner {
        require(_nextTokenId < MAX_SUPPLY, "MyNFT: max supply reached");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTMinted(to, tokenId, uri);
    }

    // ─── Admin ────────────────────────────────────────────────────────────

    function setPublicMintOpen(bool _open) external onlyOwner {
        publicMintOpen = _open;
    }

    function setMintPrice(uint256 _newPrice) external onlyOwner {
        emit MintPriceUpdated(mintPrice, _newPrice);
        mintPrice = _newPrice;
    }

    /// @notice Withdraw all ETH from the contract to `to`.
    function withdraw(address payable to) external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "MyNFT: nothing to withdraw");
        (bool success, ) = to.call{value: balance}("");
        require(success, "MyNFT: withdrawal failed");
        emit Withdrawn(to, balance);
    }

    // ─── View ─────────────────────────────────────────────────────────────

    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }

    // ─── Required Overrides ───────────────────────────────────────────────

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal override(ERC721, ERC721Enumerable) returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }
}

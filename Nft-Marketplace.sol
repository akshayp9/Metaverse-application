// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIdCounter;
    uint256[] private _mintedTokenIds;
    uint256[] private _tokensForSale;
    uint256[] private _soldTokenIds;

    event Mint(address indexed from, uint256 indexed TokenId);

    mapping(uint256 => uint256) public _tokenPrices;

    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _mintedTokenIds.push(tokenId);
        emit Mint(to, tokenId);
        return tokenId;
    }

    function setNFTSetForSell(uint256 _tokenId, uint256 _price) external {
        require(_exists(_tokenId), "Invalid token ID");
        require(ownerOf(_tokenId) == msg.sender, "Invalid Token Owner");
        _setTokenPrice(_tokenId, _price);
        _tokensForSale.push(_tokenId);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) external {
        require(_exists(_tokenId), "Invalid token ID");
        require(ownerOf(_tokenId) == msg.sender, "Invalid Token Owner");
        _setTokenPrice(_tokenId, _price);
    }

    function buyNFTSet(uint256 _tokenId) external payable {
        require(_exists(_tokenId), "Invalid token ID");
        require(_tokenPrices[_tokenId] > 0, "NFT set is not for sale");
        require(msg.value >= _tokenPrices[_tokenId], "Insufficient funds");

        address payable tokenOwner = payable(ownerOf(_tokenId));
        tokenOwner.transfer(msg.value);
        _transfer(tokenOwner, msg.sender, _tokenId);
        _setTokenPrice(_tokenId, 0);
        _soldTokenIds.push(_tokenId);
        for (uint256 i = 0; i < _tokensForSale.length; i++) {
            if (_tokensForSale[i] == _tokenId) {
                _tokensForSale[i] = _tokensForSale[_tokensForSale.length - 1];
                _tokensForSale.pop();
                break;
            }
        }
    }

    function removeFromSell(uint256 _tokenId) external {
        require(_exists(_tokenId), "Invalid token ID");
        require(ownerOf(_tokenId) == msg.sender, "Invalid Token Owner");
        _setTokenPrice(_tokenId, 0);
        for (uint256 i = 0; i < _tokensForSale.length; i++) {
            if (_tokensForSale[i] == _tokenId) {
                _tokensForSale[i] = _tokensForSale[_tokensForSale.length - 1];
                _tokensForSale.pop();
                break;
            }
        }
    }

    function getMintedTokenIds() public view returns (uint256[] memory) {
        return _mintedTokenIds;
    }

    function getTokensForSale() public view returns (uint256[] memory) {
        return _tokensForSale;
    }

    function getSoldToken() public view returns (uint256[] memory) {
        return _soldTokenIds;
    }

    function _setTokenPrice(uint256 _tokenId, uint256 _price) internal {
        _tokenPrices[_tokenId] = _price;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

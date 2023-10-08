// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ArtNFT is ERC721 {
    // uint256 private _nextTokenId;

    constructor(address initialOwner) ERC721("Art NFT", "ART") {}

    function safeMint(address to, uint256 tokenId) public {
        // uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}

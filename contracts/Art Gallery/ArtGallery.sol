// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.20;

import "./IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtGallery is Ownable {
    // proposal - name, description, url, price;
    // mapping id-->proposal
    uint256 count;
    struct Proposal {
        string name;
        string description;
        string url;
        uint256 price;
        bool approved;
        address owner;
    }

    mapping(uint256 => Proposal) proposalIdToProposal;

    IERC721 artNFT;

    mapping(address => uint256[]) addressToNFTs;

    constructor(
        address artNFTAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        artNFT = IERC721(artNFTAddress);
    }

    function createProposal(
        string calldata _name,
        string calldata _description,
        string calldata _url,
        uint256 _price
    ) external {
        Proposal memory newProposal;
        newProposal = Proposal(
            _name,
            _description,
            _url,
            _price,
            false,
            msg.sender
        );
        proposalIdToProposal[count] = newProposal;
        count++;
    }

    function approveProposal(
        uint256 proposalId,
        address proposalOwner
    ) external onlyOwner {
        artNFT.safeMint(proposalOwner, proposalId);
        proposalIdToProposal[proposalId].approved = true;
    }

    //mintNFT
    //buy

    function buyART(uint256 nftID) external payable {
        require(
            proposalIdToProposal[nftID].price == msg.value,
            "You have to provide exact price to purchase"
        );
        artNFT.safeTransferFrom(
            proposalIdToProposal[nftID].owner,
            msg.sender,
            nftID
        );
        proposalIdToProposal[nftID].owner = msg.sender;
    }
}

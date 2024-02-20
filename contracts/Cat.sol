// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract Cindelsa is ERC721A{
    address public owner;
    string baseUrl;
    uint256 public maxAmount = 5;
    string public prompt_msg ="a cat driving a car with sunglasses on vibing";

    constructor() ERC721A("cat", "CT") {
        owner = msg.sender;
        baseUrl = "https://gateway.pinata.cloud/ipfs/QmcmFrSTLRBkNwUWANfSj8B2uDiK24Zy2DZsXYgdVgHWN3";
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function mint(uint256 mint_amount) external payable onlyOwner{
        if(totalSupply() + mint_amount > maxAmount){
         revert ("Allowed to mint:5 only");
        } 
        _mint(msg.sender, mint_amount);
    }


    function _baseURI() internal view override returns (string memory){
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt_msg;
    }
}

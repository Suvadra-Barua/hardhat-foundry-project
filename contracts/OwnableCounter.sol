//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableCounter is Ownable {
    // State variable to store the number
    uint256 private number;

    // Constructor to initialize the number to 0
    constructor() {
        number = 1;
    }

    // Function to increment the number
    function increment() public onlyOwner {
        number += 1;
    }

    // Function to decrement the number
    function decrement() public {
        require(number > 0, "Number cannot be less than zero");
        number -= 1;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}

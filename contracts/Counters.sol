// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract NumberCounter {
    // State variable to store the number
    uint256 public number;

    // Constructor to initialize the number to 0
    constructor() {
        number = 0;
    }

    // Function to increment the number
    function increment() public {
        number += 1;
    }

    // Function to decrement the number
    function decrement() public {
        require(number > 0, "Number cannot be less than zero");
        number -= 1;
    }
}

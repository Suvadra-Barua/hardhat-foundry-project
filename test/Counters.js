const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NumberCounter", function () {
  let NumberCounter;
//   let numberCounter;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();

    // Deploy the NumberCounter contract
    const NumberCounterFactory = await ethers.getContractFactory("NumberCounter");
    NumberCounter = await NumberCounterFactory.deploy();
    
    // Get the contract's ABI and address for interaction
    // NumberCounter = new ethers.Contract(numberCounter.address, NumberCounterFactory.interface, owner);
  });

  it("should initialize the number to 0", async function () {
    const initialNumber = await NumberCounter.number();
    expect(initialNumber).to.equal(0);
  });

  it("should increment the number", async function () {
    await NumberCounter.increment();
    const newNumber = await NumberCounter.number();
    expect(newNumber).to.equal(1);
  });

  it("should decrement the number", async function () {
    await NumberCounter.decrement();
    const newNumber = await NumberCounter.number();
    expect(newNumber).to.equal(0);
  });

  it("should not allow decrementing below 0", async function () {
    try {
      await NumberCounter.decrement();
    } catch (error) {
      expect(error.message).to.include("Number cannot be less than zero");
    }
  });
});

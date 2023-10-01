const {expect} = require("chai");

describe ("Ownable Counter Contract Test", function(){
    let OwnableCounter,ownableCounter;
    let owner, otherAccount;
    
    before(async function(){
        [owner,otherAccount]=await ethers.getSigners();
        // console.log(owner);
        OwnableCounter=await ethers.getContractFactory("OwnableCounter");
        OwnableCounter=await OwnableCounter.connect(owner);
        ownableCounter=await OwnableCounter.deploy();
        console.log("Deployment finished");
    });

    it("Deployment Check", async function(){
        expect(await ownableCounter.getNumber()).to.equal(1);
        expect(await ownableCounter.owner()).to.equal(owner.address);
    });

    describe("Only Owner should call the increment function",function(){
        it("Only owner can call", async function(){
            const incrementTx=await ownableCounter.connect(owner).increment();
            await incrementTx.wait();
            expect(await ownableCounter.getNumber()).to.equal(2);
        })

        it("Other account can not call", async function(){
            await expect(ownableCounter.connect(otherAccount).increment()).to.be.revertedWith("Ownable: caller is not the owner");
        })
    })

    describe("Decrement Function Check",function(){
        it("Anyone can call", async function (){
            const decrementTx1=await ownableCounter.connect(owner).decrement();
            await decrementTx1.wait();
            expect(await ownableCounter.getNumber()).to.equal(1);

            const decrementTx2=await ownableCounter.connect(otherAccount).decrement();
            await decrementTx2.wait();
            expect(await ownableCounter.getNumber()).to.equal(0);
        })

        it("The number should not be less than Zero", async function(){
            await expect(ownableCounter.decrement()).to.be.revertedWith("Number cannot be less than zero");
        })
    })
})
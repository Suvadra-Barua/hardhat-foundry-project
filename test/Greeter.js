//import expect 
const {expect}=require("chai");


// describe("Greeter", function(){
//     describe("Deployment Check",function(){
//         it("Should Deploy",async function(){
//             //code
//         })

//     });
//     describe("Set Greeting check",function(){
//         it("Should return the new greeting once it's changed", async function () {
            
//           });
//     });
// });

describe("Greeter", function(){
    const greetingMessage="Testing Intro";
    let Greeter ;
    let greeter ;

    describe("Greeter",function(){
        before(async function(){
            Greeter =  await ethers.getContractFactory("Greeter");
            console.log(Greeter);
            greeter= await Greeter.deploy(greetingMessage);
        });

        it("Deployment Check", async function(){
            expect(await greeter.greet()).to.equal(greetingMessage);
        })

        it("Should set new message", async function(){
            const newMessage="Hello all Ostad Blockchain Dev";
            const setTx= await greeter.setGreeting(newMessage);
            await setTx.wait();
            // const message="other message";
            expect(await greeter.greet()).to.equal(newMessage);
        })
    })
    //deploy
    //Deployment Check
    //should set new message

});



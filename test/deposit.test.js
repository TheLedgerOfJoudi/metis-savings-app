
// const { expect } = require('chai');
// const fs = require('fs');
// const { ethers } = require('hardhat'); 


// async function mint(tokenAddress, to, amount) {
//     const [signer] = await ethers.getSigners();
//     let file = fs.readFileSync('./artifacts/contracts/Savus.sol/Savus.json');
//     let abi = JSON.parse(file);
//     abi = abi.abi;
//     const savus = new ethers.Contract(
//         tokenAddress,
//         abi,
//         signer);
//     await savus.mint(to, ethers.utils.parseEther(amount.toString()));
//     console.log("minted!")
// }

// const savusAddress = "0xd76FB414c2EFFa74FFCDFC73D8d07927763EaA18";

// const sleep = (milliseconds) => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// describe("Testing the Savings Contract", function () {
//     this.timeout(60000);
//     let Savings;
//     let savings;
//     it("should deposit", async () => {

//         let signers = await ethers.getSigners();
//         Savings = await ethers.getContractFactory("Savings");
//         savings = await Savings.deploy();

//         await mint(savusAddress, savings.address, 10);

//         console.log("Your contract is deployed! Here is its address " + savings.address)
        
//         const overrides = {
//             value: ethers.utils.parseEther("0.0001"),
//             from: signers[1].address
//         }
//         let curTimestamp = Date.now() / 1000;
//         await savings.connect(signers[1]).deposit(10 ** 13, 9999999, overrides);

//         await sleep(15000);

//         let savusBalance = await savings.getSavusBalances(signers[1].address);
//         expect(savusBalance).to.equal(true);
        
//         let etherBalance = await savings.getEtherBalances(signers[1].address);
//         expect(etherBalance).to.equal(ethers.utils.parseEther("0.0001"));

//         let goalAmount = await savings.getGoalAmounts(signers[1].address);
//         expect(goalAmount).to.equal(ethers.utils.parseEther("0.00001"));

//         let expiration = await savings.getExpirations(signers[1].address);
//         expect(Math.abs(expiration - (curTimestamp + 9999999))).to.be.lessThan(30);
//     })
// })



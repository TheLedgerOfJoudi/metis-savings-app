
const { expect } = require('chai');
const fs = require('fs');
const { ethers } = require('hardhat'); 


async function mint(tokenAddress, to, amount) {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('./artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = new ethers.Contract(
        tokenAddress,
        abi,
        signer);
    await savus.mint(to, ethers.utils.parseEther(amount.toString()));
    console.log("minted!")
}

const savusAddress = "0xd76FB414c2EFFa74FFCDFC73D8d07927763EaA18";

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

describe("Testing the Savings Contract", function () {
    this.timeout(60000);
    let Savings;
    let savings;
    
    it("should withdraw", async () => {
        const [signer] = await ethers.getSigners();
        let file = fs.readFileSync('./artifacts/contracts/Savus.sol/Savus.json');
        let abi = JSON.parse(file);
        abi = abi.abi;
        const savus = new ethers.Contract(
            savusAddress,
            abi,
            signer);


        let signers = await ethers.getSigners();
        // let burnAmount = await savus.balanceOf(signers[1].address);
        
        // await savus.burn(signers[1].address, burnAmount);
        
        Savings = await ethers.getContractFactory("Savings");
        savings = await Savings.deploy();

        await mint(savusAddress, savings.address, 10);

        console.log("Your contract is deployed! Here is its address " + savings.address)
        
        const overrides = {
            value: ethers.utils.parseEther("0.0001"),
            from: signers[1].address
        }
        await savings.connect(signers[1]).deposit(10 ** 13, 0, overrides);

        await sleep(16000);
        await savings.connect(signers[1]).withdrawAll();
        
        await sleep(16000);
        
        let savusBalance = await savus.balanceOf(signers[1].address);
        expect(savusBalance).to.equal(0);
        

    })
})

const { ethers } = require('hardhat');
const fs = require('fs');

async function checkContractAddress(tokenAddress, contractAddress) {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = new ethers.Contract(
        tokenAddress,
        abi,
        signer);
    const _contractAddress = await savus.contractAddress();
    if (_contractAddress === contractAddress){
        console.log("The addresses match!")
    }
    else{
        console.log("The addresses don't match!")
    }
}

const savusAddress = "0x4b250cC1f31F17b63665448EaFfeFEa29B224C38"
const savingsAddress = "0x5aB72692108DEac7429beE95029Ef3582fB9A4CB";

checkContractAddress(savusAddress, savingsAddress)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
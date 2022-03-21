const { ethers } = require('hardhat');
const fs = require('fs');

async function mint(tokenAddress, to, amount) {
    const [signer] = await ethers.getSigners();
    let file = fs.readFileSync('../artifacts/contracts/Savus.sol/Savus.json');
    let abi = JSON.parse(file);
    abi = abi.abi;
    const savus = new ethers.Contract(
        tokenAddress,
        abi,
        signer);
    await savus.mint(to, ethers.utils.parseEther(amount.toString()));
    console.log("minted!")
}

const savusAddress = "0x4b250cC1f31F17b63665448EaFfeFEa29B224C38"
const savingsAddress = "0x5aB72692108DEac7429beE95029Ef3582fB9A4CB";

const amount = 10000;

mint(savusAddress, savingsAddress, amount)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

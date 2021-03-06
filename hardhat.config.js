/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 
require('@nomiclabs/hardhat-waffle')

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
}); 

module.exports = {
solidity: {
  version: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
},
networks: {
  rinkeby: {
    url: "https://stardust.metis.io/?owner=588",
    accounts: [
    ""
    ]
  },
}
};

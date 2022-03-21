async function main() {
    // We get the contract to deploy
    const Savings = await ethers.getContractFactory("Savings");
    const savings = await Savings.deploy();
  
    console.log("Savings deployed to:", savings.address);
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

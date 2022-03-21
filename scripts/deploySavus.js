async function main() {
    // We get the contract to deploy
    const Savus = await ethers.getContractFactory("Savus");
    const savus = await Savus.deploy();
  
    console.log("Savus deployed to:", savus.address);
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

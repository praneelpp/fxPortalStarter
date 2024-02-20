const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Cat.sol/Cat.json");

const tokenAddress = "0x0F642AeE9efeF570CF320730E6227d1BA97858E7";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xD371B6449d55B3A83Ea5DD3d38bF0Bce8c4b60D7"; 

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    console.log("Your Cat Token Balance in mumbai testnet: " + await token.balanceOf(walletAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

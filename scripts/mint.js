const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const networkAddress = "https://ethereum-goerli.publicnode.com";

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);

  const contractAddress = "0x3951cB7D5Ad052D1c773f4d1e7320A10EACfbC02";

  const Cat_contract = await ethers.getContractFactory("Cat", signer);
  const cat = await Cat_contract.attach(contractAddress);

  await cat.mint(5);
  console.log("Number of NFTs minted:5");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

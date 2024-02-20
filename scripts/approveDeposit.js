const { ethers } = require("hardhat");
const { FXRootContractAbi } = require('../artifacts/FXRootContractAbi.js');
const ABI = require('../artifacts/contracts/Cat.sol/Cat.json');
require('dotenv').config();

async function main() {
 
  const networkAddress = 'https://ethereum-goerli.publicnode.com';
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const wallet = new ethers.Wallet(privateKey, provider);

  const [signer] = await ethers.getSigners();

  const Cat_contract = await ethers.getContractFactory("Cat");
  const cat = await Cat_contract.attach('0x3951cB7D5Ad052D1c773f4d1e7320A10EACfbC02');

  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const approveTx = await cat.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log('Approval for transfer:success');


  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRoot.connect(signer).deposit(
      cat.address,
      wallet.address, 
      i,
      '0x6566'
    );

    await depositTx.wait();
  }

  console.log("Deposited=true");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

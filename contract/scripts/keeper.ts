import { BigNumber, utils } from "ethers";
import hre, { ethers } from "hardhat";

import { abi } from "../artifacts/@chainlink/contracts/src/v0.4/LinkToken.sol/LinkToken.json";
import type { LinkToken } from "../types/@chainlink/contracts/src/v0.4/";
import type { KeeperRegistrar } from "../types/@chainlink/contracts/src/v0.8/KeeperRegistrar";
import type { CronUpkeepFactory } from "../types/@chainlink/contracts/src/v0.8/factories/CronUpkeepFactory";
import type { CronUpkeepFactory__factory } from "../types/factories/@chainlink/contracts/src/v0.8/factories/CronUpkeepFactory__factory";

async function main() {
  // let accounts = await ethers.getSigners();
  // let userAddress = accounts[0].address;

  // console.log("userAddress",userAddress);

  // const cronUpkeepFactory:CronUpkeepFactory = await ethers.getContractAt("CronUpkeepFactory", "0x1af3cE8de065774B0EC08942FC5779930d1A9622")
  //  const handler1Sig = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("set()")).toLowerCase();
  //   const encodeCronJobString = await cronUpkeepFactory.encodeCronJob(
  //     "0x31fa5783a589512F2F75Dfd5166f65E65a04A2aA",
  //     handler1Sig,
  //     '*/3 * * * *'
  //   )
  //   // console.log("encodeCronJobString",encodeCronJobString);

  //  const tx =  await cronUpkeepFactory.newCronUpkeepWithJob(encodeCronJobString)
  //  const res = await tx.wait(1);

  //  console.log(res);

  // 0xa277D00b381092aBb9796A4696CffC281182A4bA

  const amount = BigNumber.from("5000000000000000000");
  const source = BigNumber.from(97);
  const executeGas = BigNumber.from(500000);
  const emptyBytes = "0x00";
  const upkeep = "0x39956dA38c6A6015FdFcF1F6731EfaF1d9cb663C";
  const keeperRegistrar: KeeperRegistrar = await ethers.getContractAt(
    "KeeperRegistrar",
    "0x9806cf6fbc89abf286e8140c42174b94836e36f2",
  );
  const abiEncodedBytes = keeperRegistrar.interface.encodeFunctionData("register", [
    "qknow",
    emptyBytes,
    upkeep,
    executeGas,
    "0xE37917d6D650Edf014893e7cF8F7dC0D68D45E5e",
    emptyBytes,
    amount,
    source,
    "0xE37917d6D650Edf014893e7cF8F7dC0D68D45E5e",
  ]);

  console.log("abiEncodedBytes", abiEncodedBytes);

  const linkToken: LinkToken = await ethers.getContractAt("LinkToken", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB");
  const tx1 = await linkToken.transferAndCall(
    "0x9806cf6fbc89abf286e8140c42174b94836e36f2",
    amount,
    "0x3659D6660000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000080433E0F191DBD60165B69FE8034422329BB82DA000000000000000000000000000000000000000000000000000000000007A120000000000000000000000000E37917D6D650EDF014893E7CF8F7DC0D68D45E5E00000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000004563918244F400000000000000000000000000000000000000000000000000000000000000000061000000000000000000000000E37917D6D650EDF014893E7CF8F7DC0D68D45E5E0000000000000000000000000000000000000000000000000000000000000003717171000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  );
  await tx1.wait();

  // console.log("hre.network.provider","https://goerli.infura.io/v3/da974dd900ba4139afcb769c3f1bf167");

  // let provider = new ethers.providers.Web3Provider("https://goerli.infura.io/v3/da974dd900ba4139afcb769c3f1bf167");
  // let contract = new ethers.Contract("0x326C977E6efc84E512bB9C30f76E30c160eD06FB", abi, provider);

  // await contract.connect(accounts).transferAndCall("0x9806cf6fbc89abf286e8140c42174b94836e36f2",amount,"0x3659D66600000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000EE3A7F223C08B161C130A8D94723309468FC6F6A000000000000000000000000000000000000000000000000000000000007A120000000000000000000000000D3420A3BE0A1EFC0FBD13E87141C97B2C9AC9DD300000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000004563918244F400000000000000000000000000000000000000000000000000000000000000000061000000000000000000000000D3420A3BE0A1EFC0FBD13E87141C97B2C9AC9DD3000000000000000000000000000000000000000000000000000000000000000568656C6C6F00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

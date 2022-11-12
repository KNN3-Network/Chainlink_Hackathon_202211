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

  const cronUpkeepFactory: CronUpkeepFactory = await ethers.getContractAt(
    "CronUpkeepFactory",
    "0x1af3cE8de065774B0EC08942FC5779930d1A9622",
  );
  // const handler1Sig = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("set()")).toLowerCase();
  const handlerSig =
    "0x8ac7fae5000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000033939390000000000000000000000000000000000000000000000";
  const encodeCronJobString = await cronUpkeepFactory.encodeCronJob(
    "0xa050af330bA4373e4818913ffd4789D8A07F63A1",
    handlerSig,
    "*/3 * * * *",
  );
  //   // console.log("encodeCronJobString",encodeCronJobString);

  const tx = await cronUpkeepFactory.newCronUpkeepWithJob(encodeCronJobString);
  console.log(tx);
  const res = await tx.wait(1);
  console.log("res", res);

  // cronUpkeepFactory.parseLog()

  const event = res.events?.map((item) => {
    console.log("item", item.event);
    console.log(item.decode);
    if (item.event == "NewCronUpkeepCreated") {
      console.log(111);

      console.log("0x" + item.data.slice(0, 66).slice(-40));
    }
  });

  console.log("event", event);

  // console.log("res", log?.decode);

  // 0xa277D00b381092aBb9796A4696CffC281182A4bA
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

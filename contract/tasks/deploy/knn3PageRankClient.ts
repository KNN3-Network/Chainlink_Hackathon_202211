import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";

import { eEthereumNetwork, ePolygonNetwork } from "../../helpers/types";

task("deploy:KNN3ProfileClient").setAction(async function (_taskArgs, { ethers, network }) {
  const link = () => {
    switch (network.name) {
      case eEthereumNetwork.hardhat:
        return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
      case eEthereumNetwork.goerli:
        return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
      case ePolygonNetwork.matic:
        return "0xb0897686c545045aFc77CF20eC7A532E3120E0F1";
      default:
        break;
    }
  };

  const signers: SignerWithAddress[] = await ethers.getSigners();
  const KNN3ProfileClient = await ethers.getContractFactory("KNN3ProfileClient");
  const knn3ProfileClient = await KNN3ProfileClient.connect(signers[0]).deploy(link());
  await knn3ProfileClient.deployed();
  console.log("knn3ProfileClient deployed to: ", knn3ProfileClient.address);
});

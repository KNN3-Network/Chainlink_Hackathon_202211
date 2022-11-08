import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import hre, { ethers } from "hardhat";

import { eEthereumNetwork, ePolygonNetwork } from "../../helpers/types";

export async function deployKNN3PageRankClientFixture(): Promise<{ knn3ProfileClient: any }> {
  const link = () => {
    switch (hre.network.name) {
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
  return { knn3ProfileClient };
}

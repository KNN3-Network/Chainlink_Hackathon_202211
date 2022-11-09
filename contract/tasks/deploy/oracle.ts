import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";

import { eEthereumNetwork, ePolygonNetwork } from "../../helpers/types";

task("deploy:Oracle").setAction(async function (_taskArgs, { ethers, network }) {
  const link = () => {
    switch (network.name) {
      case eEthereumNetwork.hardhat:
        return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
      case eEthereumNetwork.goerli:
        return "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
      case ePolygonNetwork.polygon:
        return "0xb0897686c545045aFc77CF20eC7A532E3120E0F1";
      default:
        break;
    }
  };

  const signers: SignerWithAddress[] = await ethers.getSigners();

  const owner = "0xD3420A3be0a1EFc0FBD13e87141c97B2C9AC9dD3";
  const Oracle = await ethers.getContractFactory("Operator");
  const oracle = await Oracle.connect(signers[0]).deploy(link(), owner);
  await oracle.deployed();
  console.log("oracle deployed to: ", oracle.address);
});

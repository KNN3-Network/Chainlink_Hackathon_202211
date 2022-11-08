import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeRequestPageRankInfo } from "./KNN3PageRankClient.behavior";
import { deployKNN3PageRankClientFixture } from "./KNN3PageRankClient.fixture";

describe("KNN3PageRankClient Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("Greeter", function () {
    beforeEach(async function () {
      const { knn3ProfileClient } = await this.loadFixture(deployKNN3PageRankClientFixture);
    });

    shouldBehaveLikeRequestPageRankInfo();
  });
});

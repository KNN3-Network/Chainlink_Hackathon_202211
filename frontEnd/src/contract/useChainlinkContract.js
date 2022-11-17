import { contracts } from "../config";
import useWeb3Context from "../hooks/useWeb3Context";
import useContract from "../hooks/useContract";
import ChainlinkAbi from "./abi/Chainlink.json";

export default function useChainlinkContract() {
  const contract = useContract(ChainlinkAbi, contracts.chainlink);
  const { sendTx } = useWeb3Context();

  return {
    async getPageRank() {
      return await contract.methods.getPageRank().call();
    },
    async requestPageRankInfo() {
      const func = contract.methods.requestPageRankInfo(
        "0x33C1AaE1DA7Da9D685Cb9B250afAE04b1312C7Af",
        "2d771a437d224f0babb7e10a65c74a5d"
      );
      return await sendTx(func);
    },
    async requestPageRankInfoParams(ids) {
      // ids should be array
      const func = contract.methods.requestPageRankInfoParams(
        "0x33C1AaE1DA7Da9D685Cb9B250afAE04b1312C7Af",
        "0cac20da440b4d5882b8bc6dcd02cbe8",
        ids
      );
      return await sendTx(func);
    },
  };
}

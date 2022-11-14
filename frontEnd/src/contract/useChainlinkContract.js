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
        "0x1698Dc1EBd90D77792e137802521a3bB06880Db2",
        "f0931bbb43e64ae080265cbea9afeaed"
      );
      return await sendTx(func);
    },
    async requestPageRankInfoParams(ids) {
      // ids should be array
      const func = contract.methods.requestPageRankInfoParams(
        "0x1698Dc1EBd90D77792e137802521a3bB06880Db2",
        "5661dacc1693401490405d8e232f6169",
        ids
      );
      return await sendTx(func);
    },
  };
}

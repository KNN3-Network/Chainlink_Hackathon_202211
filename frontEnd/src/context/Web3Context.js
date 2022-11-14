import { useState, createContext, useCallback, useEffect } from "react";
import { toast } from "material-react-toastify";
import Web3 from "web3";
import { endpoint } from "../config";
import { LoadingOutlined } from "@ant-design/icons";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  // cacheProvider: true,
});

const actionMapping = [
  "Transaction being processed",
  "Transaction Success",
  "Transaction Failed",
];

export const Web3Context = createContext({
  web3: null,
  chainId: null,
  networkId: null,
  blockNumber: null,
  account: null,
  connectWallet: async () => {},
  resetWallet: async () => {},
  estimateGas: async () => {},
  sendTx: async () => {},
});

export const Web3ContextProvider = ({ children }) => {
  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setnetworkId] = useState("");
  const [blockNumber, setBlockNumber] = useState("");

  const listenProvider = (provider) => {
    provider.on("close", () => {
      resetWallet();
    });
    provider.on("accountsChanged", async (accounts) => {
      setAccount(accounts[0]);
    });
    provider.on("chainChanged", (chainId) => {
      setChainId(parseInt(chainId, 16));
    });
  };

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();

      await provider.enable();

      const web3Raw = new Web3(provider);
      setWeb3(web3Raw);

      // get account, use this variable to detech if user is connected
      const accounts = await web3Raw.eth.getAccounts();
      setAccount(accounts[0]);

      // get network id
      setnetworkId(await web3Raw.eth.net.getId());

      // get chain id
      setChainId(await web3Raw.eth.getChainId());

      // init block number
      setBlockNumber(await web3Raw.eth.getBlockNumber());

      listenProvider(provider);
    } catch (error) {
      setWeb3(new Web3(endpoint));
      console.log(error);
    }
  }, []);

  const resetWallet = useCallback(async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    setAccount("");
    await web3Modal.clearCachedProvider();
  }, []);

  const estimateGas = async (func, value = 0) => {
    try {
      const gas = await func.estimateGas({
        from: account,
        value,
      });
      return Math.floor(gas * 1.5);
    } catch (error) {
      const objStartIndex = error.message.indexOf("{");
      const obj = JSON.parse(error.message.slice(objStartIndex));
      toast.error(obj.message);
    }
  };

  /**
   *
   * @param {*} func , required
   * @param {*} actionType , required
   * @param {*} value , default 0
   * @returns
   */

  const sendTx = async (func, value = 0) => {
    const gasLimit = await estimateGas(func, value);

    // gas price is necessary for matic
    const gasPrice = Number(await web3.eth.getGasPrice());

    console.log('gas', gasLimit, gasPrice, account)

    if (!isNaN(gasLimit)) {
      return func
        .send({
          gas: gasLimit,
          gasPrice,
          from: account,
          value,
        })
        .on("transactionHash", (txnHash) => {
          toast.info(actionMapping[0], {
            icon: <LoadingOutlined />,
          });
        })
        .on("receipt", async (receipt) => {
          const txnHash = receipt?.transactionHash;
          toast.success(actionMapping[1], {});
        })
        .on("error", async (err, txn) => {
          const txnHash = txn?.transactionHash;

          if (err.code === 4001) {
            toast.error("User canceled action");
          } else {
            toast.error(actionMapping[2], {});
          }
        });
    }
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    const subscription = web3.eth.subscribe(
      "newBlockHeaders",
      (error, block) => {
        if (!error) {
          setBlockNumber(block.number);
        }
      }
    );

    return () => {
      subscription.unsubscribe((error, success) => {
        if (success) {
          console.log("Unsubscribed");
        }
      });
    };
  }, [account]);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        chainId,
        networkId,
        account,
        blockNumber,
        connectWallet,
        resetWallet,
        estimateGas,
        sendTx,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const Web3ContextConsumer = Web3Context.Consumer;

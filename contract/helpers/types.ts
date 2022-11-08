export type eNetwork = eEthereumNetwork | ePolygonNetwork | eXDaiNetwork;

export enum eEthereumNetwork {
  kovan = "kovan",
  ropsten = "ropsten",
  main = "main",
  hardhat = "hardhat",
  tenderlyMain = "tenderlyMain",
  harhatevm = "harhatevm",
  goerli = "goerli",
}

export enum ePolygonNetwork {
  matic = "matic",
  mumbai = "mumbai",
}

export enum eXDaiNetwork {
  xdai = "xdai",
}

**contract** contains core smart contract code of the job, deliver data result to polygon using Chainlink Node and allow users to fetch data from polygon directly

### Directory Description 

|_contract  
```
  ├── LICENSE.md
  ├── README.md
  ├── contracts
  │   ├── CronUpkeepFactory.sol
  │   ├── KNN3PageRankClient.sol
  │   ├── KeeperRegistrar.sol
  │   ├── LinkToken.sol
  │   └── Oracle.sol
  ├── hardhat.config.ts
  ├── helpers
  │   └── types.ts
  ├── job
  │   ├── pagerank-params.toml
  │   └── pagerank.toml
  ├── package.json
  ├── scripts
  │   ├── cron.ts
  │   └── keeper.ts
  ├── tasks
  │   ├── accounts.ts
  │   └── deploy
  │       ├── cronUpkeepFactory.ts
  │       ├── index.ts
  │       ├── knn3PageRankClient.ts
  │       └── oracle.ts
  ├── test
  │   ├── knn3PageRankClient
  │   └── types.ts
  ├── tsconfig.json
```

 #### deploy
 ```
 yarn install
 yarn hardhat compile
 yarn hardhat deploy:KNN3ProfileClient --network network
 ```
 

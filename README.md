# KNN3 Data Job Management Panel

## Problem to solve   
Data processing job on hybrid smart contract is not easy to manage.   
- Smart contract do not has decent data processing capability.
- Current oracle need enhancement on data service flexibility.
- Data processing jobs should be conveniently managed and kept in reliable (decentralized) manner.    


## Directory Description    

|_baseserver 
```
  ── src
  │   ├── app.controller.spec.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   ├── config
  │   │   ├── config.module.ts
  │   │   └── config.service.ts
  │   ├── constant
  │   ├── cron
  │   ├── job
  │   └── main.ts
  ├── test
  │   ├── app.e2e-spec.ts
  │   ├── cron.e2e-spec.ts
  │   ├── jest-e2e.json
  │   └── job.e2e-spec.ts
  ├── tsconfig.build.json
  └── tsconfig.json
 ```
 
 
|_contract  
```
  ├── LICENSE.md
  ├── README.md
  ├── contracts
  │   ├── CronUpkeepFactory.sol
  │   ├── KNN3PageRankClient.sol
  │   ├── KNN3PageRankClient2.sol
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


|_frontEnd    

## Deploy


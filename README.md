# KNN3 Data Job Management Panel

![Chainlink Hackathon](https://user-images.githubusercontent.com/73726782/202600684-6af1cad4-5d6f-4b37-9db8-3d3f5ff438ad.jpeg)

## [Project Document](https://docs.google.com/document/d/1ikYChJuXXjDaH_4F2_oQfuXcyZz37IKHIgj4tynmn-U/edit)


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
 
 **baseserver** is the back-end service of the Job Management Panel consisting of the functionality below:
  1. Job creation, edit, update
  2. Register job in Chainlink automation
 
 #### deploy
 dev
 ```
 pnpm install
 pnpm start:dev
 ```
 production
 ```
 pnpm install
 pnpm build
 pm2 start dist/main.js
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
**contract** contains core smart contract code of the job, deliver data result to polygon using Chainlink Node and allow users to fetch data from polygon directly

 #### deploy
 ```
 yarn install
 yarn hardhat compile
 yarn hardhat deploy:KNN3ProfileClient --network network
 ```
 
 **deploy address**  
  * mumbai:[0xF0520c0192D74908930B24B8F76E227548860F7b](https://mumbai.polygonscan.com/address/0xF0520c0192D74908930B24B8F76E227548860F7b)
  * goerli:[0x78880dEFC42Fc3bee64F71A480fEc0032Ad6dBA7](https://goerli.etherscan.io/address/0x78880dEFC42Fc3bee64F71A480fEc0032Ad6dBA7)

|_frontEnd    
```
    ├─public
    └─src
        ├─api
        ├─config  
        ├─context  
        ├─contract 
        ├─hooks
        ├─router
        ├─static
        │  └─img      
        ├─store
        │      atom.js
        └─views
            ├─home
            ├─initialization 
            ├─login 
            ├─page
            │  ├─Account
            │  │  ├─Role
            │  │  └─User    
            │  ├─Dashboard
            │  │  ├─components
            │  │  ├─InstanceUsage
            │  │  └─JobStatus  
            │  └─Job
            │      ├─DataDelivery   
            │      ├─DataPreparatio   
            │      ├─DataProcessing
            │      └─JobInitialization
            └─register
```



### Faucet
* [faucet](https://faucet.polygon.technology/)

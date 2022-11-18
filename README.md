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
    │  .gitignore
    │  list.txt
    │  package-lock.json
    │  package.json
    │  pnpm-lock.yaml
    │  README.md
    │  tsconfig.json
    │  
    ├─public
    │      favicon.ico
    │      index.html
    │      logo192.png
    │      logo512.png
    │      manifest.json
    │      robots.txt
    │      
    └─src
        │  App.css
        │  App.tsx
        │  index.css
        │  index.tsx
        │  logo.svg
        │  react-app-env.d.ts
        │  reportWebVitals.ts
        │  setupTests.ts
        │  
        ├─api
        │      index.ts
        │      
        ├─config
        │      index.ts
        │      
        ├─context
        │      Web3Context.js
        │      
        ├─contract
        │  │  useChainlinkContract.js
        │  │  
        │  └─abi
        │          Chainlink.json
        │          
        ├─hooks
        │      useContract.js
        │      useWeb3Context.js
        │      
        ├─router
        │      index.ts
        │      
        ├─static
        │  └─img
        │          31.png
        │          bac1.png
        │          bac2.png
        │          bac3.png
        │          bac4.png
        │          bac5.png
        │          bac6.png
        │          bar.png
        │          copy.png
        │          logo.png
        │          QR_ready.png
        │          
        ├─store
        │      atom.js
        │      
        ├─style
        │      resetAntd.scss
        │      
        ├─utils
        │      tools.ts
        │      
        └─views
            ├─home
            │      index.scss
            │      index.tsx
            │      
            ├─initialization
            │      index.scss
            │      index.tsx
            │      
            ├─login
            │      index.scss
            │      index.tsx
            │      
            ├─page
            │  ├─Account
            │  │  ├─Role
            │  │  │      index.scss
            │  │  │      index.tsx
            │  │  │      
            │  │  └─User
            │  │          index.scss
            │  │          index.tsx
            │  │          
            │  ├─Dashboard
            │  │  ├─components
            │  │  │      LineEchart.tsx
            │  │  │      
            │  │  ├─InstanceUsage
            │  │  │      index.scss
            │  │  │      index.tsx
            │  │  │      
            │  │  └─JobStatus
            │  │          index.scss
            │  │          index.tsx
            │  │          
            │  └─Job
            │      ├─DataDelivery
            │      │      index.scss
            │      │      index.tsx
            │      │      
            │      ├─DataPreparation
            │      │      index.scss
            │      │      index.tsx
            │      │      
            │      ├─DataProcessing
            │      │      index.scss
            │      │      index.tsx
            │      │      
            │      └─JobInitialization
            │              index.scss
            │              index.tsx
            │              
            └─register
                    index.scss
                    index.tsx
```

## Deploy


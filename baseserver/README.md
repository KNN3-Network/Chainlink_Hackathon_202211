 **baseserver** is the back-end service of the Job Management Panel consisting of the functionality below:
  1. Job creation, edit, update
  2. Register job in Chainlink automation


### Directory Description    

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

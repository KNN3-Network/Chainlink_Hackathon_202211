import { Injectable } from '@nestjs/common';
import * as EventEmitter from 'events';
import { fromEvent } from 'rxjs';

import { BigNumber } from 'ethers';
import * as ethers from 'ethers';
import * as KNN3ProfileClient from '../constant/KNN3ProfileClient.json';
import * as CronUpkeepFactory from '../constant/CronUpkeepFactory.json';
import * as KeeperRegistrar from '../constant/KeeperRegistrar.json';
import * as LinkToken from '../constant/LinkToken.json';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CronService {
  private readonly emitter: EventEmitter;

  constructor(private readonly configService: ConfigService) {
    // Inject some Service here and everything about SSE will stop to work.
    this.emitter = new EventEmitter();
  }

  subscribe() {
    return fromEvent(this.emitter, 'cron');
  }

  async emit(data) {
    this.emitter.emit('cron', { data });
  }

  /**
   * register
   * @param cron
   * @param address
   * @returns
   */
  async register(cron: string, address: string[], owner: string) {
    if (this.configService.get('IS_CRON') === '0') {
      this.emit({
        progress: 1,
      });
      return true;
    }

    this.emit({
      progress: 0,
    });
    // Connect to the network
    const provider = ethers.getDefaultProvider(
      'https://goerli.infura.io/v3/' + this.configService.get('INFURA_API_KEY'),
    );

    // console.log("provider",provider);

    // Load the wallet to deploy the contract with
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw new Error('Please set your PRIVATE_KEY');
    }

    const wallet = new ethers.Wallet(privateKey, provider);

    const operatorAddress = '0x1698Dc1EBd90D77792e137802521a3bB06880Db2';
    const requestPageRankInfoJobId = 'f0931bbb43e64ae080265cbea9afeaed';
    const requestPageRankInfoParamsJobId = '5661dacc1693401490405d8e232f6169';
    const knn3ProfileClientAddress =
      '0x78880dEFC42Fc3bee64F71A480fEc0032Ad6dBA7';

    const cronUpkeepFactoryAddress =
      '0x1af3ce8de065774b0ec08942fc5779930d1a9622';
    const registrarAddress = '0x9806cf6fbc89abf286e8140c42174b94836e36f2';
    const linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';

    let KNN3ProfileClientIface = new ethers.utils.Interface(
      KNN3ProfileClient.abi,
    );
    const handlerSig = address.length
      ? KNN3ProfileClientIface.encodeFunctionData('requestPageRankInfoParams', [
          operatorAddress,
          requestPageRankInfoParamsJobId,
          address,
        ])
      : KNN3ProfileClientIface.encodeFunctionData('requestPageRankInfo', [
          operatorAddress,
          requestPageRankInfoJobId,
        ]);
    console.log('handlerSig', handlerSig.toLowerCase());

    const cronUpkeepFactory = new ethers.Contract(
      cronUpkeepFactoryAddress,
      CronUpkeepFactory.abi,
      provider,
    );

    const encodeCronJobString = await cronUpkeepFactory.encodeCronJob(
      knn3ProfileClientAddress,
      handlerSig,
      cron,
    );

    const tx = await cronUpkeepFactory
      .connect(wallet)
      .newCronUpkeepWithJob(encodeCronJobString);
    console.log('cronUpkeepFactory', tx);
    const res = await tx.wait();

    this.emit({
      progress: 0.5,
    });

    let upkeep = '';
    res.events?.map((item) => {
      if (item.event == 'NewCronUpkeepCreated') {
        console.log('upkeep', '0x' + item.data.slice(0, 66).slice(-40));
        upkeep = '0x' + item.data.slice(0, 66).slice(-40);
      }
    });

    const amount = BigNumber.from('5000000000000000000');
    const source = BigNumber.from(97);
    const executeGas = BigNumber.from(500000);
    const emptyBytes = '0x00';

    const keeperRegistrar = new ethers.Contract(
      registrarAddress,
      KeeperRegistrar.abi,
      provider,
    );

    const abiEncodedBytes = keeperRegistrar.interface.encodeFunctionData(
      'register',
      [
        'cron automation',
        emptyBytes,
        upkeep,
        executeGas,
        owner,
        emptyBytes,
        amount,
        source,
        wallet.address,
      ],
    );

    console.log('abiEncodedBytes', abiEncodedBytes);

    const linkToken = new ethers.Contract(
      linkTokenAddress,
      LinkToken.abi,
      provider,
    );

    const tx1 = await linkToken
      .connect(wallet)
      .transferAndCall(registrarAddress, amount, abiEncodedBytes);
    await tx1.wait();

    this.emit({
      progress: 1,
    });
    return true;
  }
}

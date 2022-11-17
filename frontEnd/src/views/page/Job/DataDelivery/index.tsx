import React, { useState, useEffect, useCallback } from 'react';
import { Input, Radio, Space, DatePicker, Progress, Spin, TimePicker, message } from 'antd';
import useWeb3Context from '../../../../hooks/useWeb3Context';
import useChainlinkContract from '../../../../contract/useChainlinkContract';
import { useHistory } from 'react-router-dom';
import { chainInfo, routerActive } from './../../../../store/atom';
import api from './../../../../api';
import { useRecoilState } from 'recoil';
import { baseURL } from '../../../../config';
import ChainlinkAbi from "./../../../../contract/abi/Chainlink.json";
import moment from 'moment';
import './index.scss';

const dateFormat = 'HH:mm';
const dateFormat1 = 'mm';

const { TextArea } = Input;

export default function DataDelivery() {
  const {account, connectWallet} = useWeb3Context();

  const [frequency, setFrequency] = useState('1');

  const [deliveryMethod, setDeliveryMethod] = useState('1');

  const [step, setStep] = useState('init');

  const [loading,setLoading] = useState(false);

  const [date, setDate] = useState("");

  const [date1, setDate1] = useState("");

  const [pageRankResult, setPageRankResult] = useState("");

  const [autoType, setAutoType] = useState("1");

  const [routerActiveStr, setRouterActiveStr] = useRecoilState(routerActive);

  const [chainBaseInfo, setChainBaseInfo] = useRecoilState(chainInfo);

  const [progress, setProgress] = useState(0);

  const [progressOneTime, setProgressOneTime] = useState(0);

  const [str, setStr] = useState("")

  const history = useHistory();

  const chainlinkContract:any = useChainlinkContract()

  const routerTo = (str: string) => {
    history.push(str)
  }

  const onChangeFrequency = (e: any) => {
    console.log('radio checked', e.target.value);
    setFrequency(e.target.value);
  };

  const onChangeAutoType = (e: any) => {
    console.log('radio checked', e.target.value);
    setAutoType(e.target.value);
  };

  const back = () => {
    setProgress(0);
    setProgressOneTime(0);
    if (step === 'init') {
      setRouterActiveStr('dataProcessing');
    } else {
      setStep('init');
    }
  };

  const requestPageRankInfo = async () => {
    const res = await chainlinkContract.requestPageRankInfo();
    console.log(res)
  }

  const requestPageRankInfoParams = async (params: any) => {
    // pass address here
    const res = await chainlinkContract.requestPageRankInfoParams(params)
    console.log(res)
  }

  const getPageRank = async () => {
    const res = await chainlinkContract.getPageRank()

    if(res){
      setProgressOneTime(100)
    }

    setStr((prev: any) => {
      return `
      Call Method:

      const ChainlinkAbi = ${JSON.stringify(ChainlinkAbi)}
      const res = new Web3.eth.Contract(ChainlinkAbi, '0x78880dEFC42Fc3bee64F71A480fEc0032Ad6dBA7').methods.getPageRank().call()`
    })
  }

  const requestCronJob = async () => {
    setStep('delivery-6');
    // notice, params to be replaced    
    const res:any = await api.job.createCron({
      // period
      "cron": getFrequency(),
      // watch address
      "address": chainBaseInfo.interestedAddress.toLowerCase().split(';'),
      "owner": account
    })
    if(res.result){
      listenCronStatus();
    }
  }

  const listenCronStatus = useCallback (async() => {  
    // const eventSource = new EventSource(`${baseURL}/cron/sse`);
    // eventSource.onmessage = ({ data }) => {
    //   console.log('data', data);
    //   if(JSON.parse(data).progress == -1){
    //     message.error('error')
    //   }else{
    //     setProgress(JSON.parse(data).progress * 100)
    //     if(JSON.parse(data).progress == 1){
    //       getPageRank()
    //     }
    //   }
    // };
    setTimeout(() => {
      setProgress(100);
      getPageRank();
    },3000)
  }, [])

  const getFrequency = () => {
    let deliveryFrequency = '';
    if(frequency == '1'){
      if(autoType == '1' && date){
        deliveryFrequency = `${Number(date.split(':')[1])} ${Number(date.split(':')[0])} * * *`
      }
      if(autoType == '2' && date1){
        deliveryFrequency = `${Number(date1)} * * * *`
      }
    }
    return deliveryFrequency;
  }

  const saveJob = async () => {
    setLoading(true);
    const res: any = await api.job.create({
      ...chainBaseInfo,
      deliveryMethod,
      deliveryFrequency: getFrequency(),
      socialStatus:chainBaseInfo.socialStatus.join(','),
      interestedAddress:chainBaseInfo.interestedAddress.toLowerCase()
    })
    if(res){
      setLoading(false);
      if (frequency == '1') {
        // requestCronJob();
        setStep('delivery-4');
      } else {
        oneTimeLation();
      }
    }
  }

  const oneTimeLation = () => {
    if(chainBaseInfo.interestedAddress){
      requestPageRankInfoParams(chainBaseInfo.interestedAddress.toLowerCase().split(';'));
    }else{
      requestPageRankInfo();
    }
    setInterval(() => {
      getPageRank();
    },60000)
    setStep('delivery-5');
  }

  return (
    <Spin spinning={loading} delay={500}>
    <div className={step === 'delivery-4' ? 'dataDelivery dataDelivery-4' : 'dataDelivery'}>
      {
        step == 'init' &&
        <div className="con">
          <div className="title">Please select data delivery frequency</div>
          <Radio.Group value={frequency} onChange={onChangeFrequency}>
            <Space direction="vertical">
              <Radio value={'1'}>Chainlink Automation</Radio>
              {
                frequency === '1' &&
                <div className="auto-type">
                  <Radio.Group value={autoType} onChange={onChangeAutoType}>
                    <Space direction="vertical">
                      <Radio value={'1'}>Daily</Radio>
                      <Radio value={'2'}>Hourly</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              }
              <Radio value={'2'}>One time</Radio>
            </Space>
          </Radio.Group>

          <div className="title top">Please select data delivery method</div>
          <Radio.Group value={deliveryMethod} onChange={(e: any) => setDeliveryMethod(e.target.value)}>
            <Space direction="vertical">
              <Radio value={'1'}>Smart Contract</Radio>
              <Radio value={'2'} disabled>text in json</Radio>
              <Radio value={'3'} disabled>S3</Radio>
              <Radio value={'4'} disabled>IPFS</Radio>
              <Radio value={'5'} disabled>Arweave</Radio>
              <Radio value={'6'} disabled>TiDB</Radio>
            </Space>
          </Radio.Group>
          <div className='date'>
            <div>
              {
                autoType === '1' && frequency == '1' &&
                <TimePicker  format={dateFormat} value={date ? moment(date, dateFormat) : null} onChange={(date: any, dateString: string) => setDate(dateString)} />
              }

            </div>
            <div>
              {
                autoType === '2' && frequency == '1' &&
                <TimePicker  format={dateFormat1} value={date1 ? moment(date1, dateFormat1) : null} onChange={(date: any, dateString: string) => setDate1(dateString)} />
              }
            </div>
          </div>
        </div>
      
      }
      {
        step == 'delivery-4' &&
        <div className="delivery-4-con">
          <div className='job-create'>Your job has been created</div>
        </div>
      }
      {
        step == 'delivery-5' &&
        <div className="con">
          <div><Progress strokeLinecap="butt" percent={progressOneTime} /></div>
          <div className='des1'>{progressOneTime == 100 ? 'Your data has been uploaded successfully' : 'Your data is being uploaded to Smart Contract'}</div>
          <div className='result_tit'>Below is how you can access the data from smart contract</div>
          <div>
            <TextArea rows={18} value={str}/>
          </div>
        </div>
      }
      {
        step == 'delivery-6' &&
        <div className="con">
          <div><Progress strokeLinecap="butt" percent={progress} /></div>
          <div className='des1'>{progress == 100 ? 'Your Job has been registered successfully' : 'Your Job is being registered on Chainlink'}</div>
          <div className='result_tit'>Below is how you can access the data from smart contract</div>
          <div>
            <TextArea rows={18} value={str}/>
          </div>
        </div>
      }
      {
        step == 'init' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={saveJob}>Next</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }

      {
        step == 'delivery-4' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={() => oneTimeLation()}>One Time</div>
          <div className="chainlink-primary-btn" onClick={() => requestCronJob()}>Register on Chainlink Automation</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }

      {
        step == 'delivery-5' &&
        <div className='btn-group'>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }

      {
        step == 'delivery-6' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn"  onClick={() => window.open('https://automation.chain.link/goerli/')}>View Job Status from Chainlink Automation</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }

    </div >
    </Spin>
  );
}

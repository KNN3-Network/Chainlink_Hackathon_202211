import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Select, Radio, Space, Input, Upload, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { chainInfo, routerActive } from './../../../../store/atom';
import { useRecoilState } from 'recoil';
import './index.scss';
const { TextArea } = Input;

export default function DataProcessing() {

  const history = useHistory();

  const [dataType, setDataType] = useState('3');

  const [alogorithm, setAlogorithm] = useState('1');

  const [interestedAddress, setInterestedAddress] = useState('');

  const [scriptType, setScriptType] = useState(1);
  
  const [step, setStep] = useState('init');

  const [chainBaseInfo, setChainBaseInfo] = useRecoilState(chainInfo);

  const [routerActiveStr, setRouterActiveStr] = useRecoilState(routerActive);

  const onChangeScriptType = (e: any) => {
    console.log('radio checked', e.target.value);
    setScriptType(e.target.value);
  };

  const processNext = () => {
    if(step == 'init'){
      setStep(`step_${dataType}`)
    }else{
      setChainBaseInfo((prev: any) => {
        return {
          ...prev,
          dataType,
          alogorithm,
          interestedAddress
        }
      });
      setRouterActiveStr("dataDelivery");
    }
  }

  const routerTo = (str:string) => {
    setRouterActiveStr(str);
  }

  const getResult = () => {
    if(step == 'step_3'){
      if(alogorithm == '4'){
        setRouterActiveStr("dataDelivery");
      }else{
        setStep(`step_3_${alogorithm}`)
      }
    }
  }

  const back = () => {
    if(step == 'init'){
      setRouterActiveStr("dataPreparation");
    }else{
      if(step.split('_').length == 2){
        setStep('init')
      }else{
        setStep(`step_${step.split('_')[1]}`)
      }
    }
  }

  useEffect(() => {
    setInterestedAddress(chainBaseInfo.interestedAddress);
    setDataType(chainBaseInfo.dataType || '3');
    setAlogorithm(chainBaseInfo.alogorithm || '1');
  }, []);

  return (
    <div className="dataProcessing">
      {
        step === 'init' &&
        <div className="con">
          <div className="title">Please select how you want the data to be processed</div>
          <div>
            <Radio.Group value={dataType} onChange={(e:any) => setDataType(e.target.value)}>
              <Space direction="vertical">
                <Radio value={'1'} disabled>Raw Data</Radio>
                <Radio value={'2'} disabled>Customized aggregation</Radio>
                <Radio value={'3'}>Algorithm Ready to Use</Radio>
                <Radio value={'4'} disabled>Customized Algorithm</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      }
      {
        (step === 'step_1' || step === 'step_3_1') &&
        <div className="con step_1">
          <div className="title">Please enter the address you are interested in, separate by ";"</div>
          <div className='des'>you can add <span>up to 10 address</span> at one time</div>
          <div className='des'>For a better user experience, there is a limit of 10 returned results for each query by default.</div>
          <div>
            <TextArea rows={16} value={interestedAddress} onChange={(e:any) => setInterestedAddress(e.target.value)}/>
          </div>
        </div>
      }
      {
        step === 'step_2' &&
        <div className="con step_2">
          <div className="title">Please enter the SQL for data aggregation</div>
          <div>
            <TextArea rows={20} />
          </div>
        </div>
      }
      {
        step === 'step_3' &&
        <div className="con">
          <div className="title">Please select an alogorithm</div>
          <div>
            <Radio.Group value={alogorithm} onChange={(e:any) => setAlogorithm(e.target.value)}>
              <Space direction="vertical">
                <Radio value={'1'}>PageRank</Radio>
                <Radio value={'2'} disabled>Address similarity</Radio>
                <Radio value={'3'} disabled>Shortest Path between two addresses</Radio>
                <Radio value={'4'} disabled>Community detection</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      }
      {
        (step === 'step_3_2' || step === 'step_3_3') &&
        <div className="con step_3_2">
          <div className="title">Please enter the address you are interested in, separate by ";"</div>
          <div className='des1'>e.g.(00x00,01a02) ; (00x00,01a03)</div>
          <div className='des'>You can add <span>up to 10 pairs</span> at one time</div>
          <div>
            <TextArea rows={17} />
          </div>
        </div>
      }
      {
        step === 'step_4' &&
        <div className="con step_4">
          <div className="title">Please select your script type</div>
          <div className="radio">
            <Radio.Group value={scriptType} onChange={onChangeScriptType}>
              <Space direction="vertical">
                <Radio value={1}>Single Address based calculation</Radio>
                <Radio value={2}>Address pair based calculaion</Radio>
                <Radio value={3}>Model training and prediction</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="title">Please upload your algorithm script</div>
          <div>
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
        </div>
      }
      {
        step === 'step_3' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={() => routerTo('dataDelivery')}>Get Default Result</div>
          <div className="chainlink-prev-btn" onClick={() => getResult()}>Get Interested Result</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }
      {
        step !== 'step_3' &&
        <div className='btn-group'>
          <div className="chainlink-primary-btn" onClick={() => processNext()}>Next</div>
          <div className="chainlink-default-btn" onClick={() => back()}>Back</div>
        </div>
      }
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { chainInfo, routerActive } from './../../../../store/atom';
import { useRecoilState } from 'recoil';
import './index.scss';

export default function DataPreparation() {

  const [basicInfo, setBasicInfo] = useState("")

  const [socialStatus, setSocialStatus] = useState([])

  const [financialStatus, setFinancialStatus] = useState("")

  const [repution, setRepution] = useState("")

  const [chainBaseInfo, setChainBaseInfo] = useRecoilState(chainInfo);

  const [, setRouterActiveStr] = useRecoilState(routerActive);


  const routerTo = (str: string) => {
    setChainBaseInfo((prev: any) => {
      return {
        ...prev,
        basicInfo,
        socialStatus,
        financialStatus,
        repution
      }
    })
    setRouterActiveStr('dataProcessing');
  }

  const returnTo = () => {
    setRouterActiveStr('jobInitialization');
  }

  useEffect(() => {
    setBasicInfo(chainBaseInfo.basicInfo);
    setSocialStatus(chainBaseInfo.socialStatus);
    setFinancialStatus(chainBaseInfo.financialStatus);
    setRepution(chainBaseInfo.repution);
  }, []);

  return (
    <div className="dataPreparation">
      <div className="con">
        <div className="title">Please select the data you will be using</div>
        <div className="title-small">User base info</div>
        <div className="input">
          <Select
            value={basicInfo}
            onChange={(e) => setBasicInfo(e)}
            options={[
              {
                value: 'address',
                label: 'address',
              }
            ]}
          />
        </div>
        <div className="title-small">Social status</div>
        <div className="input">
          <Select
            mode="multiple"
            value={socialStatus}
            onChange={(e) => setSocialStatus(e)}
            options={[
              {
                value: '1',
                label: 'POAPs Attend',
                disabled:true
              },
              {
                value: '2',
                label: 'RSS Follows',
                disabled:true
              },
              {
                value: '3',
                label: 'Snapshot Vote',
                disabled:true
              },
              {
                value: '4',
                label: 'Twitter',
                disabled:true
              },
              {
                value: '5',
                label: 'Lens Profile',
              },
              {
                value: '6',
                label: 'Lens Follower',
              }
            ]}
          />
        </div>
        <div className="title-small">Financial status</div>
        <div className="input">
          <Select
            value={financialStatus}
            onChange={(e) => setFinancialStatus(e)}
            options={[
              {
                value: '1',
                label: 'Token holding',
              },
              {
                value: '2',
                label: 'NFT holding',
              }
            ]}
          />
        </div>
        <div className="title-small">On Chain reputation</div>
        <div className="input">
          <Select
            value={repution}
            onChange={(e) => setRepution(e)}
            options={[]}
          />
        </div>
      </div>
      <div className='btn-group'>
        <div className="chainlink-primary-btn" onClick={() => routerTo('/home/job/dataProcessing')}>Next</div>
        <div className="chainlink-default-btn" onClick={() => returnTo()}>Back</div>
      </div>
    </div>
  );
}

import { useEffect, useCallback } from 'react';
import useWeb3Context from '../../../../hooks/useWeb3Context';
import useChainlinkContract from '../../../../contract/useChainlinkContract';
import { chainInfo, routerActive } from './../../../../store/atom';
import { useRecoilState } from 'recoil';
import api from '../../../../api';
import './index.scss';
import { baseURL } from '../../../../config';
import Bac from "./../../../../static/img/bac4.png"
import { useHistory } from 'react-router-dom';


export default function JobInitialization() {
  const {account, connectWallet} = useWeb3Context();

  const chainlinkContract = useChainlinkContract()

  const [routerActiveStr, setRouterActiveStr] = useRecoilState(routerActive);

  const history = useHistory();

  const routerTo = () => {
    setRouterActiveStr('dataPreparation');
  }

  const requestPageRankInfo = async () => {
    const res = await chainlinkContract.requestPageRankInfo();
    console.log(res)
  }

  const requestPageRankInfoParams = async () => {
    // pass address here
    const res = await chainlinkContract.requestPageRankInfoParams(['0x1397e2861846A48EA575E3F1f6920F5Fd6E7d1B1'])
    console.log(res)
  }

  const requestCronJob = async () => {
    // notice, params to be replaced    
    const res:any = await api.job.createCron({
      // period
      "cron": "*/3 * * * *",
      // watch address
      "address": [
          "0x2e21f5d32841cf8c7da805185a041400bf15f21a"
      ],
      "owner": account
    })
    if(res.result){
      console.log('res', res)
    }
  }

  // const listenCronStatus = useCallback (async() => {  
  //   const eventSource = new EventSource(`${baseURL}/cron/sse`);
  //   eventSource.onmessage = ({ data }) => {
  //     console.log('data', data);
  //   };
  // }, [])

  // useEffect(()=>{
  //   listenCronStatus()
  // }, [])

  return (
    <div className="jobInitialization">
      <div className='con'>
        <div>Click the button "Create a New Job" to initialize your job. It will generate a job instance and an access key to data access</div>
        <div>
          <img src={Bac} alt="" />
        </div>
        <div>
          {account ? (
            <>
              <div className="chainlink-primary-btn" onClick={() => routerTo()}>
                Create a New Job
              </div>
              {/* <div>
                For test case:
                <div>
                  <a onClick={() => requestPageRankInfo()}>
                    Random request pagerank
                  </a><br/>
                  <a onClick={() => requestPageRankInfoParams()}>
                    Request pagerank with address
                  </a><br/>
                  <a onClick={()=> requestCronJob()}>
                    Request Cron Job
                  </a>
                </div>
              </div> */}
            </>
          ) : (
            <div
              className="chainlink-primary-btn"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

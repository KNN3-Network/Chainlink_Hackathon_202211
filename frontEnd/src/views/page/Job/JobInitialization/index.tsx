import useWeb3Context from '../../../../hooks/useWeb3Context';
import { routerActive } from './../../../../store/atom';
import { useRecoilState } from 'recoil';
import './index.scss';
import Bac from "./../../../../static/img/bac4.png"


export default function JobInitialization() {
  const {account, connectWallet} = useWeb3Context();

  const [, setRouterActiveStr] = useRecoilState(routerActive);

  const routerTo = () => {
    setRouterActiveStr('dataPreparation');
  }

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

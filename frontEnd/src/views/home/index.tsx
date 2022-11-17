import React, { useState, useEffect } from 'react';
import './index.scss';
import Logo from '../../static/img/logo.png';
import useChainlinkContract from '../../contract/useChainlinkContract';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { routerConfig } from './../../router';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { routerActive } from './../../store/atom';
import useWeb3Context from '../../hooks/useWeb3Context';

export default function Home() {

  const {account} = useWeb3Context();
  const chainlinkContract = useChainlinkContract();

  const [routers, setRouters] = useState(routerConfig);

  const [routerActiveStr, setRouterActiveStr] = useRecoilState<any>(routerActive)

  const history = useHistory();

  useEffect(() => {
    refreshRouterActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  useEffect(() => {
    if(routerActiveStr){
      history.push(`/home/job/${routerActiveStr}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerActiveStr]);

  const refreshRouterActive = () => {
    setRouters((prev: any) => {
      if (history.location.pathname === '/home') {
        prev[0]['active'] = true;
        prev[0]['children'][0]['active'] = true;
      } else {
        prev.forEach((t: any, i: number) => {
          t.children.forEach((h: any, r: number) => {
            if (h.path === history.location.pathname) {
              prev[i]['active'] = true;
              prev[i]['children'][r]['active'] = true;
            }else{
              prev[i]['children'][r]['active'] = false;
            }
          })
        })
      }
      return [...prev]
    })
  }

  const menuClick = (i: number) => {
    setRouters((prev: any) => {
      prev.forEach((t: any, index: number) => {
        if (i !== index) t.active = false;
      })
      prev[i]['active'] = !prev[i]['active'];
      return [...prev]
    })
  };

  const menuSecondClick = (index: number, i: number) => {
    setRouters((prev: any) => {
      prev.forEach((t: any, y: number) => {
        t.children.forEach((h: any, r: number) => {
          h.active = false;
        })
      })
      prev[index]['children'][i]['active'] = true;
      return [...prev]
    })
    setRouterActiveStr('');
    history.push(routers[index]['children'][i]['path']);
  };

  const getPageRank = async () => {
    const res:any = await chainlinkContract.getPageRank()
    // address, rank ,score
    console.log('res', res)
  }

  useEffect(()=>{
    if(!account){
      return
    }
    getPageRank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  return (
    <div className="page-home">
      <div className="page-left-content">
        <div className="page-left-content-info">
          <div className="page-left-content-info-head">
            <img src={Logo} alt=""></img>
          </div>
          <div>
            <div className="page-left-content-info-name">
              Admin
            </div>
            <div className="page-left-content-info-email">
              admin
            </div>
          </div>
        </div>
        <div className="menu">
          {
            routers.map((item: any, index: number) =>
              <div key={index} className="menu-first">
                <div onClick={() => menuClick(index)} className={item.active && 'menu-first-active'}>
                  <div><div className="bac"></div><span>{item.name}</span></div>
                  <div className="icon-out">
                    {
                      item.active &&
                      <UpOutlined />
                    }
                    {
                      !item.active &&
                      <DownOutlined />
                    }
                  </div>
                </div>
                {
                  item.active &&
                  <div className="menu-second">
                    {
                      item.children.map((t: any, i: number) =>
                        <div key={i} className={t.active && 'menu-second-active'} onClick={() => menuSecondClick(index, i)}>{t.name}</div>
                      )
                    }
                  </div>
                }

              </div>
            )
          }
        </div>
      </div>
      <div className="page-right-content" key={history.location.key}>
        <Router>
          <Switch>
            {
              routers.map((item: any, index: number) =>
                item.children.map((t: any, i: number) =>
                  <Route path={t.path} component={t.component} key={`${index}${i}`} />
                )
              )
            }
            <Redirect to="/home/dashboard/instanceUsage" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

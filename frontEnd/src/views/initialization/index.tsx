import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import Bac from "./../../static/img/31.png";

export default function Initialization() {

  const history = useHistory();

  const routerTo = (str: string) => {
    history.push(`/${str}`)
  }

  return (
    <div className="initialization">
      <div className="content">
        <div className='left-con'>
          <p className="des">KNN3</p>
          <p className="des">Data Process Job</p>
          <p className="des">Management Panel</p>
          <div className="btn-group-init">
            <div className="chainlink-primary-btn" onClick={() => routerTo('login')}>Login</div>
            <div className="chainlink-primary-btn" onClick={() => routerTo('register')}>Register</div>
          </div>
        </div>
        <div>
          <img
            alt=""
            src={Bac}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import './index.scss';
const { Search } = Input;

export default function Register() {

  const history = useHistory();

  const routerTo = (str: string) => {
    history.push(`/${str}`)
  }

  return (
    <div className="register">
      <div className="register-content">
        <div>Register</div>
        <div><Input placeholder="Email" /></div>
        <div><Search
          placeholder="Verification code"
          allowClear
          enterButton="Send code"
        /></div>
        <div><Input.Password placeholder="Password" /></div>
        
        <div onClick={() => routerTo('login')}>Register</div>
        <div>Have account?<span onClick={() => routerTo('login')}> Login</span></div>
      </div>
    </div>
  );
}

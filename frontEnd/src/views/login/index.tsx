import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';
import './index.scss';

export default function Login() {

  const history = useHistory();

  const routerTo = (str: string) => {
    history.push(`/${str}`)
  }

  return (
    <div className="login">
      <div className="login-content">
        <div>Login</div>
        <div><Input placeholder="Email" /></div>
        <div><Input.Password placeholder="Password" /></div>
        <div>Forget password?</div>
        <div onClick={() => routerTo('home')}>Login</div>
        <div>Dont have an account?<span onClick={() => routerTo('register')}> Register now</span></div>
      </div>
    </div>
  );
}

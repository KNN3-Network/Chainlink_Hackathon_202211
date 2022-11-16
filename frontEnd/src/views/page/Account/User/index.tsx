import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import './index.scss';

export default function User() {

  const userList = [
    {
      id: '1',
      account: 'admin',
      email: 'admin@gmail.com',
      role:'admin',
      loginTm:'2022-04-15 13:50:21',
      ip: '167.156.173.102',
      status: '1'
    },
    {
      id: '2',
      account: 'zx123',
      email: 'zx123abc@gmail.com',
      role:'job_viewer',
      loginTm:'2022-04-15 13:50:21',
      ip: '167.106.153.102',
      status: '1'
    },
    {
      id: '3',
      account: 'hhh001',
      email: 'hhh001@hotmail.com',
      role:'job_editor',
      loginTm:'2022-04-15 13:50:21',
      ip: '167.106.153.102',
      status: '1'
    },
  ]
  const columns = [
    {
      title: 'ID', width: 200, dataIndex: 'id', key: 'id', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Account', width: 200, dataIndex: 'account', key: 'account', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    { title: 'Role', width: 200, dataIndex: 'role', key: 'role', render: (text: string) => <span>{text}</span> },
    {
      title: 'Last Login Time', width: 200, dataIndex: 'loginTm', key: 'loginTm', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    { title: 'Last Login IP', width: 200, dataIndex: 'ip', key: 'ip', render: (text: string) => <span>{text}</span> },
    {
      title: 'Status', width: 200, dataIndex: 'status', key: 'status', render: (text: string, record: any) => (
        <span><Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={text === '1'} /></span>
      ),
    },
    {
      title: 'Action', width: 200, key: 'operation', render: (text: string, record: any) =>
        <span className='action'>
          <span className='edit'>Edit Logs</span>
          <span>Delete</span>
        </span>
    },
  ];

  return (
    <div className="userStatus">
      <div>
        <div className='title'>Account</div>
        <div className='con'>
          <div><div className="chainlink-primary-btn">Add User</div></div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={userList}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

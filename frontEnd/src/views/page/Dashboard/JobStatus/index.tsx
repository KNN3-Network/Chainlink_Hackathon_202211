import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import api from './../../../../api';
import './index.scss';

export default function JobStatus() {

  const jobList = [
    {
      id: '1',
      account: 'admin',
      jobNm: 'nft holding',
      role: 'nft holding',
      loginTm: '2022-04-15 13:50:21',
      ip: '167.156.173.102',
      status: '1'
    },
    {
      id: '2',
      account: 'zx123',
      jobNm: 'poaps attend',
      role: 'poaps attend',
      loginTm: '2022-04-15 13:50:21',
      ip: '167.106.153.102',
      status: '0'
    }
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
    { title: 'Job Name', width: 200, dataIndex: 'jobNm', key: 'jobNm', render: (text: string) => <span>{text}</span> },
    {
      title: 'Role', width: 200, dataIndex: 'role', key: 'role', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Last Login Time', width: 200, dataIndex: 'loginTm', key: 'loginTm', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Last Login IP', width: 200, dataIndex: 'ip', key: 'ip', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Status', width: 200, dataIndex: 'status', key: 'status', render: (text: string, record: any) => (
        <span><Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={text === '1'} /></span>
      ),
    },
    {
      title: 'Action', width: 200, key: 'operation', render: (text: string, record: any) =>
        <span className='action'>
          <span className='edit'>Edit Logs</span>
          {
            record.status == '0' &&
            <span>Delete</span>
          }

        </span>
    },
  ];

  // const getList = async () => {
  //   const res: any = await api.job.list()
  // }

  // useEffect(() => {
  //   getList();
  // }, []);


  return (
    <div className="jobStatus">
      <div>
        <div className='title'>Account Monitor</div>
        <div className='con'>
          <div><div className="chainlink-primary-btn">Add User</div></div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={jobList}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

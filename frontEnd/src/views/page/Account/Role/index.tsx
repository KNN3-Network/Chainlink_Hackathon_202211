import React, { useState, useEffect } from 'react';
import { Table, Switch } from 'antd';
import './index.scss';

export default function Role() {

  const roleList = [
    {
      id: '1',
      roleNm: 'admin',
      roleDes: 'Master role for enti',
      InsetTm: '2022-04-15 13:50:21',
      modifyTm: '2022-04-15 13:50:21',
      status: '1'
    },
    {
      id: '2',
      roleNm: 'job_viewer',
      roleDes: 'View job status only',
      InsetTm: '2022-04-15 13:50:21',
      modifyTm: '2022-04-15 13:50:21',
      status: '1'
    },
    {
      id: '3',
      roleNm: 'job_editor',
      roleDes: 'Creat, submit, edit',
      InsetTm: '2022-04-15 13:50:21',
      modifyTm: '2022-04-15 13:50:21',
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
      title: 'Role Name', width: 200, dataIndex: 'roleNm', key: 'roleNm', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    { title: 'Role Description', width: 200, dataIndex: 'roleDes', key: 'roleDes', render: (text: string) => <span>{text}</span> },
    {
      title: 'Insert Time', width: 200, dataIndex: 'InsetTm', key: 'InsetTm', render: (text: string, record: any) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'InsetTm', width: 200, dataIndex: 'modifyTm', key: 'modifyTm', render: (text: string, record: any) => (
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
          <span className='edit'>Edit</span>
          <span>Delete</span>

        </span>
    },
  ];

  return (
    <div className="roleStatus">
      <div>
        <div className='title'>Account</div>
        <div className='con'>
          <div><div className="chainlink-primary-btn">Add User</div></div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={roleList}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

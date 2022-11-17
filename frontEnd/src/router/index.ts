
import InstanceUsage from './../views/page/Dashboard/InstanceUsage';
import JobStatus from './../views/page/Dashboard/JobStatus';
import Role from './../views/page/Account/Role';
import User from './../views/page/Account/User';
import JobInitialization from './../views/page/Job/JobInitialization';
import DataPreparation from './../views/page/Job/DataPreparation';
import DataProcessing from './../views/page/Job/DataProcessing';
import DataDelivery from './../views/page/Job/DataDelivery';

export const routerConfig = [
  {
    name: 'Dashboard',
    path: '/home/dashboard',
    children: [
      {
        name: 'Instance Usage',
        path: '/home/dashboard/instanceUsage',
        component: InstanceUsage,
      },
      {
        name: 'Job Status',
        path: '/home/dashboard/jobStatus',
        component: JobStatus,
      },
    ]
  },
  {
    name: 'Account',
    path: '/home/account',
    children: [
      {
        name: 'Role',
        path: '/home/account/role',
        component: Role,
      },
      {
        name: 'User',
        path: '/home/account/user',
        component: User,
      },
    ]
  },
  {
    name: 'Job',
    path: '/home/job',
    children: [
      {
        name: 'Job Initialization',
        path: '/home/job/jobInitialization',
        component: JobInitialization,
      },
      {
        name: 'Data Preparation',
        path: '/home/job/dataPreparation',
        component: DataPreparation,
      },
      {
        name: 'Data Processing',
        path: '/home/job/dataProcessing',
        component: DataProcessing,
      },
      {
        name: 'Data Delivery',
        path: '/home/job/dataDelivery',
        component: DataDelivery,
      },
    ]
  }
];

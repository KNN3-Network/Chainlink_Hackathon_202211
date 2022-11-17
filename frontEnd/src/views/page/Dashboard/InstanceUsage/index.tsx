import { useState } from 'react';
import './index.scss';
import ChartLine from "./../components/LineEchart";

const tabs = [
  {
    name: "Today",
    value: 0,
  },
  {
    name: "Yesterday",
    value: 1,
  },
  {
    name: "Current Week",
    value: 2,
  },
  {
    name: "Current Month",
    value: 3,
  },
  {
    name: "Current Year",
    value: 4,
  },
  {
    name: "Last Year",
    value: 5,
  },
  {
    name: "Start Date Time - End Date Time",
    value: 6,
  },
];

export default function InstanceUsage() {

  const [activeTabVal, setActiveTabVal] = useState(0);

  const [optionsData, ] = useState([]);

  return (
    <div className="instanceUsage">
      <div className='title_1'>Account Monitor</div>
      <div className='con_1'>
        <div className='title_2'>Key Usage</div>
        <div className='tabs'>
          {
            tabs.map((t: any, i: number) =>
              <div key={i} className={activeTabVal === i ? 'active' : ''} onClick={() => setActiveTabVal(i)}>{t.name}</div>
            )
          }
        </div>
        <div className='echart'>
          <ChartLine
            id="chart-bar"
            optionsData={optionsData}
            width={'100%'}
            height={'100%'}
          />
        </div>
      </div>
      <div className='con_2'>
        <div className='title_2'>Key Usage</div>
        <div className='con_bar'>
          <div>
            <div className='des'>
              <div>Instance A</div>
              <div>15 Service</div>
            </div>
          </div>
          <div>
          <div className='des'>
              <div>Instance B</div>
              <div>3 Service</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

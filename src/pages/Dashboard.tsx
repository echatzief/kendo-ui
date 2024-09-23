import { useState } from 'react';
import { TileLayout, TileLayoutRepositionEvent } from '@progress/kendo-react-layout';
import { ArcGauge } from '@progress/kendo-react-gauges';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid'
import DrawerContainer from '@/components/DrawerContainer';

const colors = [
  {
    color: '#0058e9',
  },
];

const ArcGaugeComponent = () => {
  const [value] = useState(50);

  const arcOptions = {
    value: value,
    colors,
  };
  const arcCenterRenderer = (value: number, color: string) => {
    return (
      <h3
        style={{
          color: color,
        }}
      >
        {value}%
      </h3>
    );
  };
  return <div style={{
    height: '150px',
  }}>
    <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />
  </div>;
};

const tiles = [
  {
    defaultPosition: {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Tasks On Track',
    body: <div className="dashboard-card-content">
      <p className="dashboard-card-content-number green">22</p>
      <div>
        <p className="footer">
          In Backlog: 43
        </p>
      </div>
    </div>,

  },
  {
    defaultPosition: {
      col: 2,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Overdue Tasks',
    body: <div className="dashboard-card-content">
      <p className="dashboard-card-content-number red">7</p>
      <div>
        <p className="footer">
          From Yesterday: 16
        </p>
      </div>
    </div>,
  },
  {
    defaultPosition: {
      col: 3,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Issues',
    body: <div className="dashboard-card-content">
      <p className="dashboard-card-content-number orange">47</p>
      <div>
        <p className="footer">
          Closed By Team 15
        </p>
      </div>
    </div>,
  },
  {
    defaultPosition: {
      col: 4,
      colSpan: 1,
      rowSpan: 1,
    },
    header: 'Used Space',
    body: <div className="gauge-div">
      <ArcGaugeComponent />
      <p className="gauge-footer">
        Closed By Team 15
      </p>
    </div>,


  },
];

const Dashboard = () => {
  const [data, setData] = useState([
    {
      col: 1,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 2,
      rowSpan: 3,
    },
  ]);

  const secondSectionTiles = [
    {
      body: <DashboardChart />,
    },
    {
      header: 'MK Team',
      body: <DashboardGrid />,
    },
  ];

  const handleReposition = (e: TileLayoutRepositionEvent) => setData(e.value);

  return (
    <DrawerContainer>
      <div style={{ marginTop: '40px'}}>
        <div className="greeting">
          Hello again, John!
        </div>

        <TileLayout columns={4} items={tiles} rowHeight={230} />

        <TileLayout
          columns={2}
          rowHeight={255}
          positions={data}
          gap={{
            rows: 10,
            columns: 10,
          }}
          items={secondSectionTiles}
          onReposition={handleReposition}
        />
      </div>
    </DrawerContainer>
  );
};



export default Dashboard;
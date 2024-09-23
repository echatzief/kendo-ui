import { useState } from 'react';
import { TileLayout, TileLayoutRepositionEvent } from '@progress/kendo-react-layout';
import SalesRevenueChart from '@/components/performance/SalesRevenueChart';
import ConversionsChart from '@/components/performance/ConversionsChart';
import PerformanceChart from '@/components/performance/PerformanceChart';
import TopFiveCitiesGlobal from '@/components/performance/TopFiveCitiesGlobal';
import CostBreakdownChart from '@/components/performance/CostBreakdownChart';
import DrawerContainer from '@/components/DrawerContainer';

const Performance = () => {
  const [data, setData] = useState([
    {
      col: 1,
      colSpan: 4,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      col: 4,
      colSpan: 2,
      rowSpan: 2,
    },
    {
      col: 3,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      col: 2,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      col: 1,
      colSpan: 1,
      rowSpan: 1,
    },
  ]);
  const tiles = [
    {
      header: 'Sales Revenue',
      body: <SalesRevenueChart />,
    },
    {
      header: 'Users',
      body: (
        <div>
          <ConversionsChart />
        </div>
      ),
    },
    {
      header: 'Top 5 Cities',
      body: <TopFiveCitiesGlobal />,
    },
    {
      header: 'Performance',
      body: <PerformanceChart />,
    },

    {
      header: 'Top 5 Cities Global',
      body: <TopFiveCitiesGlobal />,
    },
    {
      header: 'Cost Breakdown',
      body: (
        <div>
          <CostBreakdownChart />
        </div>
      ),
    },
  ];

  const handleReposition = (e: TileLayoutRepositionEvent) => setData(e.value);

  return (
    <DrawerContainer>
      <div>
        <div style={{ marginTop: '40px' }}>
          <TileLayout
            columns={4}
            rowHeight={255}
            positions={data}
            gap={{
              rows: 8,
              columns: 8,
            }}
            items={tiles}
            onReposition={handleReposition}
          />
        </div>
      </div>
    </DrawerContainer>
  );
};

export default Performance;
import { useState } from 'react';
import { TileLayout, TileLayoutRepositionEvent } from '@progress/kendo-react-layout';
import UserForm from "@/components/settings/UserForm";
import Date from "@/components/settings/Date";
import Weather from '@/components/settings/Weather';
import IconHeader from "@/components/settings/IconHeader";
import DrawerContainer from "@/components/DrawerContainer";

const Settings = () => {
  const [data, setData] = useState([
    {
      col: 1,
      colSpan: 3,
      rowSpan: 4,
    },
    {
      col: 4,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      col: 4,
      colSpan: 4,
      rowSpan: 2,
    },
  ]);

  const tiles = [
    {
      body: <UserForm />,
      reorderable: false
    },
    {
      header: 'Date',
      body: <Date />,
      reorderable: false

    },
    {
      header: <IconHeader />,
      body: <Weather />,
      reorderable: false

    },
  ];

  const handleReposition = (e: TileLayoutRepositionEvent) => setData(e.value);

  return (
    <DrawerContainer>
      <div>
        <div style={{ marginTop: '40px'}}>

          <TileLayout
            columns={5}
            rowHeight={300}
            positions={data}
            gap={{
              rows: 12,
              columns: 12,
            }}
            items={tiles}
            onReposition={handleReposition}
          />
        </div>
      </div>
    </DrawerContainer>
  )
}

export default Settings;
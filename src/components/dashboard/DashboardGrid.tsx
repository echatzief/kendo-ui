import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Input, Rating } from '@progress/kendo-react-inputs';
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
  GridToolbar,
  GRID_COL_INDEX_ATTRIBUTE,
} from '@progress/kendo-react-grid';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import firstTeam from '@/data/firstTeam.json';
import { process, DataResult, State } from '@progress/kendo-data-query';
import { getter, SvgIcon } from '@progress/kendo-react-common';
import { useTableKeyboardNavigation } from '@progress/kendo-react-data-tools';
import { fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import PeopleIcon from '@/assets/joey.png';
import { cloneElement, useCallback, useState } from 'react';

const DATA_ITEM_KEY = 'PersonID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

interface Person {
  PersonID: number;
  FullName: string;
  JobTitle: string;
  Rating: number;
  Budget: number;
  selected?: boolean;
}

export const DashboardGrid = () => {
  const [isFirstTeam, setIsFirstTeam] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<string>('');
  const [_, setPerson] = useState<string>('Joey.png');
  const [filteredSampleProducts, setFilteredSampleProducts] = useState<Person[]>(firstTeam);
  const [dataState, setDataState] = useState<State>({ take: 5, skip: 0 });
  const [dataResult, setDataResult] = useState<DataResult>(
    process(
      firstTeam.map((dataItem) =>
        Object.assign(
          {
            selected: false,
          },
          dataItem
        )
      ),
      dataState
    )
  );
  const [selectedState, setSelectedState] = useState<Record<number, boolean>>({});

  const onSelectionChange = useCallback(
    (event: any) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState as any);
    },
    [selectedState]
  );

  const onFilterChange = (ev: any) => {
    const value = ev.value;
    setFilterValue(value);
    const newData = firstTeam.filter((item: any) => {
      let match = false;
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }
        if (
          item[property].toLocaleDateString &&
          item[property].toLocaleDateString().indexOf(value) >= 0
        ) {
          match = true;
        }
      }
      return match;
    });

    setFilteredSampleProducts(newData);
    const clearedPagerDataState = { ...dataState, take: dataState.take, skip: 0 };
    const processedData = process(newData, dataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
  };

  const getHighlight = (value: string, filter: string): JSX.Element | string => {
    const index = value.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase());
    if (index >= 0) {
      const left = value.substr(0, index);
      const right = value.substring(index + filter.length, value.length);
      return (
        <>
          {left}
          <span className="highlight">{value.substr(index, filter.length)}</span>
          {getHighlight(right, filter)}
        </>
      );
    }
    return value;
  };

  const cellRender = useCallback(
    (td: any, props: any) => {
      const value = td.props.children;
      if (
        filterValue &&
        filterValue.length > 0 &&
        value.substr &&
        value.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) >= 0
      ) {
        const children = getHighlight(value, filterValue.toLocaleLowerCase());
        return cloneElement(td, [props], [children]);
      }
      return td;
    },
    [filterValue]
  );

  const onHeaderSelectionChange = useCallback((event: any) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState: Record<number, boolean> = {};
    event.dataItems.forEach((item: any) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const dataStateChange = (event: any) => {
    setDataResult(process(filteredSampleProducts, event.dataState));
    setDataState(event.dataState);
  };

  const RatingCell = (props: any) => {
    const field = props.field || '';
    const value = props.dataItem[field];
    return (
      <td>
        <Rating
          value={value === null ? '' : value.toString()}
          readonly={true}
          style={{
            height: '100px',
          }}
        />
      </td>
    );
  };

  const PersonCell = (props: any) => {
    const field = props.field || '';
    const value = props.dataItem[field];

    return (
      <td>
        <img src={PeopleIcon} alt="Person icon" width="34" height="34" />
        <span className="person-name">
          {value === null ? '' : value.toString()}
        </span>
      </td>
    );
  };

  const BudgetCell = (props: any) => {
    const field = props.field || '';
    const value = props.dataItem[field];
    const navigationAttributes = useTableKeyboardNavigation(props.id);
    return (
      <td
        style={{
          color: value > 0 ? props.myProp[0].color : props.myProp[1].color,
        }}
        colSpan={props.colSpan}
        role={'gridcell'}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        {...{
          [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex,
        }}
        {...navigationAttributes}
      >
        ${value === null
          ? ''
          : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </td>
    );
  };

  const customData = [{ color: '' }, { color: 'red' }];
  const CustomBudgetCell = (props: any) => <BudgetCell {...props} myProp={customData} />;

  let _pdfExport: GridPDFExport | null = null;
  const exportExcel = () => {
    _export?.save();
  };
  let _export: ExcelExport | null = null;

  const exportPDF = () => {
    _pdfExport?.save();
  };

  const firstTeamOnClick = useCallback(() => {
    setIsFirstTeam(true);
    setPerson('Joey.png');
  }, []);

  const secondTeamOnClick = useCallback(() => {
    setIsFirstTeam(false);
    setPerson('BaseAvatar.png');
  }, []);

  return (
    <div className="grid-container">
      <div className="card-buttons card-buttons-parent">
        <ButtonGroup>
          <Button togglable={true} selected={isFirstTeam} onClick={firstTeamOnClick}>
            My Team
          </Button>
          <Button togglable={true} selected={!isFirstTeam} onClick={secondTeamOnClick}>
            All Teams
          </Button>
        </ButtonGroup>
      </div>

      <ExcelExport
        data={firstTeam}
        ref={(exporter) => {
          _export = exporter;
        }}
      >
        <Grid
          sortable={true}
          cellRender={cellRender}
          data={dataResult.data.map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
          total={dataResult.total}
          {...dataState}
          onDataStateChange={dataStateChange}
          pageable={true}
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
            drag: false,
            cell: false,
            mode: 'multiple',
          }}
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
        >
          <GridToolbar className="toolbar">
            <div>
              <span>
                <Input
                  value={filterValue}
                  onChange={onFilterChange}
                  style={{
                    border: '2px solid #ccc',
                    boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.1)',
                    width: '200px',
                    height: '24px',
                  }}
                  placeholder="Search in all columns"
                />
              </span>
              <div className="export-buttons-container">
                <button
                  title="Export to Excel"
                  className="k-grid-excel k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={exportExcel}
                >
                  <SvgIcon icon={fileExcelIcon} />
                  <span> Export to Excel </span>
                </button>
                &nbsp;
                <button
                  className="k-grid-pdf k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={exportPDF}
                >
                  <SvgIcon icon={filePdfIcon} />
                  <span> Export to PDF </span>
                </button>
              </div>
            </div>
          </GridToolbar>
          <Column
            field={SELECTED_FIELD}
            width="50px"
            headerSelectionValue={
              dataResult.data.findIndex(
                (item) => !selectedState[idGetter(item)]
              ) === -1
            }
          />
         <Column field="FullName" title="Contact Name" cell={PersonCell} />
          <Column field="JobTitle" title="Job Title" />
          <Column field="Rating" title="Rating" cell={RatingCell} width="300px" />
          <Column field="Budget" title="Budget" cell={CustomBudgetCell} />
        </Grid>
      </ExcelExport>
      <GridPDFExport
        ref={(element) => {
          _pdfExport = element;
        }}
        margin="1cm"
      >
        <Grid
          data={process(firstTeam, {
            skip: dataState.skip,
            take: dataState.take,
          })}
        >
          <Column field="FullName" title="Contact Name" cell={PersonCell} />
          <Column field="JobTitle" title="Job Title" />
          <Column field="Rating" title="Rating" cell={RatingCell} width="300px" />
          <Column field="Budget" title="Budget" cell={CustomBudgetCell} />
        </Grid>
      </GridPDFExport>
    </div>
  );
};

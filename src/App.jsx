import './App.css';
import {useMemo} from  'react'
import { useDispatch} from 'react-redux'
import DemoTable from './components/Table/index';
import {columns,dataSource,dictionaryLocal} from './data'
import useSipPoolRedux from './hooks/useSipPoolRedux'
import { setSipPoolFilterInfo} from './store/sipPool/index'
import TableFilterContainer from './components/TableContainer/index'
const App=() =>{
  const { tableFilteredInfo } =useSipPoolRedux();
  const dispatch = useDispatch();
  const filterInfos = useMemo(() => {
    return [
      {
        title: '',
        name: 'sipPool',
        dataIndexDictionary: dictionaryLocal,
        filters: tableFilteredInfo,
        tagKeyName: 'sip_pool_tags',
      },
    ];
  }, [tableFilteredInfo]);
  const tableChange= (_, scopeFilter) => {
    dispatch(
      setSipPoolFilterInfo({
        ...tableFilteredInfo,
        ...(scopeFilter ),
      })
    );
  };
  const generateNewFilter = (info, filterKey) => {
    let newFilter = {
      ...info,
    };
    if (filterKey) {
      newFilter[filterKey] = [];
    } else {
      newFilter = {};
    }
    return newFilter;
  };

  const removeFilter = (_, filterKey) => {
    dispatch(
      setSipPoolFilterInfo(generateNewFilter(tableFilteredInfo, filterKey))
    );
  };

  const clearAllFilter = () => {
    dispatch(setSipPoolFilterInfo({}));
  };
  const getFilterData=()=>{
    return {
      sip:['10.12.16.1','10.12.16.2'],
      used_by:['mysql-1','未使用']
    }
  }
  return (
    
    <div className="App">
      <DemoTable 
      name="demo_table"  
      dataSource={dataSource} 
      columns={columns}  
      refreshWhenDropdownOpen={true}
      filteredInfo={tableFilteredInfo}
      filterOptionFactory={getFilterData}
      onChange={tableChange}
      />
      <TableFilterContainer 
       filterInfos={filterInfos}
       removeFilter={removeFilter}
       clearAllFilter={clearAllFilter}
     />
    </div>
   
  );
}

export default App;

import ProTable from "@ant-design/pro-table"
import { useMemo } from "react"
import useCustomFilter from "./hooks/useCustomFilter"
import useFilteredInfo from "./hooks/useFilteredInfo"
import './index.less'
const DemoTable=(props)=>{
  const {dataSource,columns, filteredInfo, filterOptionFactory,name,columnsState,refreshWhenDropdownOpen,...others}=props
  const {generateFilter,filterOptionContainer}=useCustomFilter({ filterOptionFactory,refreshWhenDropdownOpen})
  const {createFilterInfoFlag}=useFilteredInfo(filteredInfo||{})
  const innerColumns=useMemo(()=>{
    let temp = generateFilter(columns);
    temp = createFilterInfoFlag(temp);
    return [...temp]
  },[columns,filteredInfo,generateFilter,filterOptionContainer])
  return (
    <>
    <ProTable       
      columnsState={{
        persistenceType: 'localStorage',
        persistenceKey: name,
        ...columnsState,
      }}
      dataSource={dataSource} 
      columns={innerColumns} 
      search={false} 
      size="small"
      className='action-sky-table'
      {...others}
     />
    </>
  )
}
export default DemoTable
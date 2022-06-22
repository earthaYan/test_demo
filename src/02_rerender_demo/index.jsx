import { useEffect, useState } from "react"
import DemoTable from "../components/Table"
import { columns, originData } from "./data.jsx"

const RenderTableDemo=()=>{
  const [dataSource,setDataSource]=useState(originData)
  const handleInputChange=(e,record)=>{
    const list =[...dataSource];
    const index = list.findIndex(
      (item) =>
        item.ip === record.ip && item.db_port === record.db_port
    );
    list[index].host_name = e.target.value;
    setDataSource(list);
  }
  useEffect(()=>{
    console.log(dataSource)
  },[dataSource])
  return (
  <>
  <DemoTable name="demo_table2" rowKey="ip" columns={columns(handleInputChange)}  dataSource={dataSource}/>
  </>)
}
export default RenderTableDemo
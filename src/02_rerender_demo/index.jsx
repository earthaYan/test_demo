import { useState } from "react"
import DemoTable from "../components/Table"
import { columns, originData } from "./data.jsx"
import {Button} from 'antd'
import { cloneDeep } from "lodash"


const RenderTableDemo=()=>{
  const [dataSource,setDataSource]=useState(originData)
  
  const handleInputChange=(e,record)=>{
    const list =[...dataSource];
    const index = list.findIndex(
      (item) =>
        item.ip === record.ip && item.host_name === record.host_name
    );
    list[index].host_name = e.target.value;
    setDataSource(list);
  }
  const batchUpdate=async ()=>{
    const list =cloneDeep([...dataSource])
    list.forEach((item) => {
      item.host_name =
        'server_' + item.ip + '_' + Math.random();
    });
    setDataSource([...list])
  }

  return (
  <>
  <Button onClick={batchUpdate}>批量修改</Button>
  <DemoTable name="demo_table2" rowKey={(record)=>`${record.ip}`} columns={columns(handleInputChange)}  
  dataSource={dataSource}/>
  </>)
}
export default RenderTableDemo
import React from 'react'

import DemoTable from "../components/Table"
import { columns, originData } from "./data.jsx"
import {Button} from 'antd'
class  RenderTableDemo extends React.PureComponent{
  constructor(){
    super()
    this.handleInputChange=this.handleInputChange.bind(this)
    this.batchUpdate=this.batchUpdate.bind(this)
  }
  state={
    dataSource:originData
  }
  handleInputChange(e,record){
    const list =[...this.state.dataSource];
    const index = list.findIndex(
      (item) =>
        item.ip === record.ip && item.host_name === record.host_name
    );
    list[index].host_name = e.target.value;
    this.setState({
      dataSource:list
    })
  }
  batchUpdate(){
    const list =[...this.state.dataSource];
    list.forEach((item) => {
      item.host_name =
        'server_' + item.ip + '_' + Math.random();
    });
    this.setState({
      dataSource:[]
    },()=>{
     this.setState({
      dataSource:list
     })
     })
  }
  
  render(){
    return (
      <>
      <Button onClick={this.batchUpdate}>批量修改</Button>
      <DemoTable name="demo_table2" rowKey={(record)=>`${record.ip}`} columns={columns(this.handleInputChange)}  dataSource={this.state.dataSource}/>
      </>)
  }
}
export default RenderTableDemo
import {Input} from 'antd'
export const columns = (handleChange) => [
  {
    dataIndex: 'ip',
    title: 'ip',
    key:'ip'
  },
  {
    dataIndex: 'host_name',
    title: '主机名',
    key:'host_name',
    render: (_, record) => {
      return <Input defaultValue={record.host_name} onChange={(e)=>handleChange(e,record)}/>
    },
  },
];
export const originData=[{
  ip:'1233',
  host_name:'h1'
},{
  ip:'1',
  host_name:'h2'
}]

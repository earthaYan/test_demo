import {Input} from 'antd'
export const columns = (handleChange) => [
  {
    dataIndex: 'ip',
    title: 'ip',
  },
  {
    dataIndex: 'host_name',
    title: '主机名',
    render: (_, record) => {
      return <Input defaultValue={record.ip} onChange={handleChange}/>
    },
  },
];
export const originData=[{
  ip:'1233',
},{
  ip:'1',
}]

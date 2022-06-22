export const columns = [
  {
    dataIndex: 'sip',
    title: 'sip',
    filterCustom: 'select',
  },
  {
    dataIndex: 'mask',
    title: '子网掩码',
  },
  {
    dataIndex: 'used_by',
    title: '使用情况',
    filterCustom: 'select',
  },
];
export const dataSource = [
  { sip: '1', used_by: '未使用' },
  { sip: '2', used_by: '未使用', mask: 12 },
];
export const dictionaryLocal = {
  sip: 'SIP',
  used_by: '使用情况',
};

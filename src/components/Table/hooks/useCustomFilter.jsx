import { useState,useEffect } from "react";
import {Space,Row,Select,Button} from 'antd'
export const turnFilterOptionDataToObjectArr = (
  options
) => {
  return options.map((item) => {
    if (typeof item === 'string') {
      return { text: item, value: item };
    }
    return item;
  });
};
export const generateSelectFilter = (
  options,
  isMultiple = false
) => {
  const optionsMap = turnFilterOptionDataToObjectArr(options);
  return ({ setSelectedKeys, selectedKeys, confirm }) => {
    return (
      <Space direction="vertical" style={{ padding: 8 }}>
        <Row>
          <Select
            style={{ width: 200 }}
            mode={isMultiple ? 'multiple' : undefined}
            value={isMultiple ? selectedKeys : selectedKeys[0]}
            allowClear={true}
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ width: 150, minWidth: 150 }}
            showSearch={true}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setSelectedKeys(value);
              } else {
                setSelectedKeys(value ? [value] : []);
              }
            }}
          >
            {optionsMap.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <Row justify="end">
          <Space>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                confirm();
              }}
            >
             确定
            </Button>
          </Space>
        </Row>
      </Space>
    );
  };
};
 const useCustomFilter=(options)=>{
   const {filterOptionFactory,refreshWhenDropdownOpen}=options
   const [filterOptionContainer,setFilterOptionContainer]=useState({})
   const getFilterOptionContainer = async () => {
    if (!filterOptionFactory) {
      setFilterOptionContainer({});
      return;
    }
    const temp = await options.filterOptionFactory();
    setFilterOptionContainer(temp ?? {});
  };
  useEffect(() => {
    getFilterOptionContainer();
  }, []);
  const getSelectOption = (key)=> {
    if (!options || !key) {
      return [];
    }
    let realKey = key;
    return filterOptionContainer[realKey] ?? [];
  };
  const createSelectFilter =(
    column,
    isMultiple = false
  )=> {
    const optionData = getSelectOption(String(column.dataIndex));
    // 设置自定义的列筛选功能
    column.filterDropdown = generateSelectFilter(optionData, isMultiple);
    return column;
  };
  const generateFilter=(columns)=>{
    for (let i = 0; i < columns.length; i++) {
      const columnItem=columns[i];
      if ('children' in columnItem && !!columnItem.children) {
        columns[i].children = generateFilter(columnItem.children);
        continue;
      }
      if(columnItem.filterCustom&&columnItem.filterCustom==='select'){
        columns[i] = createSelectFilter(columnItem, false);
      }
      if (columnItem.filterCustom !== 'tag') {
        const tempVisibleChange = columnItem.onFilterDropdownVisibleChange;
        columnItem.onFilterDropdownVisibleChange = (visible) => {
          if (visible && refreshWhenDropdownOpen) {
            getFilterOptionContainer();
          } else if (typeof tempVisibleChange === 'function') {
            tempVisibleChange(visible);
          }
        };
      }
    }
    return columns
  }
  return {
    generateFilter,
    filterOptionContainer
  }
}
export default useCustomFilter
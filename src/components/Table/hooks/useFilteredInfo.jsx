

const useFilteredInfo = (filteredInfo) => {
  const createFilterInfoFlag = (
    columns
  )=> {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.children) {
        column.children = createFilterInfoFlag(column.children);
        continue;
      }
      if (column.dataIndex && filteredInfo[String(column.dataIndex)]&&filteredInfo[String(column.dataIndex)].length) {
        column.filteredValue = filteredInfo[String(column.dataIndex)];
      } else {
        column.filteredValue = null;
      }
    }
    return columns;
  };

  return {
    createFilterInfoFlag,
  };
};

export default useFilteredInfo;

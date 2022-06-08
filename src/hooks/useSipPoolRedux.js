import { useSelector, shallowEqual } from 'react-redux';

const useSipPoolRedux = () => {
  const reduxState = useSelector(
    (state) => ({
      tableFilteredInfo: state.sipPool.tableFilterInfo,
    }),
    shallowEqual
  );

  return {
    ...reduxState,
  };
};

export default useSipPoolRedux;

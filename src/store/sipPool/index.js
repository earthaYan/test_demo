import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tableFilterInfo: {},
};

const sipPool = createSlice({
  name: 'sipPool',
  initialState,
  reducers: {
    setSipPoolFilterInfo: (state, action) => {
      state.tableFilterInfo = action.payload;
    },
  },
});

export const { setSipPoolFilterInfo } = sipPool.actions;

export default sipPool.reducer;

import { configureStore } from '@reduxjs/toolkit';

import sipPool from './sipPool/index';
const store = configureStore({
  reducer: {
    sipPool,
  },
});

export default store;

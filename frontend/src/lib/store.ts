import { configureStore } from '@reduxjs/toolkit';

import { coinzApi } from '@/lib/services/coinzApi';
import { counterReducer } from '@/lib/store/counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      // Add the generated reducer as a specific top-level slice
      [coinzApi.reducerPath]: coinzApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinzApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

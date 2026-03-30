
import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './root-reducer';
import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (__DEV__) {
      middleware.push(logger as Middleware);
    }
    return middleware;
  },
  devTools: __DEV__,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export default store;

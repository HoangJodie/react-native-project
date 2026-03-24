import { combineReducers } from '@reduxjs/toolkit';
import { productReducer as apiReducer, filterReducer } from '../features/product/slice';
import { authReducer } from '../features/auth/slice';

const rootReducer = combineReducers({
    api: apiReducer,
    filters: filterReducer,
    auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

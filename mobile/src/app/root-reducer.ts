import { combineReducers } from '@reduxjs/toolkit';
import { productReducer as apiReducer, filterReducer } from '../modules/product/slice';
import { authReducer } from '../modules/auth/slice';
import { profileReducer } from '../modules/profile/slice';

const rootReducer = combineReducers({
    api: apiReducer,
    filters: filterReducer,
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

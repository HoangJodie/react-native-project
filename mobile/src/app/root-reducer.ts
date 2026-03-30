import { combineReducers } from '@reduxjs/toolkit';
import { productFilterReducer } from '../modules/product/slice';
import { authReducer } from '../modules/auth/slice';
import { profileReducer } from '../modules/profile/slice';

const rootReducer = combineReducers({
    productFilters: productFilterReducer,
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

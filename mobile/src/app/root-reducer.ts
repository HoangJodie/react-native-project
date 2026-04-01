import { combineReducers } from '@reduxjs/toolkit';
import { productFilterReducer } from '../features/product/slice';
import { authReducer } from '../features/auth/slice';
import { profileReducer } from '../features/profile/slice';
import { checkoutReducer } from '../features/checkout/store';

const rootReducer = combineReducers({
    productFilters: productFilterReducer,
    auth: authReducer,
    profile: profileReducer,
    checkout: checkoutReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

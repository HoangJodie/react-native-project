import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PriceUnit } from './type';
import type { RootState } from '../../app/root-reducer';

export interface ProductFiltersState {
    searchTerm: string;
    priceUnit?: PriceUnit;
}

const initialState: ProductFiltersState = {
    searchTerm: '',
    priceUnit: undefined,
};

const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setPriceUnit(state, action: PayloadAction<PriceUnit | undefined>) {
            state.priceUnit = action.payload;
        },
        resetFilters: () => initialState,
    },
});

export const { setSearchTerm, setPriceUnit, resetFilters } = productFiltersSlice.actions;

export const selectProductFilters = (state: RootState) => state.productFilters;
export const selectSearchTerm = (state: RootState) => state.productFilters.searchTerm;
export const selectPriceUnit = (state: RootState) => state.productFilters.priceUnit;

export const productFilterReducer = productFiltersSlice.reducer;

export default productFiltersSlice;

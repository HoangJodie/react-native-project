import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceUnit, Product } from './type';
import { productService } from './api';

interface ApiState {
    data: Product[];
    loading: boolean;
    error: string | null;
}

const initialApiState: ApiState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchApiData = createAsyncThunk('product/fetchApiData', async () => {
    const response = await productService.list();
    return response;
});

const apiSlice = createSlice({
    name: 'api',
    initialState: initialApiState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApiData.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchApiData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Unable to load data';
            });
    },
});

interface FiltersState {
    searchTerm: string;
    priceUnit?: PriceUnit;
}

const initialFiltersState: FiltersState = {
    searchTerm: '',
    priceUnit: undefined,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState: initialFiltersState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setPriceUnit(state, action: PayloadAction<PriceUnit | undefined>) {
            state.priceUnit = action.payload;
        },
        resetFilters() {
            return initialFiltersState;
        },
    },
});

export const { setSearchTerm, setPriceUnit, resetFilters } = filterSlice.actions;

export const selectApiData = (state: { api: ApiState }) => state.api.data;
export const selectApiLoading = (state: { api: ApiState }) => state.api.loading;
export const selectApiError = (state: { api: ApiState }) => state.api.error;

export const productReducer = apiSlice.reducer;
export const filterReducer = filterSlice.reducer;

export default {
    productReducer,
    filterReducer,
};

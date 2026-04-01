import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { productFilterReducer } from '../../slice';
import useProducts from '../useProducts';
import type { Product } from '../../type';
import { useQuery } from '@tanstack/react-query';

jest.mock('../../api', () => ({
    productService: {
        list: jest.fn(),
    },
}));
jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

const { productService } = jest.requireMock('../../api') as {
    productService: { list: jest.Mock };
};
const useQueryMock = useQuery as jest.Mock;

describe('useProducts', () => {
    const createWrapper = () => {
        const store = configureStore({ reducer: { productFilters: productFilterReducer } });
        const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        return { Wrapper, store };
    };

    beforeEach(() => {
        const data: Product[] = [
            { id: 1, name: 'Item 1', description: 'desc1', image: 'img1', price: 10, priceUnit: 'dollar' },
            { id: 2, name: 'Item 2', description: 'desc2', image: 'img2', price: 20, priceUnit: 'euro' },
        ];
        productService.list.mockReturnValue(data);
        useQueryMock.mockImplementation(({ queryFn }: { queryFn: () => Product[] }) => ({
            data: queryFn(),
            isLoading: false,
            isFetching: false,
            isRefetching: false,
            isError: false,
            refetch: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches products on mount', () => {
        const { Wrapper } = createWrapper();
        const { result } = renderHook(() => useProducts(), { wrapper: Wrapper });

        expect(productService.list).toHaveBeenCalledTimes(1);
        expect(result.current.items).toHaveLength(2);
        expect(result.current.error).toBeNull();
    });

    it('updates search term through dispatcher', () => {
        const { Wrapper, store } = createWrapper();
        const { result } = renderHook(() => useProducts(), { wrapper: Wrapper });

        act(() => {
            result.current.setSearchTerm('phone');
        });

        expect(store.getState().productFilters.searchTerm).toBe('phone');
    });
});

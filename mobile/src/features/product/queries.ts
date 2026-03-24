import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from './api';
import { PriceUnit } from './type';
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import { setPriceUnit, setSearchTerm } from './slice';

export const useProducts = () => {
    const dispatch = useAppDispatch();
    const { searchTerm, priceUnit } = useAppSelector((state) => state.filters);

    const query = useQuery({
        queryKey: ['products', { searchTerm, priceUnit }],
        queryFn: () =>
            productService.list({
                name: searchTerm || undefined,
                priceUnit,
            }),
        staleTime: 60_000,
    });

    const handleSearch = useCallback((value: string) => {
        dispatch(setSearchTerm(value));
    }, [dispatch]);

    const handlePriceUnit = useCallback((unit?: PriceUnit) => {
        dispatch(setPriceUnit(unit));
    }, [dispatch]);

    return useMemo(
        () => ({
            items: query.data ?? [],
            loading: query.isLoading,
            fetching: query.isFetching,
            refreshing: query.isRefetching,
            error: query.isError ? 'Unable to load products. Please try again.' : null,
            searchTerm,
            priceUnit,
            setSearchTerm: handleSearch,
            setPriceUnit: handlePriceUnit,
            refetch: query.refetch,
        }),
        [
            query.data,
            query.isLoading,
            query.isFetching,
            query.isError,
            searchTerm,
            priceUnit,
            handleSearch,
            handlePriceUnit,
            query.isRefetching,
            query.refetch,
        ]
    );
};

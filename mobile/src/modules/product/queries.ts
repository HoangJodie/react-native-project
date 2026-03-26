import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from './api';
import { PriceUnit, Product, ProductReview } from './type';
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

export const useProductDetail = (productId: number, initialProduct?: Product) => {
    const productQuery = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.get(productId),
        initialData: initialProduct,
        staleTime: 60_000,
    });

    const reviewQuery = useQuery({
        queryKey: ['product', productId, 'reviews'],
        queryFn: () => productService.reviews(productId),
        staleTime: 60_000,
    });

    const avgRating =
        reviewQuery.data && reviewQuery.data.length
            ? reviewQuery.data.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewQuery.data.length
            : null;

    return {
        product: productQuery.data,
        productLoading: productQuery.isLoading,
        productRefetch: productQuery.refetch,
        reviews: (reviewQuery.data ?? []) as ProductReview[],
        reviewsLoading: reviewQuery.isLoading,
        reviewsRefetch: reviewQuery.refetch,
        rating: avgRating,
        reviewCount: reviewQuery.data?.length ?? 0,
    };
};

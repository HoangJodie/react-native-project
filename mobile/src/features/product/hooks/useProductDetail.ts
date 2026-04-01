import { useQuery } from '@tanstack/react-query';
import { productService } from '../api';
import type { Product, ProductReview } from '../type';

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

export default useProductDetail;

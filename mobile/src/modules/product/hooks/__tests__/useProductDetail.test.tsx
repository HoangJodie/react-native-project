import { renderHook } from '@testing-library/react-hooks';
import { useProductDetail } from '../useProductDetail';
import { useQuery } from '@tanstack/react-query';

jest.mock('../../api', () => ({
    productService: {},
}));
jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

describe('useProductDetail', () => {
    const useQueryMock = useQuery as jest.Mock;

    beforeEach(() => {
        useQueryMock
            .mockReturnValueOnce({
                data: {
                    id: 1,
                    name: 'Item 1',
                    description: 'desc',
                    image: 'img',
                    price: 10,
                    priceUnit: 'dollar',
                },
                isLoading: false,
                refetch: jest.fn(),
            })
            .mockReturnValueOnce({
                data: [
                    { id: 1, productId: 1, userId: 1, rating: 4, message: 'good' },
                    { id: 2, productId: 1, userId: 2, rating: 2, message: 'ok' },
                ],
                isLoading: false,
                refetch: jest.fn(),
            });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns product detail and aggregates reviews', () => {
        const { result } = renderHook(() => useProductDetail(1));

        expect(useQueryMock).toHaveBeenCalledTimes(2);
        expect(result.current.product?.name).toBe('Item 1');
        expect(result.current.reviews).toHaveLength(2);
        expect(result.current.rating).toBe(3);
        expect(result.current.reviewCount).toBe(2);
        expect(result.current.productLoading).toBe(false);
        expect(result.current.reviewsLoading).toBe(false);
    });
});

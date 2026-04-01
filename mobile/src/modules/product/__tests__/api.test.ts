import { productService } from '../api';
import apiClient from '../../../shared/lib/apiClient';

jest.mock('../../../shared/lib/apiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe('productService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should call get with all params when provided', async () => {
            const params = { name: 'test', priceUnit: 'dollar' as const };
            (apiClient.get as jest.Mock).mockResolvedValue([]);

            await productService.list(params);

            expect(apiClient.get).toHaveBeenCalledWith('/product', { params });
        });

        it('should filter out undefined and null params', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue([]);

            await productService.list({ name: 'test', priceUnit: undefined as any, notAParam: null as any });

            expect(apiClient.get).toHaveBeenCalledWith('/product', { params: { name: 'test' } });
        });

        it('should filter out empty string params', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue([]);

            await productService.list({ name: '', priceUnit: 'dollar' as const });

            expect(apiClient.get).toHaveBeenCalledWith('/product', { params: { priceUnit: 'dollar' } });
        });

        it('should call with empty params when no params provided', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue([]);

            await productService.list();

            expect(apiClient.get).toHaveBeenCalledWith('/product', { params: {} });
        });

        it('should return product array', async () => {
            const mockProducts = [{ id: 1, name: 'Product 1' }];
            (apiClient.get as jest.Mock).mockResolvedValue(mockProducts);

            const result = await productService.list();

            expect(result).toEqual(mockProducts);
        });
    });

    describe('get', () => {
        it('should call correct url with product id', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({});

            await productService.get(1);

            expect(apiClient.get).toHaveBeenCalledWith('/product/1');
        });

        it('should return product data', async () => {
            const mockProduct = { id: 1, name: 'Product 1' };
            (apiClient.get as jest.Mock).mockResolvedValue(mockProduct);

            const result = await productService.get(1);

            expect(result).toEqual(mockProduct);
        });

        it('should handle different product ids', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue({});

            await productService.get(123);

            expect(apiClient.get).toHaveBeenCalledWith('/product/123');
        });
    });

    describe('create', () => {
        it('should post new product data', async () => {
            const newProduct = { name: 'New Product', price: 100, priceUnit: 'dollar' as const, description: 'Test', image: 'test.jpg' };
            const mockResponse = { id: 1, ...newProduct };
            (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

            const result = await productService.create(newProduct);

            expect(apiClient.post).toHaveBeenCalledWith('/product', newProduct);
            expect(result).toEqual(mockResponse);
        });

        it('should handle create errors', async () => {
            const error = new Error('Create failed');
            (apiClient.post as jest.Mock).mockRejectedValue(error);

            await expect(productService.create({ name: 'Test', price: 10, priceUnit: 'dollar' as const, description: 'Test', image: 'test.jpg' })).rejects.toThrow('Create failed');
        });
    });

    describe('update', () => {
        it('should put updated product data', async () => {
            const updates = { name: 'Updated Product' };
            const mockResponse = { id: 1, name: 'Updated Product' };
            (apiClient.put as jest.Mock).mockResolvedValue(mockResponse);

            const result = await productService.update(1, updates);

            expect(apiClient.put).toHaveBeenCalledWith('/product/1', updates);
            expect(result).toEqual(mockResponse);
        });

        it('should update with partial product data', async () => {
            const updates = { price: 200 };
            (apiClient.put as jest.Mock).mockResolvedValue({});

            await productService.update(1, updates);

            expect(apiClient.put).toHaveBeenCalledWith('/product/1', updates);
        });

        it('should handle update errors', async () => {
            const error = new Error('Update failed');
            (apiClient.put as jest.Mock).mockRejectedValue(error);

            await expect(productService.update(1, {})).rejects.toThrow('Update failed');
        });
    });

    describe('delete', () => {
        it('should delete product by id', async () => {
            (apiClient.delete as jest.Mock).mockResolvedValue(undefined);

            await productService.delete(1);

            expect(apiClient.delete).toHaveBeenCalledWith('/product/1');
        });

        it('should handle delete errors', async () => {
            const error = new Error('Delete failed');
            (apiClient.delete as jest.Mock).mockRejectedValue(error);

            await expect(productService.delete(1)).rejects.toThrow('Delete failed');
        });
    });

    describe('reviews', () => {
        it('should fetch reviews for product id', async () => {
            const mockReviews = [{ id: 1, productId: 1, userId: 1, rating: 5, message: 'Great!' }];
            (apiClient.get as jest.Mock).mockResolvedValue(mockReviews);

            const result = await productService.reviews(1);

            expect(apiClient.get).toHaveBeenCalledWith('/product/1/review');
            expect(result).toEqual(mockReviews);
        });

        it('should return empty array if no reviews', async () => {
            (apiClient.get as jest.Mock).mockResolvedValue([]);

            const result = await productService.reviews(1);

            expect(result).toEqual([]);
        });

        it('should handle review fetch errors', async () => {
            const error = new Error('Fetch reviews failed');
            (apiClient.get as jest.Mock).mockRejectedValue(error);

            await expect(productService.reviews(1)).rejects.toThrow('Fetch reviews failed');
        });
    });
});

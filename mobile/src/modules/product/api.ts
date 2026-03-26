import apiClient from '../../shared/lib/apiClient';
import { PriceUnit, Product, ProductReview } from './type';

export type ProductQuery = {
    name?: string;
    priceUnit?: PriceUnit;
};

export const productService = {
    async list(params: ProductQuery = {}): Promise<Product[]> {
        const cleanedParams = Object.fromEntries(
            Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        );

        const response = (await apiClient.get<Product[]>('/product', { params: cleanedParams })) as unknown as Product[];
        return response;
    },
    async get(id: number): Promise<Product> {
        const response = (await apiClient.get<Product>(`/product/${id}`)) as unknown as Product;
        return response;
    },
    async create(data: Omit<Product, 'id'>): Promise<Product> {
        const response = (await apiClient.post<Product>('/product', data)) as unknown as Product;
        return response;
    },
    async update(id: number, data: Partial<Product>): Promise<Product> {
        const response = (await apiClient.put<Product>(`/product/${id}`, data)) as unknown as Product;
        return response;
    },
    async delete(id: number): Promise<void> {
        await apiClient.delete(`/product/${id}`);
    },
    async reviews(productId: number): Promise<ProductReview[]> {
        const response = (await apiClient.get<ProductReview[]>(`/product/${productId}/review`)) as unknown as ProductReview[];
        return response;
    },
};

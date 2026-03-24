import { productService } from './api';
import { Product } from './type';

export const createProduct = async (payload: Omit<Product, 'id'>): Promise<Product> => {
    const created = await productService.create?.(payload);
    return created as Product;
};

export const updateProduct = async (id: number, payload: Partial<Product>): Promise<Product> => {
    const updated = await productService.update?.(id, payload);
    return updated as Product;
};

export const deleteProduct = async (id: number): Promise<void> => {
    if (productService.delete) {
        await productService.delete(id);
    }
};

export type PriceUnit = 'dollar' | 'euro' | 'inr';

export interface Product {
    id: number;
    name: string;
    description: string;
    category?: string;
    image: string;
    price: number;
    oldPrice?: number;
    tag?: string;
    isFavorite?: boolean;
    priceUnit: PriceUnit;
}

export interface ProductReview {
    id: number;
    productId: number;
    userId: number;
    rating: number;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}

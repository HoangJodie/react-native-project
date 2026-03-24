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

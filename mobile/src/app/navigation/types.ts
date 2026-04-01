import type { Product } from '../../features/product/type';

export type RootStackParamList = {
    SignIn: undefined;
    Main: undefined;
};

export type ShopStackParamList = {
    Home: undefined;
    ProductDetail: { productId: number; product?: Product };
    Checkout: { product: Product };
};

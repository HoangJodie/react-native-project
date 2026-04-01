// Pages
export { HomeScreen } from './screens/home/home-screen';
export { ProductDetailScreen } from './screens/product/product-detail-screen';
export { default as CategoriesScreen } from './screens/categories/categories-screen';
export { default as SavedScreen } from './screens/saved/saved-screen';

// Components
// Add product-specific components here

// Hooks
export { useProducts, useProductDetail } from './hooks';

// Services
export { productService } from './api';

// Store
export { productFilterReducer } from './slice';
export * from './slice';

// Types
export type { Product, ProductReview, PriceUnit } from './type';
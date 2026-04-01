import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductDetailScreen } from '../product-detail-screen';

jest.mock('../../../hooks/useProductDetail', () => ({
    useProductDetail: jest.fn(),
}));
jest.mock('../../../../../shared/components/TopBar', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text onPress={props.onRightPress} testID="topbar">TopBar</Text>;
});
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const useProductDetail = require('../../../hooks/useProductDetail').useProductDetail as jest.Mock;

const baseRoute = {
    key: 'k',
    name: 'ProductDetail' as const,
    params: { productId: 1, product: { id: 1, name: 'Test Product', price: 10, priceUnit: 'dollar' as const } },
};
const navigation = {
    goBack: jest.fn(),
    navigate: jest.fn()
};

describe('ProductDetailScreen', () => {
    beforeEach(() => {
        jest.spyOn(Alert, 'alert').mockImplementation(() => { });
        jest.clearAllMocks();
    });

    it('shows loading when no product and loading', () => {
        useProductDetail.mockReturnValue({
            product: null,
            productLoading: true,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { UNSAFE_getByType } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('shows loading when product exists but loading', () => {
        useProductDetail.mockReturnValue({
            product: null,
            productLoading: true,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { UNSAFE_getByType } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('renders product with basic info and handles share', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description',
                category: 'Test Category'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: 4.5,
            reviewCount: 2,
        });
        const { getByText, getByTestId, getAllByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);

        expect(getByText('Test Product')).toBeTruthy();
        expect(getAllByText('Test Category')).toHaveLength(2); // subtitle and features
        expect(getByText('$10.00')).toBeTruthy();
        expect(getByText('4.5')).toBeTruthy();
        expect(getByText('(2 reviews)')).toBeTruthy();

        fireEvent.press(getByTestId('topbar'));
        expect(Alert.alert).toHaveBeenCalledWith('Share', 'Test Product - $10\nTest description');
    });

    it('renders product with image', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description',
                image: 'http://example.com/image.jpg'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('Test Product')).toBeTruthy();
        // Image would be rendered but hard to test without more setup
    });

    it('renders product without image', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('No image')).toBeTruthy();
    });

    it('renders product with tag', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description',
                tag: 'Hot Deal'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: 4,
            reviewCount: 1,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('Hot Deal')).toBeTruthy();
    });

    it('renders product with old price', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                oldPrice: 15,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('$10.00')).toBeTruthy();
        expect(getByText('$15.00')).toBeTruthy();
    });

    it('renders product with different price units', () => {
        const testCases = [
            { unit: 'euro' as const, symbol: '€' },
            { unit: 'inr' as const, symbol: '₹' },
        ];

        testCases.forEach(({ unit, symbol }) => {
            useProductDetail.mockReturnValue({
                product: {
                    id: 1,
                    name: 'Test Product',
                    price: 10,
                    priceUnit: unit,
                    description: 'Test description'
                },
                productLoading: false,
                reviews: [],
                reviewsLoading: false,
                rating: null,
                reviewCount: 0,
            });
            const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
            expect(getByText(`${symbol}10.00`)).toBeTruthy();
        });
    });

    it('renders key features', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description',
                category: 'Electronics'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText, getAllByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('Category')).toBeTruthy();
        expect(getAllByText('Electronics')).toHaveLength(2); // subtitle and features
        expect(getByText('Price Unit')).toBeTruthy();
        expect(getByText('DOLLAR')).toBeTruthy();
        expect(getByText('Product ID')).toBeTruthy();
        expect(getByText('#1')).toBeTruthy();
        expect(getByText('Status')).toBeTruthy();
        expect(getByText('Available')).toBeTruthy();
    });

    it('renders product description', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'This is a detailed product description.'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('Product Description')).toBeTruthy();
        expect(getByText('This is a detailed product description.')).toBeTruthy();
    });

    it('renders no reviews message', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('No reviews yet.')).toBeTruthy();
    });

    it('renders reviews loading', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: true,
            rating: null,
            reviewCount: 0,
        });
        const { UNSAFE_getByType } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('renders reviews', () => {
        const reviews = [
            { id: 1, productId: 1, userId: 123, rating: 5, message: 'Great product!' },
            { id: 2, productId: 1, userId: 456, rating: 4, message: 'Good value.' },
        ];
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews,
            reviewsLoading: false,
            rating: 4.5,
            reviewCount: 2,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('User #123')).toBeTruthy();
        expect(getByText('5/5')).toBeTruthy();
        expect(getByText('Great product!')).toBeTruthy();
        expect(getByText('User #456')).toBeTruthy();
        expect(getByText('4/5')).toBeTruthy();
        expect(getByText('Good value.')).toBeTruthy();
    });

    it('handles buy now button', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        fireEvent.press(getByText('Buy Now'));
        expect(navigation.navigate).toHaveBeenCalledWith('Checkout', { product: expect.any(Object) });
    });

    it('handles add to cart button', () => {
        useProductDetail.mockReturnValue({
            product: {
                id: 1,
                name: 'Test Product',
                price: 10,
                priceUnit: 'dollar' as const,
                description: 'Test description'
            },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        fireEvent.press(getByText('Add to Cart'));
        expect(Alert.alert).toHaveBeenCalledWith('Added to cart');
    });

    it('uses initial product when no fetched product', () => {
        useProductDetail.mockReturnValue({
            product: null,
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { getByText } = render(<ProductDetailScreen route={baseRoute} navigation={navigation as any} />);
        expect(getByText('Test Product')).toBeTruthy();
    });
});

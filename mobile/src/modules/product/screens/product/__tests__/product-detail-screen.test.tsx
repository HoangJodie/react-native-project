import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductDetailScreen } from '../product-detail-screen';

jest.mock('../../../hooks/useProductDetail', () => ({
    useProductDetail: jest.fn(),
}));
jest.mock('../../../../../shared/components/TopBar', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text onPress={props.onRightPress}>TopBar</Text>;
});
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const useProductDetail = require('../../../hooks/useProductDetail').useProductDetail as jest.Mock;

const route = {
    key: 'k',
    name: 'ProductDetail' as const,
    params: { productId: 1, product: { id: 1, name: 'Prod', price: 10, priceUnit: 'dollar' } },
};
const navigation = { goBack: jest.fn() };

describe('ProductDetailScreen', () => {
    beforeEach(() => {
        jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    });

    it('shows loading when no product', () => {
        useProductDetail.mockReturnValue({
            product: null,
            productLoading: true,
            reviews: [],
            reviewsLoading: false,
            rating: null,
            reviewCount: 0,
        });
        const { UNSAFE_getByType } = render(<ProductDetailScreen route={route} navigation={navigation as any} />);
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('renders product and handles share', () => {
        useProductDetail.mockReturnValue({
            product: { id: 1, name: 'Prod', price: 10, priceUnit: 'dollar' },
            productLoading: false,
            reviews: [],
            reviewsLoading: false,
            rating: 4,
            reviewCount: 2,
        });
        const { getByText } = render(<ProductDetailScreen route={route} navigation={navigation as any} />);
        fireEvent.press(getByText('TopBar'));
        expect(Alert.alert).toHaveBeenCalled();
    });
});

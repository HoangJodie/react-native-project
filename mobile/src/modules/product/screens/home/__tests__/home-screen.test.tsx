import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '../home-screen';

jest.mock('../../../hooks/useProducts', () => ({
    useProducts: jest.fn(),
}));
jest.mock('../components/SearchBar', () => ({
    SearchBar: () => null,
}));
jest.mock('../components/FilterTabs', () => ({
    FilterTabs: () => null,
}));
jest.mock('../components/ProductCard', () => ({
    ProductCard: () => null,
}));

const useProducts = require('../../../hooks/useProducts').useProducts as jest.Mock;

const navigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
    it('shows loading empty state', () => {
        useProducts.mockReturnValue({
            items: [],
            loading: true,
            fetching: false,
            refreshing: false,
            error: null,
            searchTerm: '',
            priceUnit: undefined,
            setSearchTerm: jest.fn(),
            setPriceUnit: jest.fn(),
            refetch: jest.fn(),
        });
        const { getByText } = render(<HomeScreen navigation={navigation} route={{ params: undefined, key: '', name: 'Home' }} />);
        expect(getByText('Loading products...')).toBeTruthy();
    });

    it('renders list empty message when no items and not loading', () => {
        useProducts.mockReturnValue({
            items: [],
            loading: false,
            fetching: false,
            refreshing: false,
            error: 'No products',
            searchTerm: '',
            priceUnit: undefined,
            setSearchTerm: jest.fn(),
            setPriceUnit: jest.fn(),
            refetch: jest.fn(),
        });
        const { getByText } = render(<HomeScreen navigation={navigation} route={{ params: undefined, key: '', name: 'Home' }} />);
        expect(getByText('No products')).toBeTruthy();
    });
});

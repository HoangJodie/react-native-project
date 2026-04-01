import React from 'react';
import ShopStack from '../ShopStack';

jest.mock('@react-navigation/native-stack', () => {
    const React = require('react');
    return {
        createNativeStackNavigator: () => {
            const Screen = ({ children }: any) => children;
            const Navigator = ({ children }: any) => children;
            return { Navigator, Screen };
        },
    };
});

jest.mock('../../../features/product/screens/home/home-screen', () => ({
    HomeScreen: () => null,
}));
jest.mock('../../../features/product/screens/product/product-detail-screen', () => ({
    ProductDetailScreen: () => null,
}));

describe('ShopStack', () => {
    it('renders stack', () => {
        const tree = ShopStack({});
        expect(tree).toBeTruthy();
    });
});

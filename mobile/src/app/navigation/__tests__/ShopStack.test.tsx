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

jest.mock('../../../modules/product/screens/home/home-screen', () => ({
    HomeScreen: () => null,
}));
jest.mock('../../../modules/product/screens/product/product-detail-screen', () => ({
    ProductDetailScreen: () => null,
}));

describe('ShopStack', () => {
    it('renders stack', () => {
        const tree = ShopStack({});
        expect(tree).toBeTruthy();
    });
});

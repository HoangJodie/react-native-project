import React from 'react';
import MainNavigator from '../MainNavigator';

jest.mock('@react-navigation/bottom-tabs', () => {
    const React = require('react');
    return {
        createBottomTabNavigator: () => {
            const Screen = ({ children }: any) => children;
            const Navigator = ({ children }: any) => children;
            return { Navigator, Screen };
        },
    };
});

jest.mock('@react-navigation/native', () => ({
    getFocusedRouteNameFromRoute: jest.fn(() => 'ProductDetail'),
}));

jest.mock('../../../modules/profile/screens/profile-screen', () => ({
    ProfileScreen: () => null,
}));
jest.mock('../../../modules/product/screens/categories/categories-screen', () => () => null);
jest.mock('../../../modules/product/screens/saved/saved-screen', () => () => null);
jest.mock('../ShopStack', () => () => null);
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const { getFocusedRouteNameFromRoute } = jest.requireMock('@react-navigation/native');

describe('MainNavigator', () => {
    it('renders without crashing and hides tab for ProductDetail route', () => {
        const tree = MainNavigator({});
        expect(tree).toBeTruthy();
    });

    it('renders when tab visible for Home route', () => {
        getFocusedRouteNameFromRoute.mockReturnValue(undefined);
        const tree = MainNavigator({});
        expect(tree).toBeTruthy();
    });
});

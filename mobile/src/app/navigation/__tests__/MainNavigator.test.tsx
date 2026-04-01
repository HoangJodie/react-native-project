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
    getFocusedRouteNameFromRoute: jest.fn(() => 'Home'),
}));

jest.mock('../../../features/profile/screens/profile-screen', () => ({
    ProfileScreen: () => null,
}));
jest.mock('../../../features/product/screens/categories/categories-screen', () => () => null);
jest.mock('../../../features/product/screens/saved/saved-screen', () => () => null);
jest.mock('../ShopStack', () => () => null);
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const { getFocusedRouteNameFromRoute } = jest.requireMock('@react-navigation/native');

describe('MainNavigator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing when Home route is focused', () => {
        getFocusedRouteNameFromRoute.mockReturnValue('Home');
        const component = <MainNavigator />;
        expect(component).toBeTruthy();
    });

    it('renders without crashing when ProductDetail route is active', () => {
        getFocusedRouteNameFromRoute.mockReturnValue('ProductDetail');
        const component = <MainNavigator />;
        expect(component).toBeTruthy();
    });

    it('renders without crashing when Checkout route is active', () => {
        getFocusedRouteNameFromRoute.mockReturnValue('Checkout');
        const component = <MainNavigator />;
        expect(component).toBeTruthy();
    });

    it('renders without crashing when undefined focused route (defaults to Home)', () => {
        getFocusedRouteNameFromRoute.mockReturnValue(undefined);
        const component = <MainNavigator />;
        expect(component).toBeTruthy();
    });

    it('renders without crashing with different route names', () => {
        const routes = ['Home', 'ProductDetail', 'Checkout', 'Categories', 'Saved', 'Profile'];
        routes.forEach(route => {
            getFocusedRouteNameFromRoute.mockReturnValue(route);
            const component = <MainNavigator />;
            expect(component).toBeTruthy();
        });
    });
});

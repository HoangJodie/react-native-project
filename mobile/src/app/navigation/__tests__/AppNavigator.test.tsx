import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../AppNavigator';

jest.mock('../../../features/auth/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('../../../features/auth/screens/signin/signin-screen', () => ({
    SignInScreen: () => <></>,
}));

jest.mock('../MainNavigator', () => () => <></>);

const useAuth = require('../../../features/auth/hooks/useAuth').useAuth as jest.Mock;

describe('AppNavigator', () => {
    it('shows loader when not initialized', () => {
        useAuth.mockReturnValue({ user: null, initialized: false, restoreSession: jest.fn() });
        const { UNSAFE_getByType } = render(<AppNavigator />);
        expect(UNSAFE_getByType(require('react-native').ActivityIndicator)).toBeTruthy();
    });

    it('renders SignIn flow when no user', () => {
        useAuth.mockReturnValue({ user: null, initialized: true, restoreSession: jest.fn() });
        const { toJSON } = render(<AppNavigator />);
        expect(toJSON()).toBeTruthy();
    });

    it('renders Main flow when user exists', () => {
        useAuth.mockReturnValue({ user: { id: 1 }, initialized: true, restoreSession: jest.fn() });
        const { toJSON } = render(<AppNavigator />);
        expect(toJSON()).toBeTruthy();
    });
});

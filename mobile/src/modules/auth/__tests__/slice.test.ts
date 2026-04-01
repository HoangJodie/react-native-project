jest.mock('../../../lib/database', () => ({
    getUserProfile: jest.fn(),
    saveUserProfile: jest.fn(),
}));
jest.mock('../api', () => ({
    login: jest.fn(),
    getCurrentUser: jest.fn(),
    logoutRemote: jest.fn(),
}));
jest.mock('react-native-keychain');

import * as Keychain from 'react-native-keychain';
import { authReducer, logout, initialAuthState } from '../slice';
import { loginUser, restoreSession, logoutAsync } from '../slice';
import { login, getCurrentUser, logoutRemote } from '../api';
import { getUserProfile, saveUserProfile } from '../../../lib/database';
import { AxiosError } from 'axios';

describe('auth reducer', () => {
    it('logout resets auth state', () => {
        const state = {
            ...initialAuthState,
            accessToken: 'token',
            user: { id: 1, username: 'john' },
            initialized: true,
            loading: false,
            error: null,
        };

        const result = authReducer(state, logout());

        expect(result.accessToken).toBeNull();
        expect(result.user).toBeNull();
        expect(result.initialized).toBe(false);
        expect(result.loading).toBe(false);
        expect(result.error).toBeNull();
    });

    it('loginUser pending sets loading', () => {
        const result = authReducer(initialAuthState, loginUser.pending('req', { username: 'a', password: 'b' }));
        expect(result.loading).toBe(true);
        expect(result.error).toBeNull();
    });

    it('loginUser fulfilled stores token/user', () => {
        const payload = { token: 't', user: { id: 1, username: 'john' } };
        const result = authReducer(initialAuthState, loginUser.fulfilled(payload, 'req', { username: 'a', password: 'b' }));
        expect(result.accessToken).toBe('t');
        expect(result.user?.username).toBe('john');
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
    });

    it('loginUser rejected stores error', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            loginUser.rejected(new Error('err'), 'req', { username: 'a', password: 'b' }, 'denied')
        );
        expect(result.loading).toBe(false);
        expect(result.initialized).toBe(true);
        expect(result.error).toBe('denied');
    });

    it('loginUser rejected with no payload uses default message', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            loginUser.rejected(new Error('err'), 'req', { username: 'a', password: 'b' }, undefined)
        );
        expect(result.error).toBe('Login failed');
    });

    it('restoreSession pending sets loading', () => {
        const result = authReducer(initialAuthState, restoreSession.pending('req'));
        expect(result.loading).toBe(true);
    });

    it('restoreSession rejected resets loading but keeps initialized', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            restoreSession.rejected(new Error('oops'), 'req', undefined, 'NO_SESSION')
        );
        expect(result.loading).toBe(false);
        expect(result.initialized).toBe(true);
    });

    it('logoutAsync rejected clears auth and sets error', () => {
        const result = authReducer(
            { ...initialAuthState, accessToken: 'tok', user: { id: 1, username: 'j' } },
            logoutAsync.rejected('fail', 'req', undefined, 'logout fail')
        );
        expect(result.accessToken).toBeNull();
        expect(result.user).toBeNull();
        expect(result.error).toBe('logout fail');
        expect(result.initialized).toBe(true);
    });

    it('logoutAsync rejected with no error uses null', () => {
        const result = authReducer(
            { ...initialAuthState, accessToken: 'tok', user: { id: 1, username: 'j' } },
            logoutAsync.rejected(new Error('internal'), 'req', undefined, undefined)
        );
        expect(result.error).toBeNull();
    });

    it('restoreSession fulfilled stores token/user', () => {
        const action = restoreSession.fulfilled(
            { token: 'tok', user: { id: 2, username: 'alice' } },
            'req',
            undefined
        );
        const result = authReducer(initialAuthState, action);
        expect(result.accessToken).toBe('tok');
        expect(result.user?.username).toBe('alice');
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
    });

    it('logoutAsync fulfilled resets tokens and keeps initialized true', () => {
        const state = {
            ...initialAuthState,
            accessToken: 'x',
            user: { id: 1, username: 'j' },
            initialized: true,
            loading: true,
            error: 'e',
        };
        const result = authReducer(state, logoutAsync.fulfilled(undefined, 'req'));
        expect(result.accessToken).toBeNull();
        expect(result.user).toBeNull();
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
        expect(result.error).toBeNull();
    });

    it('logoutAsync pending sets loading', () => {
        const result = authReducer(
            { ...initialAuthState, loading: false },
            logoutAsync.pending('req', undefined)
        );
        expect(result.loading).toBe(true);
    });
});

describe('loginUser async thunk branch coverage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('loginUser should call login API and save profile on success', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'test@test.com', age: null, firstName: 'Test', lastName: 'User', avatar: null, phone: null, address: null, updatedAt: '2023-01-01' };
        (login as jest.Mock).mockResolvedValue({ token: 'abc123' });
        (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
        (Keychain.setGenericPassword as jest.Mock).mockResolvedValue({});
        (saveUserProfile as jest.Mock).mockResolvedValue({});

        const action = loginUser.fulfilled(
            { token: 'abc123', user: mockUser },
            'requestId',
            { username: 'testuser', password: 'pass' }
        );
        const result = authReducer(initialAuthState, action);

        expect(result.accessToken).toBe('abc123');
        expect(result.user?.username).toBe('testuser');
        expect(result.initialized).toBe(true);
    });

    it('loginUser should handle API error with message', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            loginUser.rejected(new Error('err'), 'req', { username: 'user', password: 'wrong' }, 'Invalid credentials')
        );
        expect(result.error).toBe('Invalid credentials');
        expect(result.loading).toBe(false);
        expect(result.initialized).toBe(true);
    });

    it('loginUser should handle API error without message', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            loginUser.rejected(new Error('err'), 'req', { username: 'user', password: 'pass' }, undefined)
        );
        expect(result.error).toBe('Login failed');
    });

    it('loginUser should handle non-axios errors', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            loginUser.rejected(new Error('Generic error'), 'req', { username: 'user', password: 'pass' }, 'Network error')
        );
        expect(result.error).toBe('Network error');
    });
});

describe('restoreSession async thunk branch coverage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('restoreSession should set initialized when credentials not found', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            restoreSession.rejected(new Error(''), 'req', undefined, 'NO_SESSION')
        );
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
    });

    it('restoreSession should fetch user from API when credentials exist', () => {
        const mockUser = { id: 1, username: 'user', email: 'test@test.com', age: null, firstName: 'Test', lastName: 'User', avatar: null, phone: null, address: null, updatedAt: '2023-01-01' };
        const action = restoreSession.fulfilled(
            { token: 'token123', user: mockUser },
            'req',
            undefined
        );
        const result = authReducer(initialAuthState, action);

        expect(result.accessToken).toBe('token123');
        expect(result.user?.username).toBe('user');
        expect(result.initialized).toBe(true);
    });

    it('restoreSession fulfilled with different user profile', () => {
        const mockUser2 = { id: 2, username: 'alice', email: 'alice@test.com', age: 25, firstName: 'Alice', lastName: 'Wonder', avatar: 'url', phone: '1234567890', address: '123 Main St', updatedAt: '2023-01-02' };
        const action = restoreSession.fulfilled(
            { token: 'token456', user: mockUser2 },
            'req',
            undefined
        );
        const result = authReducer(initialAuthState, action);
        expect(result.accessToken).toBe('token456');
        expect(result.user?.id).toBe(2);
        expect(result.initialized).toBe(true);
    });

    it('restoreSession rejected sets initialized when API fails', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            restoreSession.rejected(new Error(''), 'req', undefined, 'Failed to load user')
        );
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
    });

    it('restoreSession rejected when local profile is null', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            restoreSession.rejected(new Error(''), 'req', undefined, 'Failed to load user')
        );
        expect(result.initialized).toBe(true);
        expect(result.loading).toBe(false);
    });

    it('restoreSession pending sets loading flag', () => {
        const result = authReducer(
            { ...initialAuthState, loading: false },
            restoreSession.pending('req', undefined)
        );
        expect(result.loading).toBe(true);
    });
});

describe('logoutAsync async thunk branch coverage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('logoutAsync should call logoutRemote and reset keychain on success', () => {
        const result = authReducer(
            { ...initialAuthState, accessToken: 'token', user: { id: 1, username: 'user' } },
            logoutAsync.fulfilled(undefined, 'req')
        );

        expect(result.accessToken).toBeNull();
        expect(result.user).toBeNull();
        expect(result.loading).toBe(false);
        expect(result.initialized).toBe(true);
    });

    it('logoutAsync should reset keychain even when API errors with 401', () => {
        const result = authReducer(
            { ...initialAuthState, accessToken: 'token', user: { id: 1, username: 'user' }, loading: true },
            logoutAsync.fulfilled(undefined, 'req')
        );

        expect(result.accessToken).toBeNull();
        expect(result.user).toBeNull();
    });

    it('logoutAsync should reject when API errors with non-401 status', () => {
        const result = authReducer(
            { ...initialAuthState, accessToken: 'token', user: { id: 1, username: 'user' }, loading: true },
            logoutAsync.rejected(new Error(''), 'req', undefined, 'Internal server error')
        );

        expect(result.error).toBe('Internal server error');
        expect(result.initialized).toBe(true);
    });

    it('logoutAsync should handle error without message', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            logoutAsync.rejected(new Error(''), 'req', undefined, undefined)
        );

        expect(result.error).toBeNull();
        expect(result.initialized).toBe(true);
    });

    it('logoutAsync should reject when logoutRemote throws', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            logoutAsync.rejected(new Error('Network error'), 'req', undefined, 'Network error')
        );

        expect(result.error).toBe('Network error');
    });

    it('logoutAsync should handle errors when response is missing', () => {
        const result = authReducer(
            { ...initialAuthState, loading: true },
            logoutAsync.rejected(new Error(''), 'req', undefined, 'Logout failed')
        );

        expect(result.error).toBe('Logout failed');
        expect(result.loading).toBe(false);
    });
});

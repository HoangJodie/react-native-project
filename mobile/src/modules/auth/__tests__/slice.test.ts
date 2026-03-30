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

import { authReducer, logout, initialAuthState } from '../slice';
import { loginUser, restoreSession, logoutAsync } from '../slice';

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
});

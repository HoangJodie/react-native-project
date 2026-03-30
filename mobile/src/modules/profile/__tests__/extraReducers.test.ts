jest.mock('../api', () => ({
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
}));
jest.mock('../../../lib/database', () => ({
    clearUserProfile: jest.fn(),
    getUserProfile: jest.fn(),
    markAsSynced: jest.fn(),
    saveUserProfile: jest.fn(),
}));
jest.mock('../../auth/slice', () => ({
    logout: { type: 'auth/logout' },
    logoutAsync: {
        fulfilled: { type: 'auth/logout/fulfilled' },
        rejected: { type: 'auth/logout/rejected' },
    },
}));

import { profileReducer, updateUserProfile, fetchProfile } from '../slice';
import type { ProfileState } from '../types';

describe('profile extra reducers', () => {
    const initial = profileReducer(undefined, { type: 'init' }) as ProfileState;

    it('handles fetchProfile.rejected', () => {
        const action = fetchProfile.rejected(new Error('fail'), undefined, undefined, 'boom');
        const result = profileReducer(initial, action);
        expect(result.error).toBe('boom');
        expect(result.loading).toBe(false);
    });

    it('handles updateUserProfile.rejected', () => {
        const action = updateUserProfile.rejected(new Error('oops'), undefined, { firstName: 'A' }, 'bad');
        const result = profileReducer(initial, action);
        expect(result.error).toBe('bad');
        expect(result.synced).toBe(false);
        expect(result.updating).toBe(false);
    });
});

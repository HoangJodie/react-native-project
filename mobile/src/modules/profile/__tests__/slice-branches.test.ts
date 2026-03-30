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

import { profileReducer, setProfile, setSynced, fetchProfile, updateUserProfile } from '../slice';
import type { ProfileState, Profile } from '../types';

const baseProfile: Profile = {
    id: 1,
    username: 'user1',
    updatedAt: '2024-01-01T00:00:00.000Z',
    pendingSync: true,
};

describe('profile reducer branches', () => {
    const initial = profileReducer(undefined, { type: 'init' }) as ProfileState;

    it('fetchProfile pending sets loading and clears error', () => {
        const res = profileReducer({ ...initial, error: 'old' }, fetchProfile.pending('id', undefined));
        expect(res.loading).toBe(true);
        expect(res.error).toBeNull();
    });

    it('fetchProfile fulfilled with payload updates profile and synced flag', () => {
        const res = profileReducer(initial, fetchProfile.fulfilled({ ...baseProfile, pendingSync: false }, 'id', undefined));
        expect(res.profile?.id).toBe(1);
        expect(res.synced).toBe(true);
        expect(res.loading).toBe(false);
    });

    it('updateUserProfile fulfilled sets syncError when not synced', () => {
        const action = updateUserProfile.fulfilled(
            { profile: { ...baseProfile, pendingSync: true }, synced: false, message: 'queued' },
            'id',
            { firstName: 'x' }
        );
        const res = profileReducer(initial, action);
        expect(res.synced).toBe(false);
        expect(res.syncError).toBe('queued');
    });

    it('setSynced false marks profile pendingSync', () => {
        const withProfile = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: false }));
        const res = profileReducer(withProfile, setSynced(false));
        expect(res.synced).toBe(false);
        expect(res.profile?.pendingSync).toBe(true);
    });
});

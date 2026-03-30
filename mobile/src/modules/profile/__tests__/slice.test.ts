jest.mock('../api', () => ({
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
}));
jest.mock('../../auth/slice', () => ({
    logout: { type: 'auth/logout' },
    logoutAsync: {
        fulfilled: { type: 'auth/logout/fulfilled' },
        rejected: { type: 'auth/logout/rejected' },
    },
}));
jest.mock('../../../lib/database', () => ({
    clearUserProfile: jest.fn(),
    getUserProfile: jest.fn(),
    markAsSynced: jest.fn(),
    saveUserProfile: jest.fn(),
}));

import { profileReducer, setProfile, setSynced, clearProfile } from '../slice';
import type { ProfileState, Profile } from '../types';

describe('profile reducer', () => {
    const initial = profileReducer(undefined, { type: 'init' }) as ProfileState;

    const baseProfile: Profile = {
        id: 1,
        username: 'user1',
        email: 'a@b.com',
        updatedAt: '2024-01-01T00:00:00.000Z',
    };

    it('sets profile and synced flag based on pendingSync', () => {
        const result = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: true }));
        expect(result.profile?.username).toBe('user1');
        expect(result.synced).toBe(false);

        const synced = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: false }));
        expect(synced.synced).toBe(true);
    });

    it('setSynced toggles pendingSync on profile', () => {
        const withProfile = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: true }));
        const result = profileReducer(withProfile, setSynced(true));
        expect(result.synced).toBe(true);
        expect(result.profile?.pendingSync).toBe(false);
    });

    it('clearProfile resets state', () => {
        const dirty: ProfileState = {
            profile: { ...baseProfile, pendingSync: false },
            loading: true,
            updating: true,
            synced: false,
            error: 'err',
            syncError: 'syncErr',
        };
        const result = profileReducer(dirty, clearProfile());
        expect(result.profile).toBeNull();
        expect(result.loading).toBe(false);
        expect(result.updating).toBe(false);
        expect(result.synced).toBe(true);
        expect(result.error).toBeNull();
        expect(result.syncError).toBeNull();
    });
});

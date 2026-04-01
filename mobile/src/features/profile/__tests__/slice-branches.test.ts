jest.mock('../api', () => ({
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
}));
jest.mock('../../../shared/lib/database', () => ({
    clearUserProfile: jest.fn(),
    getUserProfile: jest.fn(),
    markAsSynced: jest.fn(),
    saveUserProfile: jest.fn(),
}));

import { profileReducer, setProfile, setSynced, clearProfile, fetchProfile, updateUserProfile, clearProfileData } from '../slice';
import { logout, logoutAsync } from '../../auth/slice';
import type { ProfileState, Profile } from '../types';
import { getProfile, updateProfile } from '../api';
import { getUserProfile, saveUserProfile, markAsSynced, clearUserProfile } from '../../../shared/lib/database';

const mockGetProfile = getProfile as jest.Mock;
const mockUpdateProfile = updateProfile as jest.Mock;
const mockGetUserProfile = getUserProfile as jest.Mock;
const mockSaveUserProfile = saveUserProfile as jest.Mock;
const mockMarkAsSynced = markAsSynced as jest.Mock;
const mockClearUserProfile = clearUserProfile as jest.Mock;

const baseProfile: Profile = {
    id: 1,
    username: 'user1',
    updatedAt: '2024-01-01T00:00:00.000Z',
    pendingSync: true,
};

describe('profile reducer branches', () => {
    const initial = profileReducer(undefined, { type: 'init' }) as ProfileState;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchProfile reducer cases', () => {
        it('fetchProfile pending sets loading and clears error', () => {
            const state = { ...initial, error: 'old error' };
            const res = profileReducer(state, fetchProfile.pending('id', undefined));
            expect(res.loading).toBe(true);
            expect(res.error).toBeNull();
        });

        it('fetchProfile fulfilled with payload updates profile and synced flag', () => {
            const res = profileReducer(initial, fetchProfile.fulfilled({ ...baseProfile, pendingSync: false }, 'id', undefined));
            expect(res.profile?.id).toBe(1);
            expect(res.synced).toBe(true);
            expect(res.loading).toBe(false);
        });

        it('fetchProfile fulfilled with null payload shows profile stays null', () => {
            const existingProfile = { ...initial, profile: baseProfile };
            const res = profileReducer(existingProfile, fetchProfile.fulfilled(null, 'id', undefined));
            expect(res.profile).toBe(baseProfile); // profile unchanged
            expect(res.loading).toBe(false);
        });

        it('fetchProfile fulfilled with pendingSync true updates synced flag to false', () => {
            const res = profileReducer(initial, fetchProfile.fulfilled({ ...baseProfile, pendingSync: true }, 'id', undefined));
            expect(res.synced).toBe(false);
            expect(res.loading).toBe(false);
        });

        it('fetchProfile rejected sets error and clears loading', () => {
            const res = profileReducer(initial, fetchProfile.rejected(new Error('Network error'), 'id', undefined, 'Network error'));
            expect(res.loading).toBe(false);
            expect(res.error).toBe('Network error');
        });

        it('fetchProfile rejected without payload sets default error message', () => {
            const res = profileReducer(initial, fetchProfile.rejected(new Error('Failed to fetch profile'), 'id', undefined, undefined));
            expect(res.loading).toBe(false);
            expect(res.error).toBe('Failed to fetch profile');
        });
    });

    describe('updateUserProfile reducer cases', () => {
        it('updateUserProfile pending sets updating flag and clears errors', () => {
            const state = { ...initial, error: 'old', syncError: 'old sync' };
            const res = profileReducer(state, updateUserProfile.pending('id', { firstName: 'John' }));
            expect(res.updating).toBe(true);
            expect(res.error).toBeNull();
            expect(res.syncError).toBeNull();
            expect(res.synced).toBe(false);
        });

        it('updateUserProfile fulfilled with synced true updates profile', () => {
            const res = profileReducer(initial, updateUserProfile.fulfilled(
                { profile: { ...baseProfile, pendingSync: false }, synced: true },
                'id',
                { firstName: 'John' }
            ));
            expect(res.updating).toBe(false);
            expect(res.profile?.id).toBe(1);
            expect(res.synced).toBe(true);
            expect(res.syncError).toBeNull();
            expect(res.error).toBeNull();
        });

        it('updateUserProfile fulfilled with synced false sets syncError', () => {
            const state = { ...initial, error: 'old' };
            const res = profileReducer(state, updateUserProfile.fulfilled(
                { profile: { ...baseProfile, pendingSync: true }, synced: false, message: 'Syncing...' },
                'id',
                { firstName: 'John' }
            ));
            expect(res.updating).toBe(false);
            expect(res.synced).toBe(false);
            expect(res.syncError).toBe('Syncing...');
            expect(res.error).toBeNull();
        });

        it('updateUserProfile fulfilled with synced false and no message', () => {
            const res = profileReducer(initial, updateUserProfile.fulfilled(
                { profile: { ...baseProfile, pendingSync: true }, synced: false },
                'id',
                { firstName: 'John' }
            ));
            expect(res.syncError).toBeNull();
        });

        it('updateUserProfile rejected with payload sets error', () => {
            const res = profileReducer(initial, updateUserProfile.rejected(
                new Error('Update failed'),
                'id',
                { firstName: 'John' },
                'Update failed'
            ));
            expect(res.updating).toBe(false);
            expect(res.error).toBe('Update failed');
            expect(res.syncError).toBe('Update failed');
            expect(res.synced).toBe(false);
        });

        it('updateUserProfile rejected without payload sets default error', () => {
            const res = profileReducer(initial, updateUserProfile.rejected(
                new Error('Failed to update profile'),
                'id',
                { firstName: 'John' },
                undefined
            ));
            expect(res.error).toBe('Failed to update profile');
        });
    });

    describe('clearProfileData reducer cases', () => {
        it('clearProfileData fulfilled resets all profile state', () => {
            const state = { ...initial, profile: baseProfile, loading: true, error: 'some error' };
            const res = profileReducer(state, clearProfileData.fulfilled(undefined, 'id', undefined));
            expect(res.profile).toBeNull();
            expect(res.synced).toBe(true);
            expect(res.loading).toBe(false);
            expect(res.error).toBeNull();
            expect(res.syncError).toBeNull();
        });
    });

    describe('reducer action cases', () => {
        it('setProfile with profile updates profile and synced flag', () => {
            const res = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: false }));
            expect(res.profile?.id).toBe(1);
            expect(res.synced).toBe(true);
        });

        it('setProfile with profile having pendingSync true', () => {
            const res = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: true }));
            expect(res.profile?.id).toBe(1);
            expect(res.synced).toBe(false);
        });

        it('setProfile with null clears profile and synced flag', () => {
            const state = { ...initial, profile: baseProfile, synced: false };
            const res = profileReducer(state, setProfile(null));
            expect(res.profile).toBeNull();
            expect(res.synced).toBe(true);
        });

        it('setSynced true clears pendingSync on profile', () => {
            const withProfile = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: true }));
            const res = profileReducer(withProfile, setSynced(true));
            expect(res.synced).toBe(true);
            expect(res.profile?.pendingSync).toBe(false);
        });

        it('setSynced false marks profile pendingSync', () => {
            const withProfile = profileReducer(initial, setProfile({ ...baseProfile, pendingSync: false }));
            const res = profileReducer(withProfile, setSynced(false));
            expect(res.synced).toBe(false);
            expect(res.profile?.pendingSync).toBe(true);
        });

        it('setSynced without profile only updates synced flag', () => {
            const res = profileReducer(initial, setSynced(false));
            expect(res.synced).toBe(false);
            expect(res.profile).toBeNull();
        });

        it('clearProfile resets all state', () => {
            const state = { ...initial, profile: baseProfile, error: 'error', loading: true };
            const res = profileReducer(state, clearProfile());
            expect(res.profile).toBeNull();
            expect(res.loading).toBe(false);
            expect(res.updating).toBe(false);
            expect(res.synced).toBe(true);
            expect(res.error).toBeNull();
            expect(res.syncError).toBeNull();
        });
    });

    describe('logout cases', () => {
        it('logout action resets profile state', () => {
            const state = { ...initial, profile: baseProfile };
            const res = profileReducer(state, logout);
            expect(res.profile).toBeNull();
            expect(res.synced).toBe(true);
            expect(res.loading).toBe(false);
            expect(res.updating).toBe(false);
            expect(res.error).toBeNull();
            expect(res.syncError).toBeNull();
        });

        it('logoutAsync fulfilled resets to initial state', () => {
            const state = { ...initial, profile: baseProfile, error: 'some' };
            const res = profileReducer(state, logoutAsync.fulfilled(undefined, 'id', undefined));
            expect(res).toEqual({
                profile: null,
                loading: false,
                updating: false,
                synced: true,
                error: null,
                syncError: null,
            });
        });

        it('logoutAsync rejected resets to initial state', () => {
            const state = { ...initial, profile: baseProfile };
            const res = profileReducer(state, logoutAsync.rejected(new Error('Logout failed'), 'id', undefined));
            expect(res).toEqual({
                profile: null,
                loading: false,
                updating: false,
                synced: true,
                error: null,
                syncError: null,
            });
        });
    });
});

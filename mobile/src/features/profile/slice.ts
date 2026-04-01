import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    clearUserProfile,
    getUserProfile,
    markAsSynced,
    saveUserProfile,
} from '../../shared/lib/database';
import { profileService } from '.';
import { updateProfileSchema } from './schema';
import type { Profile, ProfileState, StoredProfile, UpdateProfileInput, UpdateProfileResult } from './types';
import type { RootState } from '../../app/root-reducer';
import { logout, logoutAsync } from '../auth/slice';

const initialState: ProfileState = {
    profile: null,
    loading: false,
    updating: false,
    synced: true,
    error: null,
    syncError: null,
};

const toSavableProfile = (profile: Profile) => {
    const { pendingSync: _pendingSync, ...rest } = profile;
    return rest;
};

const fromStoredProfile = (record: StoredProfile): Profile => ({
    ...record,
});

export const fetchProfile = createAsyncThunk<Profile | null, void, { state: RootState; rejectValue: string }>(
    'profile/fetchProfile',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const localProfile = await getUserProfile();
            if (localProfile) {
                dispatch(setProfile(fromStoredProfile(localProfile)));
            }

            const remoteProfile = await profileService.getProfile();

            if (!remoteProfile) {
                return localProfile ? fromStoredProfile(localProfile) : null;
            }

            const normalizedRemote: Profile = { ...remoteProfile, pendingSync: false };
            const shouldReplace =
                !localProfile ||
                !localProfile.updatedAt ||
                !normalizedRemote.updatedAt ||
                new Date(normalizedRemote.updatedAt) > new Date(localProfile.updatedAt);

            if (shouldReplace) {
                await saveUserProfile(toSavableProfile(normalizedRemote), false);
                dispatch(setProfile(normalizedRemote));
                return normalizedRemote;
            }

            return localProfile ? fromStoredProfile(localProfile) : null;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch profile';
            return rejectWithValue(message);
        }
    }
);

export const updateUserProfile = createAsyncThunk<
    UpdateProfileResult,
    UpdateProfileInput,
    { state: RootState; rejectValue: string }
>('profile/updateUserProfile', async (payload, { dispatch, getState, rejectWithValue }) => {
    const parsed = updateProfileSchema.safeParse(payload);
    if (!parsed.success) {
        return rejectWithValue(parsed.error.issues[0]?.message ?? 'Invalid profile data');
    }

    const state = getState();
    const storedProfile = await getUserProfile();
    const existingProfile = state.profile.profile ?? (storedProfile ? fromStoredProfile(storedProfile) : null);
    if (!existingProfile) {
        return rejectWithValue('Profile is not loaded');
    }

    const localProfile: Profile = {
        ...existingProfile,
        ...parsed.data,
        updatedAt: new Date().toISOString(),
        pendingSync: true,
    };

    await saveUserProfile(toSavableProfile(localProfile), true);
    dispatch(setProfile(localProfile));
    dispatch(setSynced(false));

    try {
        const remoteProfile = await profileService.updateProfile(parsed.data);
        const normalized: Profile = { ...remoteProfile, pendingSync: false };
        await saveUserProfile(toSavableProfile(normalized), false);
        await markAsSynced(normalized.id, normalized.updatedAt ?? undefined);
        return { profile: normalized, synced: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to update profile';
        return rejectWithValue(message);
    }
});

export const clearProfileData = createAsyncThunk<void, void, { rejectValue: string }>(
    'profile/clearProfileData',
    async (_, { rejectWithValue }) => {
        try {
            await clearUserProfile();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to clear profile cache';
            return rejectWithValue(message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<Profile | null>) {
            state.profile = action.payload;
            state.synced = action.payload ? !action.payload.pendingSync : true;
        },
        setSynced(state, action: PayloadAction<boolean>) {
            state.synced = action.payload;
            if (state.profile) {
                state.profile.pendingSync = !action.payload;
            }
        },
        clearProfile(state) {
            state.profile = null;
            state.loading = false;
            state.updating = false;
            state.synced = true;
            state.error = null;
            state.syncError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.profile = action.payload;
                    state.synced = !action.payload.pendingSync;
                }
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to fetch profile';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.updating = true;
                state.error = null;
                state.syncError = null;
                state.synced = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.updating = false;
                state.profile = action.payload.profile;
                state.synced = action.payload.synced;
                state.syncError = action.payload.synced ? null : action.payload.message ?? null;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload || action.error.message || 'Failed to update profile';
                state.syncError = state.error;
                state.synced = false;
            })
            .addCase(clearProfileData.fulfilled, (state) => {
                state.profile = null;
                state.synced = true;
                state.loading = false;
                state.updating = false;
                state.error = null;
                state.syncError = null;
            })
            .addCase(logout, (state) => {
                state.profile = null;
                state.synced = true;
                state.loading = false;
                state.updating = false;
                state.error = null;
                state.syncError = null;
            })
            .addCase(logoutAsync.fulfilled, () => initialState)
            .addCase(logoutAsync.rejected, () => initialState);
    },
});

export const { setProfile, setSynced, clearProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileSynced = (state: RootState) => state.profile.synced;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectProfileUpdating = (state: RootState) => state.profile.updating;
export const selectProfileSyncError = (state: RootState) => state.profile.syncError;

export default profileSlice;

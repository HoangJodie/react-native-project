import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import { authService } from './api';
import { getUserProfile, saveUserProfile } from '../../shared/lib/database';
import type { AuthUser, LoginPayload } from './types';
import type { RootState } from '../../app/store';
import type { AxiosError } from 'axios';

export interface AuthState {
    accessToken: string | null;
    user: AuthUser | null;
    loading: boolean;
    initialized: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    accessToken: null,
    user: null,
    loading: false,
    initialized: false,
    error: null,
};

type AuthPayload = { token: string; user: AuthUser };

export const loginUser = createAsyncThunk<AuthPayload, LoginPayload, { rejectValue: string }>(
    'auth/loginUser',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.login(payload);

            await Keychain.setGenericPassword('accessToken', response.token);

            const user = await authService.getCurrentUser();
            await saveUserProfile(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email ?? null,
                    age: user.age ?? null,
                    firstName: user.firstName ?? null,
                    lastName: user.lastName ?? null,
                    avatar: user.avatar ?? null,
                    phone: user.phone ?? null,
                    address: user.address ?? null,
                    updatedAt: user.updatedAt ?? new Date().toISOString(),
                },
                false
            );
            return { token: response.token, user };
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const restoreSession = createAsyncThunk<AuthPayload, void, { rejectValue: string }>(
    'auth/restoreSession',
    async (_, thunkAPI) => {
        const credentials = await Keychain.getGenericPassword();
        const token = credentials ? credentials.password : null;
        if (!token) {
            return thunkAPI.rejectWithValue('NO_SESSION');
        }
        try {
            const user = await authService.getCurrentUser();
            return { token, user };
        } catch (err) {
            try {
                const localProfile = await getUserProfile();
                if (localProfile) {
                    const mappedUser: AuthUser = {
                        id: localProfile.id,
                        username: localProfile.username,
                        email: localProfile.email ?? undefined,
                        age: localProfile.age ?? undefined,
                        firstName: localProfile.firstName ?? undefined,
                        lastName: localProfile.lastName ?? undefined,
                        avatar: localProfile.avatar ?? undefined,
                        phone: localProfile.phone ?? undefined,
                        address: localProfile.address ?? undefined,
                        updatedAt: localProfile.updatedAt ?? undefined,
                    };
                    return { token, user: mappedUser };
                }
            } catch {
            }

            const error = err as AxiosError<{ message?: string }>;
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load user');
        }
    }
);

export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await authService.logoutRemote();
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            if (error.response?.status && error.response.status !== 401) {
                return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
            }
        } finally {
            await Keychain.resetGenericPassword();
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        logout(state) {
            state.accessToken = null;
            state.initialized = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.token;
                state.user = action.payload.user;
                state.initialized = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.initialized = true;
                state.error = action.payload || 'Login failed';
            })
            .addCase(restoreSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(restoreSession.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.token;
                state.user = action.payload.user;
                state.initialized = true;
            })
            .addCase(restoreSession.rejected, (state) => {
                state.initialized = true;
                state.loading = false;
            })
            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.loading = false;
                state.accessToken = null;
                state.user = null;
                state.initialized = true;
                state.error = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.loading = false;
                state.accessToken = null;
                state.user = null;
                state.initialized = true;
                state.error = action.payload || null;
            });
    },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice;

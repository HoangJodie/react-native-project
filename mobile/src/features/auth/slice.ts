import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, login, logoutRemote } from './api';
import type { AuthUser, LoginPayload } from './type';
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
            const response = await login(payload);
            await AsyncStorage.setItem('accessToken', response.token);
            const user = await getCurrentUser();
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
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
            return thunkAPI.rejectWithValue('NO_SESSION');
        }
        try {
            const user = await getCurrentUser();
            return { token, user };
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to load user');
        }
    }
);

export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await logoutRemote();
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            if (error.response?.status && error.response.status !== 401) {
                return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
            }
        } finally {
            await AsyncStorage.removeItem('accessToken');
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
            AsyncStorage.multiRemove(['accessToken', 'user']);
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

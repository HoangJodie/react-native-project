import apiClient from '../../shared/lib/apiClient';
import type { LoginPayload, LoginResponse } from './types';
import type { AuthUser } from './types';

export const authService = {
    async login(payload: LoginPayload): Promise<LoginResponse> {
        const data = (await apiClient.post<LoginResponse>('/login', payload)) as unknown as LoginResponse;
        return data;
    },
    async getCurrentUser(): Promise<AuthUser> {
        const data = (await apiClient.get<AuthUser>('/user')) as unknown as AuthUser;
        return data;
    },
    async logoutRemote(): Promise<void> {
        await apiClient.post('/logout');
    },
};

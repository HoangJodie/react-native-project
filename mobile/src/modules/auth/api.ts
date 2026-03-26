import apiClient from '../../shared/lib/apiClient';
import type { LoginPayload, LoginResponse } from './type';
import type { AuthUser } from './type';

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const data = (await apiClient.post<LoginResponse>('/login', payload)) as unknown as LoginResponse;
    return data;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
    const data = (await apiClient.get<AuthUser>('/user')) as unknown as AuthUser;
    return data;
};

export const logoutRemote = async (): Promise<void> => {
    await apiClient.post('/logout');
};

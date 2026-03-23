import apiClient from './apiClient';
import { User } from '../models/user';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export const authService = {
    login: async ({ username, password }: LoginPayload): Promise<LoginResponse> => {
        try {
            const data = await apiClient.post('/login', { username, password });
            console.log("data:", JSON.stringify(data, null, 2))

            if (data?.user && data?.token) {
                return data as LoginResponse;
            }
            throw new Error('Invalid login response');
        } catch (error) {
            console.log("Status:", error.response?.status)
            console.log("Response data:", JSON.stringify(error.response?.data))
            throw error
        }
    },
};

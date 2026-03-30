import apiClient from '../../shared/lib/apiClient';
import type { Profile, UpdateProfileInput } from './types';

export const getProfile = async (): Promise<Profile> => {
    const data = await apiClient.get<Profile>('/user');
    return data as unknown as Profile;
};

export const updateProfile = async (payload: UpdateProfileInput): Promise<Profile> => {
    const data = await apiClient.patch<Profile>('/user', payload);
    return data as unknown as Profile;
};

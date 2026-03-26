import apiClient from '../../shared/lib/apiClient';
import type { Profile, UpdateProfileInput } from './types';

export const getProfile = async (): Promise<Profile> => {
    const data = (await apiClient.get<Profile>('/user')) as Profile;
    return data;
};

export const updateProfile = async (payload: UpdateProfileInput): Promise<Profile> => {
    const data = (await apiClient.patch<Profile>('/user', payload)) as Profile;
    return data;
};


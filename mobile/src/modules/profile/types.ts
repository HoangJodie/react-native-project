import type { UserProfileRecord } from '../../lib/database';

export type Profile = UserProfileRecord;

export type UpdateProfileInput = Partial<
    Pick<Profile, 'email' | 'firstName' | 'lastName' | 'age'>
>;

export interface ProfileState {
    profile: Profile | null;
    loading: boolean;
    updating: boolean;
    synced: boolean;
    error: string | null;
    syncError: string | null;
}

export interface UpdateProfileResult {
    profile: Profile;
    synced: boolean;
    message?: string;
}

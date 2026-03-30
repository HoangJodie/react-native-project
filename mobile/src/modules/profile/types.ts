export interface ProfileBase {
    id: number;
    username: string;
    email?: string | null;
    age?: number | null;
    firstName?: string | null;
    lastName?: string | null;
    avatar?: string | null;
    phone?: string | null;
    address?: string | null;
    updatedAt?: string | null;
}

// Domain model used in UI/state. pendingSync is client-only.
export interface Profile extends ProfileBase {
    pendingSync?: boolean;
}

// Record shape stored in SQLite cache.
export interface StoredProfile extends ProfileBase {
    pendingSync: boolean;
}

export type UpdateProfileInput = Partial<Pick<Profile, 'email' | 'firstName' | 'lastName' | 'age' | 'avatar'>>;

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

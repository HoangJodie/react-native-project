export interface AuthUser {
    id: number;
    username: string;
    email?: string;
    age?: number;
    role?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: AuthUser;
}

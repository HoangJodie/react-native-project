import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/user';
import { authService } from '../services/auth-service';

interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [storedUser, storedToken] = await Promise.all([
                    AsyncStorage.getItem('user'),
                    AsyncStorage.getItem('token'),
                ]);
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                }
            } catch (e) {
                console.warn('Failed to restore session', e);
            }
        })();
    }, []);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const { user: loggedInUser, token: accessToken } = await authService.login({
                username,
                password,
            });
            setUser(loggedInUser);
            setToken(accessToken);
            await AsyncStorage.multiSet([
                ['user', JSON.stringify(loggedInUser)],
                ['token', accessToken],
            ]);
        } catch (e: any) {
            const message =
                e?.response?.data?.message ||
                e?.response?.data?.error ||
                e?.message ||
                'Login failed';
            setError(String(message));
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.multiRemove(['user', 'token']);
    };

    const contextValue: AuthContextProps = {
        user,
        token,
        loading,
        error,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };



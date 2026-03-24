import React from 'react';
import { useAuth } from '../features/auth/useAuth';
import { SignInScreen } from '../screens/signin/signin-screen';

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <SignInScreen navigation={{ replace: () => { } }} />;
    }

    return <>{children}</>;
};

export default RequireAuth;

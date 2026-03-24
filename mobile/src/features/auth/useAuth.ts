import { useAppDispatch, useAppSelector } from '../../app/hooks/redux';
import {
    restoreSession,
    loginUser,
    logout,
    logoutAsync,
    selectAccessToken,
    selectAuthError,
    selectAuthInitialized,
    selectAuthLoading,
    selectUser,
} from './slice';

export function useAuth() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);
    const initialized = useAppSelector(selectAuthInitialized);
    const accessToken = useAppSelector(selectAccessToken);

    const login = (username: string, password: string) => dispatch(loginUser({ username, password })).unwrap();

    const logoutUser = () => {
        dispatch(logoutAsync());
    };

    const restore = () => dispatch(restoreSession());

    return {
        initialized,
        loading,
        error,
        user,
        accessToken,
        login,
        logout: logoutUser,
        logoutUser,
        restoreSession: restore,
    };
}

export default useAuth;

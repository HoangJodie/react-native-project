import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

jest.mock('../../../app/hooks/redux', () => ({
    useAppDispatch: () => jest.fn(),
    useAppSelector: (selector: any) =>
        selector({
            auth: {
                user: { id: 1, username: 'john' },
                loading: false,
                error: null,
                initialized: true,
                accessToken: 'tok',
            },
        }),
}));

jest.mock('../slice', () => ({
    restoreSession: () => ({ type: 'restore' }),
    loginUser: (p: any) => ({ type: 'login', payload: p, unwrap: jest.fn() }),
    logoutAsync: () => ({ type: 'logoutAsync' }),
    selectUser: (s: any) => s.auth.user,
    selectAuthLoading: (s: any) => s.auth.loading,
    selectAuthError: (s: any) => s.auth.error,
    selectAuthInitialized: (s: any) => s.auth.initialized,
    selectAccessToken: (s: any) => s.auth.accessToken,
}));

jest.mock('../../profile/slice', () => ({
    clearProfileData: () => ({ type: 'clearProfile' }),
}));

describe('useAuth hook', () => {
    it('returns selectors values', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user?.username).toBe('john');
        expect(result.current.accessToken).toBe('tok');
        expect(result.current.initialized).toBe(true);
    });

    it('login dispatches loginUser', () => {
        const dispatch = jest.fn(() => ({ unwrap: jest.fn() }));
        jest.spyOn(require('../../../app/hooks/redux'), 'useAppDispatch').mockReturnValue(dispatch);
        const { result } = renderHook(() => useAuth());
        act(() => {
            result.current.login('u', 'p');
        });
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'login' }));
    });

    it('logout calls logoutAsync and clearProfileData', async () => {
        const dispatch = jest.fn().mockResolvedValue(undefined);
        jest.spyOn(require('../../../app/hooks/redux'), 'useAppDispatch').mockReturnValue(dispatch);
        const { result } = renderHook(() => useAuth());
        await act(async () => {
            await result.current.logout();
        });
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'logoutAsync' }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'clearProfile' }));
    });
});

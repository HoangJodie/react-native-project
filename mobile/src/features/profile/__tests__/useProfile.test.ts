import { renderHook, act } from '@testing-library/react-hooks';
import useProfile from '../hooks/useProfile';

jest.mock('@/app/hooks', () => ({
    useAppDispatch: () => jest.fn(),
    useAppSelector: (selector: any) =>
        selector({
            profile: {
                profile: { id: 1, username: 'u', pendingSync: false },
                loading: false,
                updating: false,
                synced: true,
                error: null,
                syncError: null,
            },
        }),
}));

jest.mock('../slice', () => ({
    fetchProfile: () => ({ type: 'fetchProfile' }),
    updateUserProfile: (p: any) => ({ type: 'update', payload: p, unwrap: jest.fn() }),
    selectProfile: (s: any) => s.profile.profile,
    selectProfileLoading: (s: any) => s.profile.loading,
    selectProfileUpdating: (s: any) => s.profile.updating,
    selectProfileSynced: (s: any) => s.profile.synced,
    selectProfileError: (s: any) => s.profile.error,
    selectProfileSyncError: (s: any) => s.profile.syncError,
}));

describe('useProfile hook', () => {
    it('returns profile values', () => {
        const { result } = renderHook(() => useProfile());
        expect(result.current.profile?.id).toBe(1);
        expect(result.current.synced).toBe(true);
    });

    it('calls updateProfile with data', () => {
        const dispatch = jest.fn(() => ({ unwrap: jest.fn() }));
        jest.spyOn(require('@/app/hooks'), 'useAppDispatch').mockReturnValue(dispatch);
        const { result } = renderHook(() => useProfile());
        act(() => {
            result.current.updateProfile({ firstName: 'A' });
        });
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'update' }));
    });
});

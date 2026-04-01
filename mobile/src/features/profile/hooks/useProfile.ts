import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    fetchProfile,
    selectProfile,
    selectProfileError,
    selectProfileLoading,
    selectProfileSyncError,
    selectProfileSynced,
    selectProfileUpdating,
    updateUserProfile,
} from '../slice';
import { profileService } from '..';

export const useProfile = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectProfile);
    const loading = useAppSelector(selectProfileLoading);
    const updating = useAppSelector(selectProfileUpdating);
    const synced = useAppSelector(selectProfileSynced);
    const error = useAppSelector(selectProfileError);
    const syncError = useAppSelector(selectProfileSyncError);

    useEffect(() => {
        if (!profile && !loading) {
            dispatch(fetchProfile());
        }
    }, [dispatch, loading, profile]);

    const refreshProfile = useCallback(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const updateProfile = useCallback(
        (data: UpdateProfileInput) => dispatch(updateUserProfile(data)).unwrap(),
        [dispatch]
    );

    const uploadAvatar = useCallback(
        (avatar: string) =>
            profileService.updateProfile({
                avatar,
            }),
        [updateProfile]
    );

    return {
        profile,
        loading,
        updating,
        synced,
        error,
        syncError,
        updateProfile,
        refreshProfile,
        uploadAvatar,
    };
};

export default useProfile;

import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ProfileScreen } from '../profile-screen';

jest.mock('../../../../shared/components/organisms/TopBar', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text>{props.title}</Text>;
});
jest.mock('../../components/ProfileAvatarCard', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text testID="avatar">{props.user.username}</Text>;
});
jest.mock('../../components/AccountDetailsCard', () => {
    const { Text } = require('react-native');
    return (props: any) => <Text testID="details">{props.user.email ?? 'none'}</Text>;
});
jest.mock('../../components/ProfileActionRow', () => {
    const { Text } = require('react-native');
    return () => <Text>ActionRow</Text>;
});
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const mockLogout = jest.fn();
const mockUpdate = jest.fn();
jest.mock('../../../auth/hooks/useAuth', () => ({
    useAuth: () => ({ logout: mockLogout }),
}));

const mockUseProfile = jest.fn();
jest.mock('../../hooks/useProfile', () => ({
    useProfile: () => mockUseProfile(),
}));

describe('ProfileScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loader when fetching and no profile', () => {
        mockUseProfile.mockReturnValue({
            profile: null,
            loading: true,
            error: null,
            syncError: null,
            updateProfile: mockUpdate,
            updating: false,
        });
        const { UNSAFE_getByType } = render(<ProfileScreen />);
        expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('renders profile data, error banners and logout', () => {
        mockUseProfile.mockReturnValue({
            profile: {
                id: 1,
                username: 'john',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                updatedAt: new Date().toISOString(),
                pendingSync: false,
            },
            loading: false,
            error: 'load failed',
            syncError: 'sync failed',
            updateProfile: mockUpdate,
            updating: false,
        });

        const { getByText, getByTestId } = render(<ProfileScreen />);
        expect(getByText('Profile Settings')).toBeTruthy();
        expect(getByText('sync failed')).toBeTruthy();
        expect(getByText('load failed')).toBeTruthy();
        expect(getByTestId('avatar').props.children).toBe('john');
        fireEvent.press(getByText('Logout'));
        expect(mockLogout).toHaveBeenCalled();
    });
});

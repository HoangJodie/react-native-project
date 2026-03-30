import React from 'react';
import { Image } from 'react-native';
import { render } from '@testing-library/react-native';
import ProfileAvatarCard from '../ProfileAvatarCard';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const baseUser = {
    id: 1,
    username: 'asmith',
    firstName: 'Anna',
    lastName: 'Smith',
    email: 'anna@example.com',
    updatedAt: '2023-01-01',
    pendingSync: false,
};

describe('ProfileAvatarCard', () => {
    it('renders initials when no avatar', () => {
        const { getByText } = render(<ProfileAvatarCard user={{ ...baseUser, avatar: undefined }} />);
        expect(getByText('AS')).toBeTruthy();
        expect(getByText('Anna Smith')).toBeTruthy();
        expect(getByText('@asmith')).toBeTruthy();
    });

    it('shows image when avatar exists', () => {
        const { UNSAFE_getByType } = render(<ProfileAvatarCard user={{ ...baseUser, avatar: 'http://img' }} />);
        expect(UNSAFE_getByType(Image)).toBeTruthy();
    });
});

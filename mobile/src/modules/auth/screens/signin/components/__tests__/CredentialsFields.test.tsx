import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CredentialsFields } from '../CredentialsFields';

describe('CredentialsFields', () => {
    it('renders and handles changes', () => {
        const onUser = jest.fn();
        const onPass = jest.fn();
        const { getAllByPlaceholderText } = render(
            <CredentialsFields
                username={{ value: '', error: '' }}
                password={{ value: '', error: '' }}
                onUsernameChange={onUser}
                onPasswordChange={onPass}
            />
        );
        fireEvent.changeText(getAllByPlaceholderText(/johndoe/i)[0], 'user');
        fireEvent.changeText(getAllByPlaceholderText(/\*\*\*\*/)[0], 'secret');
        expect(onUser).toHaveBeenCalledWith('user');
        expect(onPass).toHaveBeenCalledWith('secret');
    });
});

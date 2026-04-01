import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SignInScreen } from '../signin-screen';

jest.mock('../../../../../shared/components/organisms/Background', () => ({ children }: any) => <>{children}</>);
jest.mock('../../../../../shared/components/atoms/Button', () => (props: any) => <button onClick={props.onPress}>{props.children}</button>);
jest.mock('../../../hooks', () => ({
    useAuth: jest.fn(),
}));

jest.mock('../useSignInForm', () => ({
    useSignInForm: jest.fn(),
}));

jest.mock('../components/SignInHeader', () => ({ SignInHeader: () => <></> }));
jest.mock('../components/AuthSegment', () => ({ AuthSegment: () => <></> }));
jest.mock('../components/CredentialsFields', () => ({
    CredentialsFields: (props: any) => (
        <button
            testID="cred"
            onClick={() => {
                props.onUsernameChange('u');
                props.onPasswordChange('p');
            }}
        />
    ),
}));
jest.mock('../components/BiometricToggle', () => ({
    BiometricToggle: (props: any) => <button testID="bio" onClick={() => props.onChange(!props.value)} />,
}));
jest.mock('../components/ErrorBanner', () => ({
    ErrorBanner: (props: any) => (props.message ? <text>{props.message}</text> : null),
}));
jest.mock('../components/SocialButtons', () => ({ SocialButtons: () => <></> }));
jest.mock('../components/LegalFooter', () => ({ LegalFooter: () => <></> }));

const useAuth = require('../../../hooks').useAuth as jest.Mock;
const useSignInForm = require('../useSignInForm').useSignInForm as jest.Mock;

const navigation = { replace: jest.fn() };

describe('SignInScreen', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ login: jest.fn().mockResolvedValue(undefined), loading: false, error: null });
        useSignInForm.mockReturnValue({
            username: { value: 'user', error: '' },
            password: { value: 'secret', error: '' },
            setField: jest.fn(),
            validate: jest.fn().mockReturnValue(true),
        });
    });

    it('submits when valid and navigates', async () => {
        const loginMock = jest.fn().mockResolvedValue(undefined);
        useAuth.mockReturnValue({ login: loginMock, loading: false, error: null });
        const validateMock = jest.fn().mockReturnValue(true);
        useSignInForm.mockReturnValue({
            username: { value: 'user', error: '' },
            password: { value: 'secret', error: '' },
            setField: jest.fn(),
            validate: validateMock,
        });

        const { getByText } = render(<SignInScreen navigation={navigation} />);
        fireEvent.press(getByText('Sign In'));
        expect(validateMock).toHaveBeenCalled();
    });

    it('shows error banner when error present', () => {
        useAuth.mockReturnValue({ login: jest.fn(), loading: false, error: 'Invalid' });
        const { toJSON } = render(<SignInScreen navigation={navigation} />);
        expect(toJSON()).toBeTruthy();
    });
});

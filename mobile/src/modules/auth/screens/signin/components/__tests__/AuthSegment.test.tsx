import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AuthSegment } from '../AuthSegment';

describe('AuthSegment', () => {
    it('calls onChange for login', () => {
        const onChange = jest.fn();
        const { getByText } = render(<AuthSegment active="signup" onChange={onChange} />);
        fireEvent.press(getByText('Login'));
        expect(onChange).toHaveBeenCalledWith('login');
    });

    it('calls onChange for signup', () => {
        const onChange = jest.fn();
        const { getByText } = render(<AuthSegment active="login" onChange={onChange} />);
        fireEvent.press(getByText('Sign Up'));
        expect(onChange).toHaveBeenCalledWith('signup');
    });
});

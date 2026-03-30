import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import LogoutSection from '../LogoutSection';

describe('LogoutSection', () => {
    it('calls onLogout', () => {
        const onLogout = jest.fn();
        const { getByText } = render(<LogoutSection onLogout={onLogout} />);
        fireEvent.press(getByText('Logout'));
        expect(onLogout).toHaveBeenCalled();
    });
});

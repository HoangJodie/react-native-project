import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorBanner } from '../ErrorBanner';

describe('ErrorBanner', () => {
    it('renders message when provided', () => {
        const { getByText } = render(<ErrorBanner message="Oops" />);
        expect(getByText('Oops')).toBeTruthy();
    });

    it('returns null when no message', () => {
        const { toJSON } = render(<ErrorBanner />);
        expect(toJSON()).toBeNull();
    });
});

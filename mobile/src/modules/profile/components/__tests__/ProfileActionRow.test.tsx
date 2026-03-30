import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileActionRow from '../ProfileActionRow';

describe('ProfileActionRow', () => {
    it('renders label', () => {
        const { getByText } = render(<ProfileActionRow icon="star" label="Test" />);
        expect(getByText('Test')).toBeTruthy();
    });
});

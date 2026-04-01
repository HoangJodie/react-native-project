import React from 'react';
import { render } from '@testing-library/react-native';
import CategoriesScreen from '../categories-screen';

describe('CategoriesScreen', () => {
    it('renders text', () => {
        const { toJSON } = render(<CategoriesScreen />);
        expect(toJSON()).toBeTruthy();
    });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

jest.mock('../../store', () => ({
    __esModule: true,
    default: {
        dispatch: jest.fn(),
        getState: jest.fn(),
        subscribe: jest.fn(),
        replaceReducer: jest.fn(),
    },
}));

import ReduxProvider from '../ReduxProvider';

describe('ReduxProvider', () => {
    it('renders children', () => {
        const { getByText } = render(
            <ReduxProvider>
                <Text>Coverage</Text>
            </ReduxProvider>
        );
        expect(getByText('Coverage')).toBeTruthy();
    });
});

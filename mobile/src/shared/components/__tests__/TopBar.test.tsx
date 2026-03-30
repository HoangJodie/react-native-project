import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TopBar from '../TopBar';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('TopBar', () => {
    it('calls left and right handlers', () => {
        const onLeftPress = jest.fn();
        const onRightPress = jest.fn();
        const { UNSAFE_getAllByType } = render(
            <TopBar title="Hello" leftIcon="arrow-left" rightIcon="share" onLeftPress={onLeftPress} onRightPress={onRightPress} />
        );

        const buttons = UNSAFE_getAllByType(TouchableOpacity);
        fireEvent.press(buttons[0]);
        fireEvent.press(buttons[1]);

        expect(onLeftPress).toHaveBeenCalled();
        expect(onRightPress).toHaveBeenCalled();
    });

    it('renders placeholders when icons missing', () => {
        const { getByText } = render(<TopBar title="No Icons" leftIcon={undefined} rightIcon={undefined} />);
        expect(getByText('No Icons')).toBeTruthy();
    });
});

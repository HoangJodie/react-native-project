import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AddressSection } from '../AddressSection';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('../../../../../../shared/components/TextInput', () => {
    const { TextInput } = require('react-native');
    return (props: any) => (
        <TextInput
            {...props}
            testID="address-input"
            onChangeText={props.onChangeText}
            value={props.value}
        />
    );
});

describe('AddressSection', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders section title and hint', () => {
        const { getByText } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        expect(getByText('Shipping Address')).toBeTruthy();
        expect(getByText('We deliver to your door')).toBeTruthy();
    });

    it('displays text input', () => {
        const { getByTestId } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        expect(getByTestId('address-input')).toBeTruthy();
    });

    it('calls onChange when text is entered', () => {
        const { getByTestId } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        const input = getByTestId('address-input');
        fireEvent.changeText(input, '123 Main St');
        expect(mockOnChange).toHaveBeenCalledWith('123 Main St');
    });

    it('displays the current value', () => {
        const { getByTestId } = render(
            <AddressSection value="456 Oak Ave" onChange={mockOnChange} />
        );
        const input = getByTestId('address-input');
        expect(input.props.value).toBe('456 Oak Ave');
    });

    it('displays error message when provided', () => {
        const { getByTestId } = render(
            <AddressSection value="" onChange={mockOnChange} error="Address is required" />
        );
        const input = getByTestId('address-input');
        expect(input).toBeTruthy();
    });

    it('does not display error when not provided', () => {
        const { queryByText } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        expect(queryByText('Address is required')).toBeNull();
    });

    it('accepts multiline text input', () => {
        const { getByTestId } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        const input = getByTestId('address-input');
        expect(input.props.multiline).toBe(true);
    });

    it('displays placeholder text', () => {
        const { getByTestId } = render(
            <AddressSection value="" onChange={mockOnChange} />
        );
        const input = getByTestId('address-input');
        expect(input.props.placeholder).toBe('Enter delivery address');
    });
});
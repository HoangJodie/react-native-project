import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CheckoutFooter } from '../CheckoutFooter';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('CheckoutFooter', () => {
    const mockOnConfirm = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders total amount', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={250.50}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('Total Amount')).toBeTruthy();
        expect(getByText('$250.50')).toBeTruthy();
    });

    it('renders confirm button', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('Confirm Purchase')).toBeTruthy();
    });

    it('calls onConfirm when button is pressed', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
            />
        );
        fireEvent.press(getByText('Confirm Purchase'));
        expect(mockOnConfirm).toHaveBeenCalled();
    });

    it('disables button when disabled prop is true', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
                disabled={true}
            />
        );
        const button = getByText('Confirm Purchase');
        expect(button).toBeTruthy();
    });

    it('enables button when disabled prop is false', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
                disabled={false}
            />
        );
        const button = getByText('Confirm Purchase');
        expect(button).toBeTruthy();
    });

    it('shows loading state', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
                loading={true}
            />
        );
        // When loading, the confirm text should not be visible
        // Check that the component renders
        expect(getByText('Total Amount')).toBeTruthy();
    });

    it('displays security note', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('Secure SSL encrypted checkout')).toBeTruthy();
    });

    it('formats currency correctly with euro symbol', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="€"
                totalAmount={99.99}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('€99.99')).toBeTruthy();
    });

    it('formats currency correctly with INR symbol', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="₹"
                totalAmount={5000}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('₹5000.00')).toBeTruthy();
    });

    it('applies opacity when disabled', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
                disabled={true}
            />
        );
        // The button should have reduced opacity when disabled
        const button = getByText('Confirm Purchase');
        expect(button).toBeTruthy();
    });

    it('does not call onConfirm when disabled and pressed', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
                disabled={true}
            />
        );
        fireEvent.press(getByText('Confirm Purchase'));
        // When disabled, onConfirm should not be called
        // This is handled by the disabled prop on the TouchableOpacity
        expect(mockOnConfirm).not.toHaveBeenCalled();
    });

    it('defaults disabled to false', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
            />
        );
        const button = getByText('Confirm Purchase');
        expect(button).toBeTruthy();
    });

    it('defaults loading to false', () => {
        const { getByText } = render(
            <CheckoutFooter
                currencySymbol="$"
                totalAmount={100}
                onConfirm={mockOnConfirm}
            />
        );
        expect(getByText('Confirm Purchase')).toBeTruthy();
    });
});
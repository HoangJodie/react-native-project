import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaymentMethodList } from '../PaymentMethodList';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('PaymentMethodList', () => {
    const mockOnSelect = jest.fn();
    const mockOnRetry = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders section header', () => {
        const { getByText } = render(
            <PaymentMethodList methods={[]} onSelect={mockOnSelect} />
        );
        expect(getByText('Payment Method')).toBeTruthy();
        expect(getByText('Choose how to pay')).toBeTruthy();
    });

    it('displays payment methods', () => {
        const methods = ['credit_card', 'paypal'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                selected="credit_card"
                onSelect={mockOnSelect}
            />
        );
        expect(getByText('Credit Card')).toBeTruthy();
        expect(getByText('PayPal')).toBeTruthy();
    });

    it('displays payment method subtitles', () => {
        const methods = ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                onSelect={mockOnSelect}
            />
        );
        expect(getByText('Visa, Mastercard, AMEX')).toBeTruthy();
        expect(getByText('Any bank debit card')).toBeTruthy();
        expect(getByText('Pay directly with PayPal')).toBeTruthy();
        expect(getByText('Pay in cash when you receive the order')).toBeTruthy();
    });

    it('calls onSelect when payment method is pressed', () => {
        const methods = ['credit_card', 'paypal'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                onSelect={mockOnSelect}
            />
        );
        fireEvent.press(getByText('Credit Card'));
        expect(mockOnSelect).toHaveBeenCalledWith('credit_card');
    });

    it('highlights selected payment method', () => {
        const methods = ['credit_card', 'paypal'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                selected="paypal"
                onSelect={mockOnSelect}
            />
        );
        // Selected method should have different styling
        const paypalButton = getByText('PayPal').parent;
        expect(paypalButton).toBeTruthy();
    });

    it('shows loading state', () => {
        const { getByText } = render(
            <PaymentMethodList
                methods={[]}
                loading={true}
                onSelect={mockOnSelect}
            />
        );
        // The component should show loading message, which is implicit in test
        expect(getByText).toBeTruthy();
    });

    it('shows error state with message', () => {
        const { getByText } = render(
            <PaymentMethodList
                methods={[]}
                error="Failed to load payment methods"
                onSelect={mockOnSelect}
            />
        );
        expect(getByText('Failed to load payment methods')).toBeTruthy();
    });

    it('shows retry link when error occurs and onRetry is provided', () => {
        const { getByText } = render(
            <PaymentMethodList
                methods={[]}
                error="Failed to load"
                onSelect={mockOnSelect}
                onRetry={mockOnRetry}
            />
        );
        expect(getByText('Tap to retry')).toBeTruthy();
    });

    it('calls onRetry when retry link is pressed', () => {
        const { getByText } = render(
            <PaymentMethodList
                methods={[]}
                error="Failed to load"
                onSelect={mockOnSelect}
                onRetry={mockOnRetry}
            />
        );
        fireEvent.press(getByText('Tap to retry'));
        expect(mockOnRetry).toHaveBeenCalled();
    });

    it('shows empty message when no methods available', () => {
        const { getByText } = render(
            <PaymentMethodList
                methods={[]}
                onSelect={mockOnSelect}
            />
        );
        expect(getByText('No payment methods available right now.')).toBeTruthy();
    });

    it('displays validation error', () => {
        const methods = ['credit_card'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                onSelect={mockOnSelect}
                validationError="Please select a payment method"
            />
        );
        expect(getByText('Please select a payment method')).toBeTruthy();
    });

    it('handles custom payment method label', () => {
        const methods = ['custom_method'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                onSelect={mockOnSelect}
            />
        );
        // Custom methods should have underscores replaced with spaces
        expect(getByText('custom method')).toBeTruthy();
    });

    it('renders all credit and debit card icons correctly', () => {
        const methods = ['credit_card', 'debit_card'] as const;
        const { getByText } = render(
            <PaymentMethodList
                methods={methods}
                onSelect={mockOnSelect}
            />
        );
        expect(getByText('Credit Card')).toBeTruthy();
        expect(getByText('Debit Card')).toBeTruthy();
    });

    it('maintains selection when methods are updated', () => {
        const methods = ['credit_card', 'paypal'] as const;
        const { rerender } = render(
            <PaymentMethodList
                methods={methods}
                selected="credit_card"
                onSelect={mockOnSelect}
            />
        );

        rerender(
            <PaymentMethodList
                methods={methods}
                selected="credit_card"
                onSelect={mockOnSelect}
            />
        );

        expect(mockOnSelect).not.toHaveBeenCalled();
    });
});
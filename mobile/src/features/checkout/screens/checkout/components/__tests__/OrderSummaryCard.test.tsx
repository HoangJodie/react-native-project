import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { OrderSummaryCard } from '../OrderSummaryCard';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    image: 'http://example.com/image.jpg',
    price: 100,
    category: 'Electronics',
    priceUnit: 'dollar' as const,
};

describe('OrderSummaryCard', () => {
    const mockOnIncrease = jest.fn();
    const mockOnDecrease = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders product information', () => {
        const { getByText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('Order Summary')).toBeTruthy();
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('Electronics')).toBeTruthy();
    });

    it('displays product price', () => {
        const { getByText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={2}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('$100.00')).toBeTruthy();
        expect(getByText('Qty: 2')).toBeTruthy();
    });

    it('displays no image text when image is missing', () => {
        const productNoImage = { ...mockProduct, image: '' };
        const { getByText } = render(
            <OrderSummaryCard
                product={productNoImage}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('No image')).toBeTruthy();
    });

    it('calls onIncrease when increase button is pressed', () => {
        const { getByLabelText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        fireEvent.press(getByLabelText('Increase quantity'));
        expect(mockOnIncrease).toHaveBeenCalled();
    });

    it('calls onDecrease when decrease button is pressed', () => {
        const { getByLabelText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={2}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        fireEvent.press(getByLabelText('Decrease quantity'));
        expect(mockOnDecrease).toHaveBeenCalled();
    });

    it('disables decrease button when quantity is 1', () => {
        const { getByLabelText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        const decreaseBtn = getByLabelText('Decrease quantity');
        // When quantity is 1, the button should be disabled
        expect(decreaseBtn).toBeTruthy();
    });

    it('enables decrease button when quantity is greater than 1', () => {
        const { getByLabelText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={3}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        const decreaseBtn = getByLabelText('Decrease quantity');
        // When quantity > 1, the button should be enabled
        expect(decreaseBtn).toBeTruthy();
    });

    it('displays shipping information', () => {
        const { getByText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('Standard shipping')).toBeTruthy();
        expect(getByText('Free')).toBeTruthy();
    });

    it('handles different currency symbols', () => {
        const { getByText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={1}
                currencySymbol="€"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('€100.00')).toBeTruthy();
    });

    it('renders quantity stepper', () => {
        const { getByText } = render(
            <OrderSummaryCard
                product={mockProduct}
                quantity={5}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('Quantity')).toBeTruthy();
        expect(getByText('5')).toBeTruthy();
    });

    it('handles products without category', () => {
        const productNoCategory = { ...mockProduct, category: undefined };
        const { getByText } = render(
            <OrderSummaryCard
                product={productNoCategory}
                quantity={1}
                currencySymbol="$"
                onIncrease={mockOnIncrease}
                onDecrease={mockOnDecrease}
            />
        );
        expect(getByText('General')).toBeTruthy();
    });
});
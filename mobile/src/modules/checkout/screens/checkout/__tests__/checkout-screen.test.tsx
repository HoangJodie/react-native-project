import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { CheckoutScreen } from '../checkout-screen';

jest.mock('../../../../../shared/components/TopBar', () => {
    const { Text } = require('react-native');
    return function MockTopBar(props: any) {
        return <Text onPress={props.onLeftPress} testID="topbar">TopBar</Text>;
    };
});

jest.mock('../../../hooks/usePaymentMethods');
jest.mock('../../../hooks/useCreateOrder');
jest.mock('../components/OrderSummaryCard', () => ({
    OrderSummaryCard: function MockOrderSummary() {
        return <></>;
    },
}));
jest.mock('../components/AddressSection', () => ({
    AddressSection: function MockAddressSection() {
        return <></>;
    },
}));
jest.mock('../components/PaymentMethodList', () => ({
    PaymentMethodList: function MockPaymentMethodList() {
        return <></>;
    },
}));
jest.mock('../components/CheckoutFooter', () => ({
    CheckoutFooter: function MockCheckoutFooter(props: any) {
        const { TouchableOpacity, Text } = require('react-native');
        return <TouchableOpacity onPress={props.onConfirm} testID="confirm-btn"><Text>Confirm</Text></TouchableOpacity>;
    },
}));

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const usePaymentMethods = require('../../../hooks/usePaymentMethods').usePaymentMethods as jest.Mock;
const useCreateOrder = require('../../../hooks/useCreateOrder').useCreateOrder as jest.Mock;

const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Description',
    image: 'http://example.com/image.jpg',
    price: 100,
    category: 'Electronics',
    priceUnit: 'dollar' as const,
};

const baseRoute = {
    key: 'checkout',
    name: 'Checkout' as const,
    params: { product: mockProduct },
};

const navigation = {
    goBack: jest.fn(),
    popToTop: jest.fn(),
};

describe('CheckoutScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Alert, 'alert').mockImplementation(() => { });

        usePaymentMethods.mockReturnValue({
            data: ['credit_card', 'paypal'],
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        });

        useCreateOrder.mockReturnValue({
            mutateAsync: jest.fn().mockResolvedValue({ id: 123 }),
            isPending: false,
        });
    });

    it('renders checkout screen', () => {
        const { getByTestId } = render(
            <CheckoutScreen route={baseRoute} navigation={navigation as any} />
        );
        expect(getByTestId('topbar')).toBeTruthy();
    });

    it('navigates back on TopBar left press', () => {
        const { getByTestId } = render(
            <CheckoutScreen route={baseRoute} navigation={navigation as any} />
        );
        fireEvent.press(getByTestId('topbar'));
        expect(navigation.goBack).toHaveBeenCalled();
    });

    it('renders confirm button', () => {
        const { getByTestId } = render(
            <CheckoutScreen route={baseRoute} navigation={navigation as any} />
        );
        expect(getByTestId('confirm-btn')).toBeTruthy();
    });
});
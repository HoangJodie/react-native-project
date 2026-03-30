import React, { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TopBar from '../../../../shared/components/TopBar';
import { ShopStackParamList } from '../../../../app/navigation/types';
import { checkoutStyles as styles } from './checkout-screen.styles';
import { OrderSummaryCard } from './components/OrderSummaryCard';
import { AddressSection } from './components/AddressSection';
import { PaymentMethodList } from './components/PaymentMethodList';
import { CheckoutFooter } from './components/CheckoutFooter';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import type { PaymentMethod } from '../../types';
import type { ITextInput } from '../../../../shared/types/text-input';

type Props = NativeStackScreenProps<ShopStackParamList, 'Checkout'>;

const currencySymbol: Record<string, string> = {
    dollar: '$',
    euro: '\u20AC',
    inr: '\u20B9',
};

const CheckoutScreen: React.FC<Props> = ({ route, navigation }) => {
    const { product } = route.params;
    const [quantity, setQuantity] = useState<number>(1);
    const [address, setAddress] = useState<ITextInput>({ value: '', error: '' });
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [paymentValidation, setPaymentValidation] = useState<string>('');

    const paymentMethodsQuery = usePaymentMethods();
    const createOrder = useCreateOrder();

    const pricePrefix = currencySymbol[product.priceUnit] ?? '';

    const totalAmount = useMemo(() => Number((product.price * quantity).toFixed(2)), [product.price, quantity]);

    useEffect(() => {
        if (!paymentMethod && paymentMethodsQuery.data?.length) {
            setPaymentMethod(paymentMethodsQuery.data[0]);
            setPaymentValidation('');
        }
    }, [paymentMethodsQuery.data, paymentMethod]);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
        setSubmitError(null);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
        setSubmitError(null);
    };

    const validate = () => {
        let isValid = true;
        setSubmitError(null);
        setPaymentValidation('');
        setAddress((prev) => ({ ...prev, error: '' }));

        if (!address.value.trim()) {
            setAddress((prev) => ({ ...prev, error: 'Shipping address is required' }));
            isValid = false;
        }
        if (!paymentMethod) {
            setPaymentValidation('Please select a payment method');
            isValid = false;
        }
        if (quantity < 1) {
            setSubmitError('Quantity must be at least 1');
            isValid = false;
        }

        return isValid;
    };

    const handleConfirm = async () => {
        if (!validate()) return;

        try {
            const payload = {
                items: [{ productId: product.id, quantity, price: product.price }],
                totalAmount,
                shippingAddress: address.value.trim(),
                paymentMethod: paymentMethod as PaymentMethod,
            };
            const order = await createOrder.mutateAsync(payload);
            Alert.alert('Order created', `Order #${order?.id ?? 'new'} placed successfully.`, [
                {
                    text: 'Continue Shopping',
                    onPress: () => navigation.popToTop(),
                },
                { text: 'Close' },
            ]);
        } catch (error) {
            setSubmitError('Could not create order. Please try again.');
        }
    };

    const paymentError = paymentMethodsQuery.isError
        ? 'Unable to load payment methods right now.'
        : null;

    const isSubmitting = createOrder.isPending;

    return (
        <View style={styles.screen}>
            <TopBar title="Checkout" onLeftPress={navigation.goBack} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <OrderSummaryCard
                    product={product}
                    quantity={quantity}
                    currencySymbol={pricePrefix}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                />

                <AddressSection
                    value={address.value}
                    onChange={(text) => setAddress({ value: text, error: '' })}
                    error={address.error}
                />

                <PaymentMethodList
                    methods={paymentMethodsQuery.data}
                    selected={paymentMethod}
                    loading={paymentMethodsQuery.isLoading}
                    error={paymentError}
                    validationError={paymentValidation}
                    onSelect={(method) => {
                        setPaymentMethod(method);
                        setPaymentValidation('');
                    }}
                    onRetry={paymentMethodsQuery.refetch}
                />

                {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}
            </ScrollView>

            <CheckoutFooter
                currencySymbol={pricePrefix}
                totalAmount={totalAmount}
                onConfirm={handleConfirm}
                loading={isSubmitting}
                disabled={isSubmitting || paymentMethodsQuery.isLoading}
            />
        </View>
    );
};

export { CheckoutScreen };

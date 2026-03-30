import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { PaymentMethod } from '../../../types';
import { checkoutStyles as styles } from '../checkout-screen.styles';

type Props = {
    methods?: PaymentMethod[];
    selected?: PaymentMethod | null;
    loading?: boolean;
    error?: string | null;
    onSelect: (method: PaymentMethod) => void;
    onRetry?: () => void;
    validationError?: string;
};

const labelFor = (method: PaymentMethod) => {
    switch (method) {
        case 'credit_card':
            return 'Credit Card';
        case 'debit_card':
            return 'Debit Card';
        case 'paypal':
            return 'PayPal';
        case 'cash_on_delivery':
            return 'Cash on Delivery';
        default:
            return method.replace(/_/g, ' ');
    }
};

const subtitleFor = (method: PaymentMethod) => {
    switch (method) {
        case 'credit_card':
            return 'Visa, Mastercard, AMEX';
        case 'debit_card':
            return 'Any bank debit card';
        case 'paypal':
            return 'Pay directly with PayPal';
        case 'cash_on_delivery':
            return 'Pay in cash when you receive the order';
        default:
            return 'Available';
    }
};

const iconFor = (method: PaymentMethod) => {
    switch (method) {
        case 'credit_card':
        case 'debit_card':
            return 'credit-card';
        case 'paypal':
            return 'globe';
        case 'cash_on_delivery':
            return 'package';
        default:
            return 'credit-card';
    }
};

export const PaymentMethodList: React.FC<Props> = ({
    methods = [],
    selected,
    loading,
    error,
    onSelect,
    onRetry,
    validationError,
}) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <Text style={styles.sectionHint}>Choose how to pay</Text>
            </View>

            {loading ? (
                <View style={{ paddingVertical: 10 }}>
                    <ActivityIndicator color="#0CD1E8" />
                </View>
            ) : error ? (
                <View>
                    <Text style={styles.errorText}>{error}</Text>
                    {onRetry ? (
                        <TouchableOpacity onPress={onRetry}>
                            <Text style={styles.retryLink}>Tap to retry</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            ) : methods.length === 0 ? (
                <Text style={styles.sectionHint}>No payment methods available right now.</Text>
            ) : (
                methods.map((method) => {
                    const active = selected === method;
                    return (
                        <TouchableOpacity
                            key={method}
                            style={[
                                styles.paymentCard,
                                active && { borderColor: '#0CD1E8', backgroundColor: '#ECFEFF' },
                            ]}
                            activeOpacity={0.9}
                            onPress={() => onSelect(method)}
                        >
                            <View style={styles.paymentRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <View
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: 10,
                                            backgroundColor: '#E0F7FB',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon name={iconFor(method)} size={18} color="#0F172A" />
                                    </View>
                                    <View style={{ marginLeft: 12, flex: 1 }}>
                                        <Text style={styles.paymentLabel}>{labelFor(method)}</Text>
                                        <Text style={styles.paymentMeta}>{subtitleFor(method)}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.radioOuter,
                                        active && { borderColor: '#0CD1E8' },
                                    ]}
                                >
                                    {active ? <View style={styles.radioInner} /> : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            )}
            {validationError ? <Text style={styles.errorText}>{validationError}</Text> : null}
        </View>
    );
};

export default PaymentMethodList;

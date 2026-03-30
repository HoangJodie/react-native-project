import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { checkoutStyles as styles } from '../checkout-screen.styles';

type Props = {
    currencySymbol: string;
    totalAmount: number;
    onConfirm: () => void;
    disabled?: boolean;
    loading?: boolean;
};

export const CheckoutFooter: React.FC<Props> = ({
    currencySymbol,
    totalAmount,
    onConfirm,
    disabled = false,
    loading = false,
}) => {
    return (
        <View style={styles.footer}>
            <View>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                    {currencySymbol}
                    {totalAmount.toFixed(2)}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.confirmButton, disabled && { opacity: 0.6 }]}
                onPress={onConfirm}
                disabled={disabled}
                activeOpacity={0.9}
            >
                {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.confirmText}>Confirm Purchase</Text>}
            </TouchableOpacity>
            <Text style={styles.secureNote}>Secure SSL encrypted checkout</Text>
        </View>
    );
};

export default CheckoutFooter;

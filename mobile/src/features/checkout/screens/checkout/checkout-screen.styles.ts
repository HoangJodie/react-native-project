import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Styles = {
    screen: ViewStyle;
    scrollContent: ViewStyle;
    sectionCard: ViewStyle;
    sectionHeader: ViewStyle;
    sectionTitle: TextStyle;
    sectionHint: TextStyle;
    summaryRow: ViewStyle;
    productImage: ImageStyle;
    productInfo: ViewStyle;
    productName: TextStyle;
    productMeta: TextStyle;
    priceRow: ViewStyle;
    price: TextStyle;
    priceSub: TextStyle;
    quantityRow: ViewStyle;
    qtyLabel: TextStyle;
    stepper: ViewStyle;
    stepperButton: ViewStyle;
    stepperText: TextStyle;
    quantityValue: TextStyle;
    divider: ViewStyle;
    addressInput: TextStyle;
    paymentCard: ViewStyle;
    paymentRow: ViewStyle;
    paymentLabel: TextStyle;
    paymentMeta: TextStyle;
    radioOuter: ViewStyle;
    radioInner: ViewStyle;
    errorText: TextStyle;
    retryLink: TextStyle;
    footer: ViewStyle;
    totalLabel: TextStyle;
    totalValue: TextStyle;
    confirmButton: ViewStyle;
    confirmText: TextStyle;
    secureNote: TextStyle;
};

export const checkoutStyles = StyleSheet.create<Styles>({
    screen: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 160,
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    sectionHint: {
        color: '#6B7280',
        fontSize: 13,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    productMeta: {
        color: '#6B7280',
        marginTop: 4,
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    priceSub: {
        fontSize: 13,
        color: '#6B7280',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    qtyLabel: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepperButton: {
        width: 34,
        height: 34,
        borderRadius: 10,
        borderWidth: 1.2,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
    },
    stepperText: {
        fontSize: 18,
        color: '#0F172A',
        fontWeight: '700',
    },
    quantityValue: {
        marginHorizontal: 14,
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    addressInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    paymentCard: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        backgroundColor: '#F9FBFF',
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    paymentLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    paymentMeta: {
        color: '#6B7280',
        marginTop: 4,
        fontSize: 12,
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.8,
        borderColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0CD1E8',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 13,
        marginTop: 4,
    },
    retryLink: {
        color: '#0CD1E8',
        fontWeight: '700',
        marginTop: 8,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
    },
    totalLabel: {
        color: '#6B7280',
        fontSize: 13,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 4,
    },
    confirmButton: {
        marginTop: 14,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#0CD1E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secureNote: {
        color: '#94A3B8',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
});

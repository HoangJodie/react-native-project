import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { Product } from '../../../../product/type';
import { checkoutStyles as styles } from '../checkout-screen.styles';

type Props = {
    product: Product;
    quantity: number;
    currencySymbol: string;
    onIncrease: () => void;
    onDecrease: () => void;
};

export const OrderSummaryCard: React.FC<Props> = ({ product, quantity, currencySymbol, onIncrease, onDecrease }) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <Text style={styles.sectionHint}>Standard shipping</Text>
            </View>

            <View style={styles.summaryRow}>
                {product.image ? (
                    <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
                ) : (
                    <View style={[styles.productImage, { alignItems: 'center', justifyContent: 'center' }]}>
                        <Text style={{ color: '#94A3B8', fontSize: 12 }}>No image</Text>
                    </View>
                )}

                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                        {product.name}
                    </Text>
                    <Text style={styles.productMeta} numberOfLines={1}>
                        {product.category ?? 'General'}
                    </Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            {currencySymbol}
                            {product.price.toFixed(2)}
                        </Text>
                        <Text style={styles.priceSub}>Qty: {quantity}</Text>
                    </View>
                    <Text style={[styles.priceSub, { marginTop: 2 }]}>
                        Standard Shipping · <Text style={{ color: '#10B981' }}>Free</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.quantityRow}>
                <Text style={styles.qtyLabel}>Quantity</Text>
                <View style={styles.stepper}>
                    <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={onDecrease}
                        disabled={quantity <= 1}
                        accessibilityLabel="Decrease quantity"
                    >
                        <Icon name="minus" size={16} color={quantity <= 1 ? '#9CA3AF' : '#0F172A'} />
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={onIncrease}
                        accessibilityLabel="Increase quantity"
                    >
                        <Icon name="plus" size={16} color="#0F172A" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default OrderSummaryCard;

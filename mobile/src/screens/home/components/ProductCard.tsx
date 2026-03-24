import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Product } from '../../../features/product/type';
import { homeStyles } from '../home-screen.styles';

type Props = {
    product: Product;
    onAdd?: (item: Product) => void;
};

const currencySymbol = {
    dollar: '$',
    euro: '€',
    inr: '₹',
};

export const ProductCard: React.FC<Props> = ({ product, onAdd }) => (
    <View style={homeStyles.card}>
        <View>
            {product.image ? (
                <Image source={{ uri: product.image }} style={homeStyles.cardImage} resizeMode="cover" />
            ) : (
                <View style={[homeStyles.cardImage, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#94A3B8' }}>No image</Text>
                </View>
            )}
            {product.tag ? (
                <View style={[homeStyles.badge, { backgroundColor: '#0CD1E8' }]}>
                    <Text style={homeStyles.badgeText}>{product.tag}</Text>
                </View>
            ) : null}
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
                <Icon name={product.isFavorite ? 'heart' : 'heart'} size={18} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
        <View style={homeStyles.cardBody}>
            <Text style={homeStyles.cardTitle} numberOfLines={1}>
                {product.name}
            </Text>
            <Text style={homeStyles.cardSubtitle} numberOfLines={1}>
                {product.category ?? product.description}
            </Text>
            <View style={homeStyles.priceRow}>
                <View>
                    <Text style={homeStyles.priceText}>
                        {currencySymbol[product.priceUnit] ?? ''}
                        {product.price.toFixed(2)}
                    </Text>
                    {product.oldPrice ? (
                        <Text style={[homeStyles.priceUnit, { textDecorationLine: 'line-through', color: '#9CA3AF' }]}>
                            {currencySymbol[product.priceUnit] ?? ''}
                            {product.oldPrice.toFixed(2)}
                        </Text>
                    ) : null}
                </View>
                <TouchableOpacity style={homeStyles.addButton} onPress={() => onAdd?.(product)}>
                    <Icon name="plus" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

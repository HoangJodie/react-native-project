import React, { useMemo } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopBar from '../../../../shared/components/TopBar';
import { detailStyles as styles } from './product-detail.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../../../app/navigation/types';
import { useProductDetail } from '../../queries';
import { ProductReview } from '../../type';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetail'>;

const currencySymbol: Record<string, string> = {
    dollar: '$',
    euro: '€',
    inr: '₹',
};

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { productId, product: initialProduct } = route.params;

    const { product, productLoading, reviews, reviewsLoading, rating, reviewCount } = useProductDetail(
        productId,
        initialProduct
    );

    const displayProduct = product ?? initialProduct;

    const featureItems = useMemo(
        () => [
            { label: 'Category', value: displayProduct?.category ?? 'General' },
            { label: 'Price Unit', value: (displayProduct?.priceUnit ?? '').toUpperCase() },
            { label: 'Product ID', value: `#${displayProduct?.id ?? '-'}` },
            { label: 'Status', value: 'Available' },
        ],
        [displayProduct]
    );

    const handleShare = () => {
        if (!displayProduct) return;
        const message = `${displayProduct.name} - ${currencySymbol[displayProduct.priceUnit] ?? ''}${
            displayProduct.price
        }\n${displayProduct.description}`;
        Alert.alert('Share', message);
    };

    const handleBuy = () => {
        Alert.alert('Buy Now', 'Checkout flow is not wired yet in this demo.');
    };

    if (!displayProduct || productLoading) {
        return (
            <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0CD1E8" />
            </View>
        );
    }

    const pricePrefix = currencySymbol[displayProduct.priceUnit] ?? '';

    return (
        <View style={styles.screen}>
            <TopBar title="Product Details" onLeftPress={navigation.goBack} rightIcon="share-2" onRightPress={handleShare} />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.imageWrapper}>
                    {displayProduct.image ? (
                        <Image source={{ uri: displayProduct.image }} style={styles.productImage} resizeMode="cover" />
                    ) : (
                        <View style={[styles.productImage, { alignItems: 'center', justifyContent: 'center' }]}>
                            <Text style={{ color: '#94A3B8' }}>No image</Text>
                        </View>
                    )}
                    <View style={styles.dotsRow}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#0CD1E8' }} />
                        <View
                            style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB', marginLeft: 6 }}
                        />
                        <View
                            style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB', marginLeft: 6 }}
                        />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 16 }}>
                    {displayProduct.tag ? (
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{displayProduct.tag}</Text>
                        </View>
                    ) : null}

                    <View style={styles.titleRow}>
                        <View style={{ flex: 1, marginRight: 12 }}>
                            <Text style={styles.title}>{displayProduct.name}</Text>
                            <Text style={styles.subtitle}>{displayProduct.category ?? 'Uncategorized'}</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon name={displayProduct.isFavorite ? 'heart' : 'heart'} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingRow}>
                        <Icon name="star" size={16} color="#F59E0B" />
                        <Text style={[styles.ratingText, { marginLeft: 6 }]}>{rating ? rating.toFixed(1) : 'New'}</Text>
                        <Text style={[styles.ratingCount, { marginLeft: 6 }]}>
                            ({reviewCount} review{reviewCount === 1 ? '' : 's'})
                        </Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            {pricePrefix}
                            {displayProduct.price?.toFixed(2) ?? '--'}
                        </Text>
                        {displayProduct.oldPrice ? (
                            <Text style={[styles.oldPrice, { marginLeft: 12 }]}>
                                {pricePrefix}
                                {displayProduct.oldPrice.toFixed(2)}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                    </View>
                    <View style={styles.featureGrid}>
                        {featureItems.map((item, index) => (
                            <View
                                key={item.label}
                                style={[
                                    styles.featureItem,
                                    { marginRight: index % 2 === 0 ? 10 : 0, marginBottom: 10 },
                                ]}
                            >
                                <Text style={styles.featureLabel}>{item.label}</Text>
                                <Text style={styles.featureValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>Product Description</Text>
                    </View>
                    <Text style={styles.description}>{displayProduct.description}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>User Reviews</Text>
                        <Text style={styles.seeAll}>See All</Text>
                    </View>
                    {reviewsLoading && reviews.length === 0 ? (
                        <ActivityIndicator color="#0CD1E8" />
                    ) : reviews.length === 0 ? (
                        <Text style={styles.reviewBody}>No reviews yet.</Text>
                    ) : (
                        reviews.slice(0, 3).map((review) => <ReviewItem key={review.id} review={review} />)
                    )}
                </View>
                <View style={styles.pillSpacer} />
            </ScrollView>

            <View style={styles.ctaRow}>
                <TouchableOpacity style={styles.ghostButton} onPress={() => Alert.alert('Added to cart')}>
                    <Text style={styles.ghostText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.solidButton} onPress={handleBuy}>
                    <Text style={styles.solidText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ReviewItem: React.FC<{ review: ProductReview }> = ({ review }) => {
    const initials = `U${review.userId ?? ''}`;
    return (
        <View style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{initials.slice(0, 2)}</Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.reviewName}>User #{review.userId}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="star" size={14} color="#F59E0B" />
                                <Text style={[styles.reviewMeta, { marginLeft: 6 }]}>{review.rating}/5</Text>
                            </View>
                        </View>
                    </View>
            <Text style={styles.reviewBody}>{review.message}</Text>
        </View>
    );
};

export { ProductDetailScreen };

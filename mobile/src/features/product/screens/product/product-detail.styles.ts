import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Styles = {
    screen: ViewStyle;
    scroll: ViewStyle;
    imageWrapper: ViewStyle;
    productImage: ImageStyle;
    dotsRow: ViewStyle;
    tag: ViewStyle;
    tagText: TextStyle;
    titleRow: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
    ratingRow: ViewStyle;
    ratingText: TextStyle;
    ratingCount: TextStyle;
    priceRow: ViewStyle;
    price: TextStyle;
    oldPrice: TextStyle;
    section: ViewStyle;
    sectionTitleRow: ViewStyle;
    sectionTitle: TextStyle;
    seeAll: TextStyle;
    featureGrid: ViewStyle;
    featureItem: ViewStyle;
    featureLabel: TextStyle;
    featureValue: TextStyle;
    description: TextStyle;
    reviewCard: ViewStyle;
    reviewHeader: ViewStyle;
    avatar: ViewStyle;
    avatarText: TextStyle;
    reviewName: TextStyle;
    reviewMeta: TextStyle;
    reviewBody: TextStyle;
    ctaRow: ViewStyle;
    ghostButton: ViewStyle;
    ghostText: TextStyle;
    solidButton: ViewStyle;
    solidText: TextStyle;
    pillSpacer: ViewStyle;
    badgeRow: ViewStyle;
};

export const detailStyles = StyleSheet.create<Styles>({
    screen: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scroll: {
        paddingBottom: 120,
    },
    imageWrapper: {
        backgroundColor: '#FFFFFF',
        marginBottom: 12,
    },
    productImage: {
        width: '100%',
        height: 260,
        backgroundColor: '#E5E7EB',
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    tag: {
        alignSelf: 'flex-start',
        backgroundColor: '#0CD1E8',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: 12,
    },
    tagText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
        flexShrink: 1,
    },
    subtitle: {
        marginTop: 4,
        color: '#6B7280',
        fontSize: 13,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingText: {
        color: '#F59E0B',
        fontWeight: '700',
    },
    ratingCount: {
        color: '#6B7280',
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    price: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0F172A',
    },
    oldPrice: {
        fontSize: 15,
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    seeAll: {
        color: '#0CD1E8',
        fontWeight: '600',
        fontSize: 13,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    featureItem: {
        flexBasis: '48%',
        backgroundColor: '#F7F9FC',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    featureLabel: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 6,
    },
    featureValue: {
        color: '#0F172A',
        fontWeight: '700',
        fontSize: 14,
    },
    description: {
        color: '#4B5563',
        fontSize: 14,
        lineHeight: 20,
    },
    reviewCard: {
        backgroundColor: '#F7F9FC',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E0F7FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#0F172A',
        fontWeight: '700',
    },
    reviewName: {
        fontWeight: '700',
        color: '#0F172A',
    },
    reviewMeta: {
        color: '#6B7280',
        fontSize: 12,
    },
    reviewBody: {
        color: '#4B5563',
        fontSize: 13,
        lineHeight: 18,
    },
    ctaRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: '#FFFFFF',
    },
    ghostButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        borderWidth: 1.2,
        borderColor: '#0CD1E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ghostText: {
        color: '#0CD1E8',
        fontWeight: '700',
        fontSize: 15,
    },
    solidButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#0CD1E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    solidText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    pillSpacer: {
        height: 12,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
});

import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

type IHomeStyles = {
    screen: ViewStyle;
    headerRow: ViewStyle;
    headerTitle: TextStyle;
    iconRow: ViewStyle;
    iconButton: ViewStyle;
    searchBar: ViewStyle;
    searchInput: TextStyle;
    filterRow: ViewStyle;
    filterScroll: ViewStyle;
    filterChip: ViewStyle;
    filterChipActive: ViewStyle;
    filterChipText: TextStyle;
    filterChipTextActive: TextStyle;
    grid: ViewStyle;
    card: ViewStyle;
    cardImage: ImageStyle;
    cardBody: ViewStyle;
    cardTitle: TextStyle;
    cardSubtitle: TextStyle;
    priceRow: ViewStyle;
    priceText: TextStyle;
    priceUnit: TextStyle;
    addButton: ViewStyle;
    badge: ViewStyle;
    badgeText: TextStyle;
    emptyState: ViewStyle;
    emptyText: TextStyle;
};

export const homeStyles = StyleSheet.create<IHomeStyles>({
    screen: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#E2F7FB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F6',
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 8,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: '#0F172A',
        fontSize: 15,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        height: 50,
    },
    filterScroll: {
        flexGrow: 0,
        height: 50,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 18,
        backgroundColor: '#EEF2F6',
        marginRight: 8,
    },
    filterChipActive: {
        backgroundColor: '#0CD1E8',
    },
    filterChipText: {
        color: '#4B5563',
        fontWeight: '600',
        fontSize: 13,
    },
    filterChipTextActive: {
        color: '#FFFFFF',
    },
    grid: {
        flex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#E5E7EB',
    },
    cardBody: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    cardSubtitle: {
        color: '#6B7280',
        marginTop: 2,
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    priceUnit: {
        fontSize: 12,
        color: '#06B6D4',
        marginLeft: 4,
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#0CD1E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#0CD1E8',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    emptyText: {
        color: '#6B7280',
        fontSize: 14,
    },
});

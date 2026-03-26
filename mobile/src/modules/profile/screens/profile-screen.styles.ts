import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    actionCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        paddingHorizontal: 16,
        elevation: 1,
    },
    statusBanner: {
        marginHorizontal: 16,
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#FEF3C7',
        borderWidth: 1,
        borderColor: '#F59E0B',
    },
    statusText: {
        color: '#92400E',
        fontSize: 13,
        fontWeight: '600',
    },
    errorText: {
        color: '#B91C1C',
        fontSize: 13,
        fontWeight: '600',
        marginHorizontal: 16,
        marginTop: 12,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F9FC',
    },
});


import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 16,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    edit: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0CA5E9',
    },
    fieldLabel: {
        fontSize: 11,
        color: '#6B7280',
        marginBottom: 6,
        letterSpacing: 0.2,
    },
    fieldBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 14,
    },
    fieldValue: {
        fontSize: 14,
        color: '#0F172A',
    },
    input: {
        paddingVertical: 1,
        fontSize: 14,
        color: '#0F172A',
        height: 20,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    saveButton: {
        backgroundColor: '#0CA5E9',
        marginLeft: 8,
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
        marginRight: 8,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    buttonTextPrimary: {
        color: '#fff',
    },
    errorText: {
        color: '#B91C1C',
        fontSize: 12,
        marginBottom: 8,
    },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthUser } from '../../../features/auth/type';

type Props = {
    user: AuthUser;
    onEdit?: () => void;
};

const FieldRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <View style={{ marginBottom: 14 }}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldBox}>
            <Text style={styles.fieldValue}>{value ?? '—'}</Text>
        </View>
    </View>
);

const AccountDetailsCard: React.FC<Props> = ({ user, onEdit }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>Account Details</Text>
                <Text style={styles.edit} onPress={onEdit}>
                    Edit Details
                </Text>
            </View>
            <FieldRow label="EMAIL ADDRESS" value={user.email} />
            <FieldRow label="FIRST NAME" value={user.firstName} />
            <FieldRow label="LAST NAME" value={user.lastName} />
            <FieldRow label="AGE" value={user.age ? String(user.age) : undefined} />
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
    fieldValue: {
        fontSize: 14,
        color: '#0F172A',
    },
});

export default AccountDetailsCard;

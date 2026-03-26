import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    icon: string;
    label: string;
    onPress?: () => void;
    showBorder?: boolean;
};

const ProfileActionRow: React.FC<Props> = ({ icon, label, onPress, showBorder = true }) => (
    <TouchableOpacity style={[styles.row, !showBorder && { borderBottomWidth: 0 }]} onPress={onPress}>
        <View style={styles.rowLeft}>
            <Icon name={icon} size={18} color="#0F172A" />
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <Icon name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
    },
});

export default ProfileActionRow;

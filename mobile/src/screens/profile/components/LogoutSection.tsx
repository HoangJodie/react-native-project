import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    onLogout: () => void;
};

const LogoutSection: React.FC<Props> = ({ onLogout }) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
            <Icon name="log-out" size={18} color="#EF4444" />
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '700',
    },
});

export default LogoutSection;

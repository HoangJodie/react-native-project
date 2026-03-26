import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    title: string;
    leftIcon?: string;
    rightIcon?: string;
    onLeftPress?: () => void;
    onRightPress?: () => void;
};

const TopBar: React.FC<Props> = ({ title, leftIcon = 'arrow-left', rightIcon, onLeftPress, onRightPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLeftPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {leftIcon ? <Icon name={leftIcon} size={20} color="#0F172A" /> : <View style={{ width: 20 }} />}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {rightIcon ? <Icon name={rightIcon} size={20} color="#0F172A" /> : <View style={{ width: 20 }} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
});

export default TopBar;

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../signin-screen.styles';

type Props = {
    active?: 'login' | 'signup';
    onChange?: (value: 'login' | 'signup') => void;
};

export const AuthSegment: React.FC<Props> = ({ active = 'login', onChange }) => (
    <View style={styles.segment}>
        <TouchableOpacity
            style={[styles.segmentButton, active === 'login' && styles.segmentActive]}
            onPress={() => onChange?.('login')}
        >
            <Text style={active === 'login' ? styles.segmentActiveText : styles.segmentText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.segmentButton, active === 'signup' && styles.segmentActive]}
            onPress={() => onChange?.('signup')}
        >
            <Text style={active === 'signup' ? styles.segmentActiveText : styles.segmentText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
);

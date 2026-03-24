import React from 'react';
import { Switch, Text, View } from 'react-native';
import { styles } from '../signin-screen.styles';

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
};

export const BiometricToggle: React.FC<Props> = ({ value, onChange }) => (
    <View style={styles.biometricRow}>
        <Switch
            value={value}
            onValueChange={onChange}
            thumbColor={value ? '#0CD1E8' : '#f4f3f4'}
            trackColor={{ true: '#8CF1FF', false: '#dcdcdc' }}
        />
        <Text style={styles.biometricText}>Use biometrics for faster login</Text>
    </View>
);

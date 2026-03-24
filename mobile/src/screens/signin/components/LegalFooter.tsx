import React from 'react';
import { Text } from 'react-native';
import { styles } from '../signin-screen.styles';

export const LegalFooter = () => (
    <Text style={styles.footerText}>
        By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
    </Text>
);

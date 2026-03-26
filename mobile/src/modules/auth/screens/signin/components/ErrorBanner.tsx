import React from 'react';
import { Text } from 'react-native';
import { styles } from '../signin-screen.styles';

type Props = {
    message?: string | null;
};

export const ErrorBanner: React.FC<Props> = ({ message }) => {
    if (!message) return null;
    return <Text style={styles.errorText}>{message}</Text>;
};

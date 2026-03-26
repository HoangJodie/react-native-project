import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../signin-screen.styles';

export const SignInHeader = () => (
    <>
        <View style={styles.iconCircle}>
            <Text style={styles.iconLock}></Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Please enter your details</Text>
    </>
);

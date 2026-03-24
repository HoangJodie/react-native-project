import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../signin-screen.styles';

export const SocialButtons = () => (
    <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
            <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
    </View>
);

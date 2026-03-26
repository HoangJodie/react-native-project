import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImageAssets from '../../../../../shared/assets/images';
import { styles } from '../signin-screen.styles';

export const SocialButtons = () => (
    <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
            <Image source={ImageAssets.google} style={styles.socialIcon} />
            <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
            <Image source={ImageAssets.facebook} style={styles.socialIcon} />
            <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
    </View>
);

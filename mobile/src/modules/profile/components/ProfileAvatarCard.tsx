import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { Profile } from '../types';

type Props = {
    user: Profile;
};

const ProfileAvatarCard: React.FC<Props> = ({ user }) => {
    const initials = `${user.firstName?.[0] ?? user.username?.[0] ?? 'U'}${user.lastName?.[0] ?? ''}`.toUpperCase();
    return (
        <View style={styles.card}>
            <View style={styles.avatarWrapper}>
                {user.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                        <Text style={styles.initials}>{initials}</Text>
                    </View>
                )}
                <View style={styles.badge}>
                    <Icon name="edit-2" size={14} color="#fff" />
                </View>
            </View>
            <Text style={styles.name}>{`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username}</Text>
            <Text style={styles.username}>@{user.username}</Text>
            <View style={styles.tag}>
                <Text style={styles.tagText}>PREMIUM MEMBER</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginTop: 12,
        elevation: 1,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#E0F2FE',
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    initials: {
        fontSize: 28,
        color: '#0F172A',
        fontWeight: '700',
    },
    badge: {
        position: 'absolute',
        right: 4,
        bottom: 4,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#0CD1E8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    username: {
        marginTop: 4,
        fontSize: 13,
        color: '#6B7280',
    },
    tag: {
        marginTop: 8,
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0CA5E9',
    },
});

export default ProfileAvatarCard;

import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import TopBar from '../../../shared/components/TopBar';
import ProfileAvatarCard from '../components/ProfileAvatarCard';
import AccountDetailsCard from '../components/AccountDetailsCard';
import ProfileActionRow from '../components/ProfileActionRow';
import LogoutSection from '../components/LogoutSection';
import { useAuth } from '../../auth/useAuth';
import { useProfile } from '../useProfile';
import { styles } from './profile-screen.styles';
import type { Profile } from '../types';

const ProfileScreen: React.FC = () => {
    const { logout } = useAuth();
    const { profile, loading, error, syncError, updateProfile, updating } = useProfile();
    const handleLogout = () => {
        void logout();
    };

    if (loading && !profile) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0CA5E9" />
            </View>
        );
    }

    const currentUser: Profile =
        profile ?? {
            id: 0,
            username: 'guest',
            firstName: 'Guest',
            lastName: '',
            email: 'guest@example.com',
            avatar: undefined,
            phone: undefined,
            address: undefined,
            updatedAt: new Date(0).toISOString(),
            pendingSync: false,
        };

    return (
        <View style={styles.container}>
            <TopBar title="Profile Settings" rightIcon="settings" />
            {syncError ? (
                <View style={styles.statusBanner}>
                    <Text style={styles.statusText}>{syncError}</Text>
                </View>
            ) : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <ProfileAvatarCard user={currentUser} />
                <AccountDetailsCard user={currentUser} onSubmit={updateProfile} loading={updating} />

                <View style={styles.actionCard}>
                    <ProfileActionRow icon="shopping-bag" label="Order History" />
                </View>

                <LogoutSection onLogout={handleLogout} />
            </ScrollView>
        </View>
    );
};

export { ProfileScreen };

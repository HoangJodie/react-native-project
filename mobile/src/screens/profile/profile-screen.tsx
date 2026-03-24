import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import TopBar from '../../components/TopBar';
import ProfileAvatarCard from './components/ProfileAvatarCard';
import AccountDetailsCard from './components/AccountDetailsCard';
import ProfileActionRow from './components/ProfileActionRow';
import LogoutSection from './components/LogoutSection';
import { useAuth } from '../../features/auth/useAuth';

const ProfileScreen: React.FC = () => {
    const { user, restoreSession, logout } = useAuth();

    useEffect(() => {
        if (!user) {
            restoreSession();
        }
    }, [user, restoreSession]);

    const currentUser = user ?? {
        username: 'guest',
        firstName: 'Guest',
        lastName: '',
        email: 'guest@example.com',
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F7F9FC' }}>
            <TopBar title="Profile Settings" rightIcon="settings" />
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                <ProfileAvatarCard user={currentUser as any} />
                <AccountDetailsCard user={currentUser as any} onEdit={() => {}} />

                <View
                    style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 16,
                        marginTop: 16,
                        borderRadius: 16,
                        paddingHorizontal: 16,
                        elevation: 1,
                    }}
                >
                    <ProfileActionRow icon="shopping-bag" label="Order History" />
                </View>

                <LogoutSection onLogout={logout} />
            </ScrollView>
        </View>
    );
};

export { ProfileScreen };

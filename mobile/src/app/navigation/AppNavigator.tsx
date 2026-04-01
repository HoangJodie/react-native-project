import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { SignInScreen } from '../../features/auth/screens/signin/signin-screen';
import MainNavigator from './MainNavigator';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const { user, initialized, restoreSession } = useAuth();

    useEffect(() => {
        restoreSession();
    }, []);

    if (!initialized) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                ) : (
                    <Stack.Screen name="Main" component={MainNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

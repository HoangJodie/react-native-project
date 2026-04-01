import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/signin/signin-screen';
import { authRoutes } from './authRoutes';

const Stack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={authRoutes.signIn} component={SignInScreen} />
      {/* Add register, forgot-password screens here when implemented */}
    </Stack.Navigator>
  );
};
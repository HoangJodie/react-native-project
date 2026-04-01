import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/profile-screen';
import { profileRoutes } from './profileRoutes';

const Stack = createNativeStackNavigator();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={profileRoutes.profile} component={ProfileScreen} />
      {/* Add edit profile screen here when implemented */}
    </Stack.Navigator>
  );
};
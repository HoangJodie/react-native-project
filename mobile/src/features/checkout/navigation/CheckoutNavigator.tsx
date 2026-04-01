import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CheckoutScreen } from '../screens/checkout/checkout-screen';
import { checkoutRoutes } from './checkoutRoutes';

const Stack = createNativeStackNavigator();

export const CheckoutNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={checkoutRoutes.checkout} component={CheckoutScreen} />
      {/* Add payment, confirmation screens here when implemented */}
    </Stack.Navigator>
  );
};
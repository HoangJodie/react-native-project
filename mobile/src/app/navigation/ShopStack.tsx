import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../modules/product/screens/home/home-screen';
import { ProductDetailScreen } from '../../modules/product/screens/product/product-detail-screen';
import { CheckoutScreen } from '../../modules/checkout/screens/checkout/checkout-screen';
import { ShopStackParamList } from './types';

const Stack = createNativeStackNavigator<ShopStackParamList>();

const ShopStack: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
    );
};

export default ShopStack;

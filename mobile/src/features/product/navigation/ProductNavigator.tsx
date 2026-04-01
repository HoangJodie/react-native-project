import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/home-screen';
import { ProductDetailScreen } from '../screens/product/product-detail-screen';
import CategoriesScreen from '../screens/categories/categories-screen';
import SavedScreen from '../screens/saved/saved-screen';
import { productRoutes } from './productRoutes';

const Stack = createNativeStackNavigator();

export const ProductNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={productRoutes.home} component={HomeScreen} />
      <Stack.Screen name={productRoutes.categories} component={CategoriesScreen} />
      <Stack.Screen name={productRoutes.productDetail} component={ProductDetailScreen} />
      <Stack.Screen name={productRoutes.saved} component={SavedScreen} />
      {/* Add list screen if separate from home */}
    </Stack.Navigator>
  );
};
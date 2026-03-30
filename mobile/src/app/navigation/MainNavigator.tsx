// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ShopStack from './ShopStack';
import { ProfileScreen } from '../../modules/profile/screens/profile-screen';
import CategoriesScreen from '../../modules/product/screens/categories/categories-screen';
import SavedScreen from '../../modules/product/screens/saved/saved-screen';

const Tab = createBottomTabNavigator();

const ACTIVE = '#0CD1E8';
const INACTIVE = '#9CA3AF';

const tabBarBaseStyle = {
    height: 70,
    paddingBottom: 8,
    paddingTop: 10,
};

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: ACTIVE,
                tabBarInactiveTintColor: INACTIVE,
                tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
                tabBarStyle: tabBarBaseStyle,
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopStack}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
                    const hideTab = routeName === 'ProductDetail' || routeName === 'Checkout';
                    return {
                        tabBarLabel: 'Shop',
                        tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                        tabBarStyle: hideTab ? { display: 'none' } : tabBarBaseStyle,
                    };
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: ({ color }) => <Icon name="columns" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Saved"
                component={SavedScreen}
                options={{
                    tabBarLabel: 'Saved',
                    tabBarIcon: ({ color }) => <Icon name="heart" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainNavigator;

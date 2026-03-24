// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { HomeScreen } from '../screens/home/home-screen';
import { ProfileScreen } from '../screens/profile/profile-screen';
import CategoriesScreen from '../screens/categories/categories-screen';
import SavedScreen from '../screens/saved/saved-screen';

const Tab = createBottomTabNavigator();

const ACTIVE = '#0CD1E8';
const INACTIVE = '#9CA3AF';

const MainNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: ACTIVE,
                tabBarInactiveTintColor: INACTIVE,
                tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 10,
                },
            }}
        >
            <Tab.Screen
                name="Shop"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Shop',
                    tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
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

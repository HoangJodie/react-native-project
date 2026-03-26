import React from 'react';
import { Text, View } from 'react-native';

const CategoriesScreen: React.FC = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: '#0F172A' }}>Categories</Text>
        </View>
    );
};

export default CategoriesScreen;

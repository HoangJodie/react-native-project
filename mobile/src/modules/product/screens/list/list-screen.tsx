// components/ApiList.tsx
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useProducts } from '../../hooks/useProducts';
import ListItem from '../../../../shared/components/ListItem';
import { useAuth } from '../../../auth/useAuth';
import Button from '../../../../shared/components/Button';

const ListScreen: React.FC = () => {
    const { items, loading, error } = useProducts();
    const { user, login } = useAuth();

    return (

        <View style={{ margin: 10, flex: 1, flexDirection: 'column' }}>
            {user ? (
                <>
                    <View>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : error ? (
                            <Text>Error: {error}</Text>
                        ) : (
                            <FlatList
                                data={items}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <ListItem
                                        item={{
                                            title: item.name,
                                            body: item.description ?? '',
                                            imageUrl: item.image,
                                        }}
                                    />
                                )}
                            />
                        )}
                    </View>
                </>
            ) : (
                <>
                    <Text style={{ flex: 1 }}>Welcome Guest. Please login to view user data.</Text>
                    <Button title="Login" onPress={() => login('example', 'password')}>
                        <Text>Log in</Text>
                    </Button>
                </>
            )}
        </View>

    );
};

export default ListScreen;



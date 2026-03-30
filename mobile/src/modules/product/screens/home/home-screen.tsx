import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './home-screen.styles';
import { SearchBar } from './components/SearchBar';
import { FilterTabs } from './components/FilterTabs';
import { ProductCard } from './components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../../../app/navigation/types';

type HomeScreenProps = NativeStackScreenProps<ShopStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const {
        items,
        loading,
        fetching,
        refreshing,
        error,
        searchTerm,
        priceUnit,
        setSearchTerm,
        setPriceUnit,
        refetch,
    } = useProducts();

    const renderHeader = () => (
        <>
            <View style={homeStyles.headerRow}>
                <Text style={homeStyles.headerTitle}>Discover</Text>
                <View style={homeStyles.iconRow}>
                    <TouchableOpacity style={homeStyles.iconButton}>
                        <Icon name="bell" size={18} color="#0F172A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[homeStyles.iconButton, { marginLeft: 12 }]}>
                        <Icon name="shopping-cart" size={18} color="#0F172A" />
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <FilterTabs value={priceUnit} onChange={setPriceUnit} />
        </>
    );

    return (
        <View style={homeStyles.screen}>
            {renderHeader()}
            {loading && items.length === 0 ? (
                <View style={homeStyles.emptyState}>
                    <ActivityIndicator size="large" color="#0CD1E8" />
                    <Text style={homeStyles.emptyText}>Loading products...</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => navigation.navigate('ProductDetail', { productId: item.id, product: item })}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    style={homeStyles.grid}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refetch} tintColor="#0CD1E8" />
                    }
                    ListEmptyComponent={
                        <View style={homeStyles.emptyState}>
                            <Text style={homeStyles.emptyText}>
                                {error || 'No products found. Try a different search.'}
                            </Text>
                        </View>
                    }
                    ListFooterComponent={
                        fetching && items.length > 0 ? (
                            <View style={{ paddingVertical: 12 }}>
                                <ActivityIndicator color="#0CD1E8" />
                            </View>
                        ) : null
                    }
                />
            )}
        </View>
    );
};

export { HomeScreen };

import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { homeStyles } from '../home-screen.styles';

type Props = {
    value: string;
    onChange: (text: string) => void;
} & Omit<TextInputProps, 'value' | 'onChange'>;

export const SearchBar: React.FC<Props> = ({ value, onChange, ...props }) => (
    <View style={homeStyles.searchBar}>
        <Icon name="search" size={18} color="#9CA3AF" />
        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Search products, brands..."
            placeholderTextColor="#9CA3AF"
            style={homeStyles.searchInput}
            {...props}
        />
    </View>
);

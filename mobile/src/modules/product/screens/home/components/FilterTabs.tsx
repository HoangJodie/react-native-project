import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PriceUnit } from '../../../type';
import { homeStyles } from '../home-screen.styles';

const OPTIONS: Array<{ label: string; value?: PriceUnit }> = [
    { label: 'All Items', value: undefined },
    { label: 'Electronics', value: 'dollar' },
    { label: 'Fashion', value: 'euro' },
    { label: 'Home', value: 'inr' },
    { label: 'Beauty', value: undefined },
];

type Props = {
    value?: PriceUnit;
    onChange: (unit?: PriceUnit) => void;
};

export const FilterTabs: React.FC<Props> = ({ value, onChange }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={homeStyles.filterScroll}
        contentContainerStyle={[homeStyles.filterRow, { paddingRight: 8 }]}
    >
        {OPTIONS.map((option) => {
            const active = option.value === value;
            return (
                <TouchableOpacity
                    key={option.label}
                    style={[homeStyles.filterChip, active && homeStyles.filterChipActive]}
                    onPress={() => onChange(option.value)}
                >
                    <Text style={[homeStyles.filterChipText, active && homeStyles.filterChipTextActive]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            );
        })}
    </ScrollView>
);

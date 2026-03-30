import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
    it('fires onPress', () => {
        const onPress = jest.fn();
        const product = {
            id: 1,
            name: 'Test',
            description: 'desc',
            image: '',
            price: 10,
            priceUnit: 'dollar',
        };
        const { getByText } = render(<ProductCard product={product} onPress={onPress} />);
        fireEvent.press(getByText('Test'));
        expect(onPress).toHaveBeenCalled();
    });
});

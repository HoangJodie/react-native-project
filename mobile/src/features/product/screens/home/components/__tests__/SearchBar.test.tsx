import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
    it('calls onChange', () => {
        const onChange = jest.fn();
        const { getByPlaceholderText } = render(<SearchBar value="" onChange={onChange} />);
        fireEvent.changeText(getByPlaceholderText(/search/i), 'abc');
        expect(onChange).toHaveBeenCalledWith('abc');
    });
});

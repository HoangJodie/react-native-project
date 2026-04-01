import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { FilterTabs } from '../FilterTabs';

describe('FilterTabs', () => {
    it('calls onChange when tab pressed', () => {
        const onChange = jest.fn();
        const { getByText } = render(<FilterTabs value={undefined} onChange={onChange} />);
        fireEvent.press(getByText('All Items'));
        expect(onChange).toHaveBeenCalled();
    });
});

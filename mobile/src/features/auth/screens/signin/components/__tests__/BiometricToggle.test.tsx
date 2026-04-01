import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { BiometricToggle } from '../BiometricToggle';

describe('BiometricToggle', () => {
    it('toggles switch', () => {
        const onChange = jest.fn();
        const { getByRole } = render(<BiometricToggle value={false} onChange={onChange} />);
        fireEvent(getByRole('switch'), 'valueChange', true);
        expect(onChange).toHaveBeenCalledWith(true);
    });
});

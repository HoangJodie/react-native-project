import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AccountDetailsCard from '../AccountDetailsCard';

const user = {
    id: 1,
    username: 'john',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    updatedAt: '2023-01-01',
    pendingSync: false,
};

describe('AccountDetailsCard', () => {
    it('shows static fields by default', () => {
        const { getByText, queryByText } = render(<AccountDetailsCard user={user} onSubmit={jest.fn()} />);
        expect(getByText('john@example.com')).toBeTruthy();
        expect(queryByText('Save')).toBeNull();
    });

    it('toggles editing off when no changes', () => {
        const { getByText, queryByText } = render(<AccountDetailsCard user={user} onSubmit={jest.fn()} />);
        fireEvent.press(getByText('Edit Details'));
        expect(getByText('Save')).toBeTruthy();
        fireEvent.press(getByText('Save'));
        expect(queryByText('Save')).toBeNull();
    });

    it('submits changed fields', async () => {
        const onSubmit = jest.fn().mockResolvedValue(undefined);
        const { getByText, getByPlaceholderText, queryByText } = render(
            <AccountDetailsCard user={user} onSubmit={onSubmit} />
        );
        fireEvent.press(getByText('Edit Details'));
        fireEvent.changeText(getByPlaceholderText('FIRST NAME'), 'Jane');
        fireEvent.changeText(getByPlaceholderText('AGE'), '30');
        fireEvent.press(getByText('Save'));
        await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ firstName: 'Jane', age: 30 }));
        await waitFor(() => expect(queryByText('Save')).toBeNull());
    });

    it('shows error when submit fails', async () => {
        const onSubmit = jest.fn().mockRejectedValue(new Error('Boom'));
        const { getByText, getByPlaceholderText } = render(<AccountDetailsCard user={user} onSubmit={onSubmit} />);
        fireEvent.press(getByText('Edit Details'));
        fireEvent.changeText(getByPlaceholderText('LAST NAME'), 'Smith');
        fireEvent.press(getByText('Save'));
        await waitFor(() => expect(getByText('Boom')).toBeTruthy());
    });

    it('resets changes on cancel', () => {
        const { getByText, getByPlaceholderText } = render(<AccountDetailsCard user={user} onSubmit={jest.fn()} />);
        fireEvent.press(getByText('Edit Details'));
        fireEvent.changeText(getByPlaceholderText('EMAIL ADDRESS'), 'new@example.com');
        fireEvent.press(getByText('Cancel'));
        expect(getByText('john@example.com')).toBeTruthy();
    });
});

import { act, renderHook } from '@testing-library/react-hooks';
import { useSignInForm } from '../useSignInForm';

describe('useSignInForm', () => {
    it('sets fields and clears errors', () => {
        const { result } = renderHook(() => useSignInForm());
        act(() => {
            result.current.setField('username', 'john');
            result.current.setField('password', 'secret');
        });
        expect(result.current.username.value).toBe('john');
        expect(result.current.password.value).toBe('secret');
        expect(result.current.username.error).toBe('');
    });

    it('validates and sets error messages', () => {
        const { result } = renderHook(() => useSignInForm());
        act(() => {
            result.current.setField('username', '');
            result.current.setField('password', '');
        });
        act(() => {
            const ok = result.current.validate();
            expect(ok).toBe(false);
        });
        expect(result.current.username.error).not.toBe('');
        expect(result.current.password.error).not.toBe('');
    });

    it('returns true for valid data', () => {
        const { result } = renderHook(() =>
            useSignInForm({
                username: { value: 'user', error: '' },
                password: { value: 'secret123', error: '' },
            })
        );
        act(() => {
            const ok = result.current.validate();
            expect(ok).toBe(true);
        });
    });
});

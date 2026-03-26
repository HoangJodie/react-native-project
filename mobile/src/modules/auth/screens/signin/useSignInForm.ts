import { useCallback, useState } from 'react';
import { ITextInput } from '../../../../shared/types/text-input';
import { signInSchema } from '../../schema';

type FieldKey = 'username' | 'password';

const emptyField: ITextInput = { value: '', error: '' };

export const useSignInForm = (defaults?: Partial<Record<FieldKey, ITextInput>>) => {
    const [username, setUsername] = useState<ITextInput>(defaults?.username ?? emptyField);
    const [password, setPassword] = useState<ITextInput>(defaults?.password ?? emptyField);

    const setField = useCallback((key: FieldKey, value: string) => {
        if (key === 'username') {
            setUsername({ value, error: '' });
        } else {
            setPassword({ value, error: '' });
        }
    }, []);

    const clearErrors = useCallback(() => {
        setUsername((prev) => ({ ...prev, error: '' }));
        setPassword((prev) => ({ ...prev, error: '' }));
    }, []);

    const validate = useCallback(() => {
        clearErrors();
        const result = signInSchema.safeParse({
            username: username.value,
            password: password.value,
        });

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                if (issue.path[0] === 'username') {
                    setUsername((prev) => ({ ...prev, error: issue.message }));
                }
                if (issue.path[0] === 'password') {
                    setPassword((prev) => ({ ...prev, error: issue.message }));
                }
            });
        }

        return result.success;
    }, [clearErrors, password.value, username.value]);

    return {
        username,
        password,
        setField,
        validate,
    };
};

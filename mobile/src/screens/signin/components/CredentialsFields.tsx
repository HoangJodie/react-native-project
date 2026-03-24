import React from 'react';
import { Text } from 'react-native';
import TextInput from '../../../components/TextInput';
import { styles } from '../signin-screen.styles';
import { ITextInput } from '../../../types/text-input';

type Props = {
    username: ITextInput;
    password: ITextInput;
    onUsernameChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
};

export const CredentialsFields: React.FC<Props> = ({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
}) => (
    <>
        <Text style={styles.label}>Username</Text>
        <TextInput
            placeholder="johndoe123"
            value={username.value}
            onChangeText={onUsernameChange}
            autoCapitalize="none"
            returnKeyType="next"
            errorText={username.error}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
            placeholder="********"
            value={password.value}
            onChangeText={onPasswordChange}
            secureTextEntry
            returnKeyType="done"
            errorText={password.error}
        />
    </>
);

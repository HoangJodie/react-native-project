import React, { FC, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { useAuth } from '../contexts/auth-context';
import { ITextInput } from '../types/text-input';
import { styles } from './styles/signin-screen-styles';

interface ISignInScreen {
    navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }) => {
    const { login, loading, error } = useAuth();
    const [username, setUsername] = useState<ITextInput>({ value: 'johndoe', error: '' });
    const [password, setPassword] = useState<ITextInput>({ value: 'password', error: '' });
    const [useBiometric, setUseBiometric] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const validate = () => {
        let valid = true;
        if (!username.value.trim()) {
            setUsername((prev) => ({ ...prev, error: 'Username is required' }));
            valid = false;
        }
        if (!password.value.trim()) {
            setPassword((prev) => ({ ...prev, error: 'Password is required' }));
            valid = false;
        }
        return valid;
    };

    const onSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            await login(username.value.trim(), password.value);
            navigation.replace('Main');
            console.log("dang nhap")
        } catch (e) {
            console.log("loi")
            // error state handled in context
        } finally {

            setSubmitting(false);
        }
    };

    return (
        <Background>
            <View style={styles.screen}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.card}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.iconLock}>Lock</Text>
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Please enter your details</Text>

                        <View style={styles.segment}>
                            <TouchableOpacity style={[styles.segmentButton, styles.segmentActive]}>
                                <Text style={styles.segmentActiveText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.segmentButton}>
                                <Text style={styles.segmentText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            placeholder="johndoe123"
                            value={username.value}
                            onChangeText={(text: string) => setUsername({ value: text, error: '' })}
                            autoCapitalize="none"
                            returnKeyType="next"
                            error={!!username.error}
                            errorText={username.error}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder="********"
                            value={password.value}
                            onChangeText={(text: string) => setPassword({ value: text, error: '' })}
                            secureTextEntry
                            returnKeyType="done"
                            error={!!password.error}
                            errorText={password.error}
                        />

                        <View style={styles.forgotPasswordRow}>
                            <TouchableOpacity>
                                <Text style={styles.link}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.biometricRow}>
                            <Switch
                                value={useBiometric}
                                onValueChange={setUseBiometric}
                                thumbColor={useBiometric ? '#0CD1E8' : '#f4f3f4'}
                                trackColor={{ true: '#8CF1FF', false: '#dcdcdc' }}
                            />
                            <Text style={styles.biometricText}>Use biometrics for faster login</Text>
                        </View>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <Button
                            style={styles.primaryButton}
                            disabled={loading || submitting}
                            onPress={onSubmit}
                        >
                            {loading || submitting ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.primaryButtonText}>Sign In</Text>
                            )}
                        </Button>

                        <TouchableOpacity style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>Sign in with Biometrics</Text>
                        </TouchableOpacity>

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={styles.socialIcon}>G</Text>
                                <Text style={styles.socialText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Text style={styles.socialIcon}>f</Text>
                                <Text style={styles.socialText}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.footerText}>
                            By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text>{' '}
                            and <Text style={styles.link}>Privacy Policy</Text>.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </Background>
    );
};

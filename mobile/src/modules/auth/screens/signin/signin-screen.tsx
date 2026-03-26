import React, { FC, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Background from '../../../../shared/components/Background';
import Button from '../../../../shared/components/Button';
import { useAuth } from '../../useAuth';
import { styles } from './signin-screen.styles';
import { useSignInForm } from './useSignInForm';
import { SignInHeader } from './components/SignInHeader';
import { AuthSegment } from './components/AuthSegment';
import { CredentialsFields } from './components/CredentialsFields';
import { BiometricToggle } from './components/BiometricToggle';
import { ErrorBanner } from './components/ErrorBanner';
import { SocialButtons } from './components/SocialButtons';
import { LegalFooter } from './components/LegalFooter';

interface ISignInScreen {
    navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }) => {
    const { login, loading, error } = useAuth();
    const { username, password, setField, validate } = useSignInForm({
        username: { value: 'johndoe', error: '' },
        password: { value: 'secret123', error: '' },
    });
    const [useBiometric, setUseBiometric] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            await login(username.value.trim(), password.value);
            navigation.replace('Main');
        } catch (e) {
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
                        <SignInHeader />
                        <AuthSegment />
                        <CredentialsFields
                            username={username}
                            password={password}
                            onUsernameChange={(text) => setField('username', text)}
                            onPasswordChange={(text) => setField('password', text)}
                        />
                        <View style={styles.forgotPasswordRow}>
                            <TouchableOpacity>
                                <Text style={styles.link}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <BiometricToggle value={useBiometric} onChange={setUseBiometric} />

                        <ErrorBanner message={error} />

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

                        <SocialButtons />
                        <LegalFooter />
                    </View>
                </ScrollView>
            </View>
        </Background>
    );
};

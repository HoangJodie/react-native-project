import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ISignInStyles = {
    screen: ViewStyle;
    scrollContainer: ViewStyle;
    scroll: ViewStyle;
    card: ViewStyle;
    iconCircle: ViewStyle;
    iconLock: TextStyle;
    title: TextStyle;
    subtitle: TextStyle;
    segment: ViewStyle;
    segmentButton: ViewStyle;
    segmentActive: ViewStyle;
    segmentText: TextStyle;
    segmentActiveText: TextStyle;
    label: TextStyle;
    forgotPasswordRow: ViewStyle;
    link: TextStyle;
    biometricRow: ViewStyle;
    biometricText: TextStyle;
    primaryButton: ViewStyle;
    primaryButtonText: TextStyle;
    outlineButton: ViewStyle;
    outlineButtonText: TextStyle;
    dividerRow: ViewStyle;
    divider: ViewStyle;
    dividerText: TextStyle;
    socialRow: ViewStyle;
    socialButton: ViewStyle;
    socialIcon: ImageStyle;
    socialText: TextStyle;
    footerText: TextStyle;
    errorText: TextStyle;
};

export const styles = StyleSheet.create<ISignInStyles>({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 28,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    iconCircle: {
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E6FAFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconLock: {
        fontSize: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
        color: '#111',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: 16,
    },
    segment: {
        flexDirection: 'row',
        backgroundColor: '#F2F4F7',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    segmentActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    segmentText: {
        color: '#94A3B8',
        fontWeight: '600',
    },
    segmentActiveText: {
        color: '#0CD1E8',
        fontWeight: '700',
    },
    label: {
        fontSize: 14,
        color: '#111',
        marginBottom: 6,
        marginTop: 4,
    },
    forgotPasswordRow: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    link: {
        color: '#0CD1E8',
        fontWeight: '600',
    },
    biometricRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    biometricText: {
        color: '#4B5563',
        flex: 1,
        marginLeft: 10,
    },
    primaryButton: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 14,
        backgroundColor: '#05C7E8',
        alignItems: 'center',
        borderRadius: 12,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    outlineButton: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#05C7E8',
        alignItems: 'center',
        marginVertical: 8,
    },
    outlineButtonText: {
        color: '#05C7E8',
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#9CA3AF',
        fontSize: 13,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginHorizontal: 4,
    },
    socialIcon: {
        width: 18,
        height: 18,
        marginRight: 8,
        resizeMode: 'contain',
    },
    socialText: {
        fontWeight: '600',
        color: '#111',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#6B7280',
        marginTop: 6,
    },
    errorText: {
        color: '#EF4444',
        marginBottom: 6,
    },
});

import React from 'react';
import { View, Text, TextInput as Input, StyleSheet, TextStyle, ViewStyle, StyleProp } from 'react-native';

type Props = {
    errorText?: string;
    description?: string;
    style?: StyleProp<TextStyle>;
} & React.ComponentProps<typeof Input>;

export default function TextInput({ errorText, description, style, ...props }: Props) {
    return (
        <View style={styles.container}>
            <Input
                style={[styles.input, style]}
                placeholderTextColor="#94A3B8"
                selectionColor="#0CD1E8"
                underlineColorAndroid="transparent"
                {...props}
            />
            {description && !errorText ? <Text style={styles.description}>{description}</Text> : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

type ITexInputStyles = {
    container: ViewStyle;
    input: TextStyle;
    description: TextStyle;
    error: TextStyle;
};

const styles = StyleSheet.create<ITexInputStyles>({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CBD5E1',
        borderWidth: 1.25,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        color: '#0F172A',
        fontSize: 15,
    },
    description: {
        fontSize: 13,
        color: '#6B7280',
        paddingTop: 6,
    },
    error: {
        fontSize: 13,
        color: '#EF4444',
        paddingTop: 6,
    },
});

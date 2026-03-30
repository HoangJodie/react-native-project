import React from 'react';
import { Text, View } from 'react-native';
import TextInput from '../../../../../shared/components/TextInput';
import { checkoutStyles as styles } from '../checkout-screen.styles';

type Props = {
    value: string;
    onChange: (text: string) => void;
    error?: string;
};

export const AddressSection: React.FC<Props> = ({ value, onChange, error }) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <Text style={styles.sectionHint}>We deliver to your door</Text>
            </View>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter delivery address"
                multiline
                numberOfLines={3}
                style={styles.addressInput}
                errorText={error}
            />
        </View>
    );
};

export default AddressSection;

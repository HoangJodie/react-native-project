import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './AccountDetailsCard.styles';
import type { Profile } from '../types';
import type { UpdateProfileInput } from '../types';

type Props = {
    user: Profile;
    loading?: boolean;
    onSubmit: (payload: UpdateProfileInput) => Promise<unknown>;
};

type FieldKey = 'email' | 'firstName' | 'lastName' | 'age';

type FormState = Record<FieldKey, string>;

type FieldRowProps = {
    label: string;
    value: string;
    fieldKey?: FieldKey;
    editing: boolean;
    loading?: boolean;
    onChange: (key: FieldKey, value: string) => void;
};

const initialForm = (user: Profile): FormState => ({
    email: user.email ?? '',
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    age: user.age ? String(user.age) : '',
});

const FieldRow: React.FC<FieldRowProps> = memo(({ label, value, fieldKey, editing, loading, onChange }) => (
    <View style={{ marginBottom: 14 }}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={styles.fieldBox}>
            {editing && fieldKey ? (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => onChange(fieldKey, text)}
                    placeholder={label}
                    editable={!loading}
                    keyboardType={fieldKey === 'age' ? 'number-pad' : 'default'}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                />
            ) : (
                <Text style={styles.fieldValue}>{value || 'N/A'}</Text>
            )}
        </View>
    </View>
));

const AccountDetailsCard: React.FC<Props> = ({ user, loading, onSubmit }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState<FormState>(() => initialForm(user));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!editing) {
            setForm(initialForm(user));
        }
    }, [user, editing]);

    const setField = useCallback((key: FieldKey, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);

    const payload = useMemo<UpdateProfileInput>(() => {
        const data: UpdateProfileInput = {};
        if (form.email !== user.email) data.email = form.email.trim() || undefined;
        if (form.firstName !== user.firstName) data.firstName = form.firstName.trim() || undefined;
        if (form.lastName !== user.lastName) data.lastName = form.lastName.trim() || undefined;
        if (form.age !== (user.age ? String(user.age) : '')) {
            const parsed = parseInt(form.age, 10);
            data.age = Number.isNaN(parsed) ? undefined : parsed;
        }
        return data;
    }, [form.age, form.email, form.firstName, form.lastName, user]);

    const hasChanges = useMemo(() => Object.keys(payload).length > 0, [payload]);

    const handleSave = useCallback(async () => {
        if (!hasChanges) {
            setEditing(false);
            return;
        }
        try {
            setError(null);
            await onSubmit(payload);
            setEditing(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : typeof err === 'string' ? err : 'Failed to update profile';
            setError(message);
        }
    }, [hasChanges, onSubmit, payload]);

    const handleCancel = useCallback(() => {
        setForm(initialForm(user));
        setError(null);
        setEditing(false);
    }, [user]);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>Account Details</Text>
                <Text style={styles.edit} onPress={() => setEditing((prev) => !prev)}>
                    {editing ? 'Close' : 'Edit Details'}
                </Text>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <FieldRow
                label="EMAIL ADDRESS"
                value={form.email}
                fieldKey="email"
                editing={editing}
                loading={loading}
                onChange={setField}
            />
            <FieldRow
                label="FIRST NAME"
                value={form.firstName}
                fieldKey="firstName"
                editing={editing}
                loading={loading}
                onChange={setField}
            />
            <FieldRow
                label="LAST NAME"
                value={form.lastName}
                fieldKey="lastName"
                editing={editing}
                loading={loading}
                onChange={setField}
            />
            <FieldRow
                label="AGE"
                value={form.age}
                fieldKey="age"
                editing={editing}
                loading={loading}
                onChange={setField}
            />

            {editing ? (
                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancel}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                            {loading ? 'Saving...' : 'Save'}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

export default AccountDetailsCard;

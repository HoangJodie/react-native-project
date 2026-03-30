import { updateProfileSchema } from '../schema';

describe('updateProfileSchema', () => {
    it('accepts valid partial payload', () => {
        const result = updateProfileSchema.safeParse({
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            avatar: 'https://example.com/a.png',
        });
        expect(result.success).toBe(true);
    });

    it('rejects empty payload', () => {
        const result = updateProfileSchema.safeParse({});
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toMatch(/No profile changes provided/);
        }
    });

    it('rejects invalid email and age', () => {
        const result = updateProfileSchema.safeParse({ email: 'bad', age: 130 });
        expect(result.success).toBe(false);
        if (!result.success) {
            const messages = result.error.issues.map((i) => i.message);
            expect(messages.join(' ')).toMatch(/Email is invalid/);
            expect(messages.join(' ')).toMatch(/Age must be realistic/);
        }
    });
});

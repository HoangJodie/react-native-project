import { z } from 'zod';

export const updateProfileSchema = z
    .object({
        email: z.string().email('Email is invalid').optional(),
        firstName: z.string().trim().min(1, 'First name is required').optional(),
        lastName: z.string().trim().min(1, 'Last name is required').optional(),
        age: z.number().int().positive().max(120, 'Age must be realistic').optional(),
        avatar: z.string().url('Avatar must be a valid URL').optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'No profile changes provided',
    });

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

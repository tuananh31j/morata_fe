import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    password: z.string({ message: 'Password is required' }).min(5, 'Password over 5 characters!'),
});

export const registerSchema = z.object({
    firstName: z.string({ message: 'Name is required!' }),
    lastName: z.string({ message: 'Name is required!' }),
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    password: z.string({ message: 'Password is required' }).min(5, 'Password over 5 characters!'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type ILoginResponse = {
    user: {
        _id: string;
        username: string;
        email: string;
        role: 'user' | 'admin';
        createdAt: string;
        updatedAt: string;
    };
    accessToken: string;
};

export type IRegisterResponse = {
    username: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
};

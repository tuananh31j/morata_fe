import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ message: 'Vui lòng nhập email!' }).email('Email không đúng định dạng!'),
    password: z.string({ message: 'Vui lòng nhập mật khẩu!' }).min(5, 'Mật khẩu cần ít nhất 5 kí tự!'),
});
export const forgotPasswordSchema = z.object({
    email: z.string({ message: 'Vui lòng nhập email' }).email('Email không đúng định dạng!'),
});
export const registerSchema = z.object({
    firstName: z.string({ message: 'Vui lòng nhập tên của bạn!' }),
    lastName: z.string({ message: 'Vui lòng nhập họ của bạn!' }),
    email: z.string({ message: 'Vui lòng nhập email!' }).email('Email không đúng định dạng!'),
    password: z.string({ message: 'Vui lòng nhập mật khẩu!' }).min(5, 'Mật khẩu cần ít nhất 5 kí tự!'),
    phone: z.string({ message: 'Vui lòng nhập số điên thoại!' }).min(9, 'Lớn hơn 9 kí tự!'),
});
export const resetPasswordSchema = z
    .object({
        password: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 9 kí tự!' }),
        confirmPassword: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 9 kí tự!' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp!',
        path: ['confirmPassword'],
    });
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type ILoginResponse = {
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        role: 'user' | 'admin';
        createdAt: string;
        updatedAt: string;
    };
    accessToken: string;
};

export type IRegisterResponse = {
    name: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
};

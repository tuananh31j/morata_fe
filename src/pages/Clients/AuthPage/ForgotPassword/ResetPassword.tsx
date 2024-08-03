import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useResetPassword from '~/hooks/auth/useResetPassword';
import { resetPasswordSchema } from '~/types/Schemas/Auth';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });
    const { mutate } = useResetPassword();
    const handleOnSubmit = (data: any) => {
        mutate({ token: token ? token : '', password: data.password });
    };
    const getErrorMessage = (field: keyof typeof errors) => {
        const error = errors[field];
        return error ? (error.message as React.ReactNode) : '';
    };
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);
    return (
        <div className='bg-gray-100 flex min-h-[70vh] items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
                <h1 className='text-gray-800 mb-6 text-center text-2xl font-semibold'>Reset Your Password</h1>
                <Form onFinish={handleSubmit(handleOnSubmit)} layout='vertical'>
                    <Form.Item
                        label='New Password'
                        validateStatus={errors.password ? 'error' : ''}
                        help={getErrorMessage('password')}
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <Input.Password {...field} size='large' placeholder='Enter your new password' />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Confirm Password'
                        validateStatus={errors.confirmPassword ? 'error' : ''}
                        help={getErrorMessage('confirmPassword')}
                    >
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field }) => (
                                <Input.Password {...field} size='large' placeholder='Confirm your password' />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type='submit'
                            className='h-12 w-full rounded-md bg-[#1e3a8a] font-semibold text-white transition-colors duration-300 hover:bg-cyan-600'
                        >
                            Reset Password
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

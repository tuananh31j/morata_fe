/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSendResetPassword from '~/hooks/auth/useSendResetPassword';
import { forgotPasswordSchema } from '~/types/Schemas/Auth';
import showMessage from '~/utils/ShowMessage';

export default function ForgotPassword() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<{ email: string }>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    const { mutate, error, isError, isPending } = useSendResetPassword();

    const handleOnSubmit = async (data: any) => {
        mutate({ email: data.email });
    };
    useEffect(() => {
        if (isError) {
            if (error.response.data.data.field) {
                setError(error.response.data.data.field, {
                    type: 'manual',
                    message: error.response.data.data.message,
                });
            } else {
                showMessage(error.response.data.message, 'error');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);

    return (
        <div className='bg-gray-100 flex min-h-[40vh] items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
                <h1 className='text-gray-800 mb-6 text-center text-2xl font-semibold'>Quên mật khẩu</h1>
                <Form onFinish={handleSubmit(handleOnSubmit)} layout='vertical'>
                    <Form.Item
                        label='Địa chỉ Email'
                        validateStatus={errors.email ? 'error' : undefined}
                        help={errors.email?.message}
                    >
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} size='large' className='rounded-md' placeholder='Enter your email' />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType='submit'
                            loading={isPending}
                            className='h-12 w-full rounded-md bg-[#1e3a8a] font-semibold text-white transition-colors duration-300 hover:bg-cyan-600'
                        >
                            Gửi yêu cầu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

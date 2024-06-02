import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ConfigProvider, Form, Input } from 'antd';
import { motion } from 'framer-motion';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useMessage from '~/hooks/_common/useMessage';
import AuthService from '~/services/auth.service';
import { RegisterFormData, registerSchema } from '~/types/Schemas/Auth';

const Register = () => {
    useDocumentTitle('Sign Up | MORATA');

    const navigator = useNavigate();
    const { handleMessage, contextHolder } = useMessage();
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['register'],
        mutationFn: (body: { username: string; email: string; password: string }) => AuthService.register(body),
        onSuccess: () => {
            handleMessage({ type: 'success', content: 'successful authentication!' });
            navigator('/auth/login');
        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        const dataCustom = {
            username: `${data.firstName}${data.lastName}`,
            email: data.email,
            password: data.password,
        };
        mutate(dataCustom);
        if (isPending) handleMessage({ type: 'loading', content: '...authenticating!' });
        if (isError) handleMessage({ type: 'error', content: 'Invalid information!' });
    };
    return (
        <>
            {contextHolder}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='flex w-full justify-center bg-white p-5 xl:w-full'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: 'rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    <Form onFinish={handleSubmit(onSubmit)} className='w-full '>
                        <h1 className=' text-center text-2xl font-semibold text-[#222222] lg:text-4xl'>Sign up</h1>
                        <p className='mb-[25px] text-center'>Create your account</p>
                        <div className='flex justify-between gap-5'>
                            <Form.Item
                                validateStatus={errors.firstName ? 'error' : ''}
                                help={errors.firstName?.message}
                                className='w-full'
                            >
                                <Controller
                                    name='firstName'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='h-[48px] rounded-[2px] font-semibold'
                                            placeholder='First Name'
                                        />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                validateStatus={errors.lastName ? 'error' : ''}
                                help={errors.lastName?.message}
                                className='w-full'
                            >
                                <Controller
                                    name='lastName'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            className='h-[48px] rounded-[2px] font-semibold'
                                            placeholder='Last Name'
                                            {...field}
                                        />
                                    )}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        className='h-[48px] rounded-[2px] font-semibold'
                                        placeholder='Email Address'
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>
                        <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <Input.Password
                                        className='h-[48px] rounded-[2px] font-semibold'
                                        placeholder='Password'
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>
                        <Form.Item>
                            <button
                                type='submit'
                                className='mt-[5px] h-[48px] w-full rounded-[5px] bg-[#1e3a8a] font-medium text-white duration-300 hover:bg-cyan-500'
                            >
                                Sign up
                            </button>
                            <p className='my-[15px] text-center text-[#7777]'>Or</p>
                            <Link
                                to={''}
                                className='text-md flex h-[48px] items-center justify-center gap-2 rounded-[5px] bg-blue-600 font-bold text-white shadow-md hover:opacity-90'
                            >
                                <img
                                    src='https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-logo-vector-png-image_9183290.png'
                                    alt=''
                                    width={35}
                                />
                                Sign in With Google
                            </Link>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </motion.div>
        </>
    );
};

export default Register;

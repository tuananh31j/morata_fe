import { ConfigProvider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { LoginFormData, loginSchema } from '~/types/Schemas/Auth';
import useMessage from '~/hooks/_common/useMessage';
import useLogin from '~/hooks/auth/useLogin';

const Login = () => {
    useDocumentTitle('Sign In | MORATA');

    const { handleMessage, contextHolder } = useMessage();
    const { mutate, isPending } = useLogin();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (body) => {
        mutate(body);

        if (isPending) {
            handleMessage({ type: 'loading', content: '...authenticating!' });
        }
    };

    return (
        <>
            {contextHolder}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='flex w-full justify-center bg-white p-5'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorBorder: 'rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    <Form onFinish={handleSubmit(onSubmit)} className='w-full'>
                        <h1 className='my-3 mb-5 text-center text-2xl font-semibold text-[#222222] lg:text-4xl'>
                            Welcome Back
                        </h1>
                        <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className='mb-1 h-[48px] rounded-[2px] font-semibold'
                                        placeholder='Email Address'
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
                                        {...field}
                                        className='mb-1 h-[48px] rounded-[2px] font-semibold'
                                        placeholder='Password'
                                    />
                                )}
                            />
                        </Form.Item>
                        <div className='mt-[35px]'>
                            <Link to='/forgotpassword'>Forgot your password?</Link>
                        </div>
                        <Form.Item className='mt-[15px]'>
                            <button
                                type='submit'
                                className='h-[48px] w-full rounded-[5px] bg-[#1e3a8a] font-bold text-white duration-300 hover:bg-cyan-500'
                            >
                                Sign in
                            </button>
                            <p className='my-[15px] text-center text-[#7777]'>Or</p>
                            <Link
                                to=''
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

export default Login;

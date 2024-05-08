import { ConfigProvider, Form, Input } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useDocumentTitle from '~/hooks/useDocumentTitle';

const Register = () => {
    useDocumentTitle('Sign Up | MORATA');
    const handleSubmit = () => {
        // console.log(value);
    };
    return (
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
                <Form onFinish={handleSubmit} className='w-full '>
                    <h1 className=' text-center text-2xl font-semibold text-[#222222] lg:text-4xl'>Sign up</h1>
                    <p className='mb-[25px] text-center'>Create your account</p>
                    <div className='flex justify-between gap-5'>
                        <Form.Item
                            className='w-full'
                            name={'firstName'}
                            rules={[{ required: true, message: 'Please input your First Name!' }]}
                        >
                            <Input className='h-[48px] rounded-[2px] font-semibold' placeholder='First Name' />
                        </Form.Item>
                        <Form.Item
                            className='w-full'
                            name={'lastName'}
                            rules={[{ required: true, message: 'Please input your Last Name!' }]}
                        >
                            <Input className='h-[48px] rounded-[2px] font-semibold' placeholder='Last Name' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name={'email'}
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input className='h-[48px] rounded-[2px] font-semibold' placeholder='Email Address' />
                    </Form.Item>
                    <Form.Item name={'password'} rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password className='h-[48px] rounded-[2px] font-semibold' placeholder='Password' />
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
    );
};

export default Register;

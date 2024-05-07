import { ConfigProvider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
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
                <Form onFinish={handleSubmit} className='w-full'>
                    <h1 className=' mb-[35px] text-[38px] font-bold'>LOGIN</h1>
                    <Form.Item
                        name={'email'}
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input className='mb-1 h-[48px] rounded-[2px] font-semibold' placeholder='Email Address' />
                    </Form.Item>
                    <Form.Item name={'password'} rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password className='mb-1 h-[48px] rounded-[2px] font-semibold' placeholder='Password' />
                    </Form.Item>
                    <div className='mt-[35px]'>
                        <Link to={''}>Forgot your password?</Link>
                    </div>
                    <Form.Item className='mt-[15px]'>
                        <button
                            type='submit'
                            className='h-[48px] w-full rounded-[5px] bg-[#222222] font-medium text-white duration-300 hover:bg-cyan-500'
                        >
                            LOGIN
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </motion.div>
    );
};

export default Login;

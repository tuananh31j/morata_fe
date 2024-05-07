import { ConfigProvider, Form, Input } from 'antd';
import { motion } from 'framer-motion';

const Register = () => {
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
                    <h1 className=' mb-[35px] text-[38px] font-bold'>REGISTER</h1>
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
                            className='mt-[65px] h-[48px] w-full rounded-[5px] bg-[#222222] font-medium text-white duration-300 hover:bg-cyan-500'
                        >
                            REGISTER
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </motion.div>
    );
};

export default Register;

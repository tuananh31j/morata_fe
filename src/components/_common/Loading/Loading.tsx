import { ConfigProvider, Spin } from 'antd';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className='fixed left-0 top-0 z-[999999] h-[100vh] w-[100vw] bg-black bg-opacity-40'
        >
            <div className='fixed left-[50%] top-[40%] -translate-x-[50%]  '>
                <ConfigProvider theme={{ components: { Spin: { dotSize: 70 } } }}>
                    <Spin />
                </ConfigProvider>
            </div>
        </motion.div>
    );
};

export default Loading;

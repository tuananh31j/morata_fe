import { CheckOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutationRemoveAll } from '~/hooks/Mutations/cart/useRemoveAll';
import { RootState } from '~/store/store';

export default function Success() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { mutate } = useMutationRemoveAll();
    useEffect(() => {
        // Vô hiệu hóa nút quay lại trên trình duyệt
        const handleDisableBackButton = () => {
            window.history.pushState(null, '', window.location.pathname);
        };

        handleDisableBackButton();

        window.addEventListener('popstate', handleDisableBackButton);

        return () => window.removeEventListener('popstate', handleDisableBackButton);
    }, []);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className='flex h-screen w-screen items-center justify-center'
            >
                <div className='flex h-[50vh] w-[50vw] flex-col items-center justify-center gap-5 bg-[#FAFAFA] text-center '>
                    <div className='mb-6'>
                        <CheckOutlined className='animate-bounce rounded-full border-2 p-5 text-4xl text-red-600' />
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className='font-mono text-2xl text-red-600'
                    >
                        Order Successfully!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className='font-mono text-xl  text-[#777777]'
                    >
                        Thanks for choosing Morata
                    </motion.p>
                    <div className='mt-8 flex gap-10'>
                        <motion.button
                            onClick={() => {
                                mutate({ userId: user ? user._id : '' });
                                navigate('/');
                            }}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2, duration: 1 }}
                            className='h-[45px] w-[350px] rounded-lg bg-blue-700 font-mono text-xl text-white duration-300 hover:opacity-70'
                        >
                            Back To Home
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                mutate({ userId: user ? user._id : '' });
                                navigate('/account/my-orders');
                            }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 3, duration: 1 }}
                            className='h-[45px] w-[350px] rounded-lg bg-green-600 font-mono text-xl text-white duration-300 hover:opacity-70'
                        >
                            Check Status
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

import { CheckOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
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
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='flex h-[50vh] w-[50vw] flex-col items-center justify-center gap-5 bg-[#FAFAFA] text-center '>
                <div className='mb-6'>
                    <CheckOutlined className='text-red-600 animate-pulse rounded-full border-2 p-5 text-4xl' />
                </div>
                <h1 className='font-mono text-red-600 text-2xl'>Order Successfully!</h1>
                <p className='font-mono text-xl  text-[#777777]'>Thanks for choosing Morata</p>
                <div className='mt-8 flex gap-10'>
                    <button
                        onClick={() => {
                            mutate({ userId: user ? user._id : '' });
                            navigate('/');
                        }}
                        className='font-mono h-[45px] w-[350px] rounded-lg bg-blue-700 text-xl text-white duration-300 hover:opacity-70'
                    >
                        Back To Home
                    </button>
                    <button
                        onClick={() => {
                            mutate({ userId: user ? user._id : '' });
                            navigate(MAIN_ROUTES.MY_ORDERS);
                        }}
                        className='font-mono h-[45px] w-[350px] rounded-lg bg-green-600 text-xl text-white duration-300 hover:opacity-70'
                    >
                        Check Status
                    </button>
                </div>
            </div>
        </div>
    );
}

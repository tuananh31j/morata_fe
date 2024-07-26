import { Button, Result, Watermark } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import UseVNpayReturn from '~/hooks/orders/Queries/UseVNpayReturn';
import { RootState } from '~/store/store';

export default function Success() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const test = UseVNpayReturn();
    console.log(test.data);
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
        <Watermark content={['Morata', 'Thank you!']}>
            <div className='h-[100vh]' />
            <Result
                status='success'
                title='Your electronic item has been successfully ordered!'
                subTitle='You will receive a confirmation email with the shipping details shortly.'
                className='fixed left-[50%] top-[50%] z-99999 -translate-x-[50%] -translate-y-[50%] rounded-md border border-transparent bg-gray-3 bg-opacity-65 p-10'
                extra={[
                    <Button
                        onClick={() => {
                            mutate({ userId: user ? user._id : '' });
                            navigate(MAIN_ROUTES.MY_ORDERS, { replace: true });
                        }}
                        type='primary'
                        key='home'
                    >
                        Check Status
                    </Button>,
                    <Button
                        key='my-order'
                        onClick={() => {
                            mutate({ userId: user ? user._id : '' });
                            navigate('/', { replace: true });
                        }}
                    >
                        Back To Home
                    </Button>,
                ]}
            />
        </Watermark>
    );
}

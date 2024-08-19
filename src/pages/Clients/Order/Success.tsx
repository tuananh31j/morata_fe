import { Button, Result, Watermark } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import { clearCheckoutInfo } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';

export default function Success() {
    const navigate = useNavigate();
    // const params = new URLSearchParams(window.location.search);
    const user = useSelector((state: RootState) => state.authReducer.user);
    const dispatch = useDispatch();

    const { mutate } = useMutationRemoveAll();
    useEffect(() => {
        mutate({ userId: user ? user._id : '' });
        dispatch(clearCheckoutInfo());
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

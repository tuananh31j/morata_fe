import { Button, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useCalculateFee from '~/hooks/shipping/useCalculateFee';
import { setShippingFee } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';
import ReceiverCheckoutInfo from './ReceiverCheckoutInfo';
import ProductItemsCheckout from './ProductItemsCheckout';

const Checkout = () => {
    const { shippingAddress } = useSelector((state: RootState) => state.order);
    const { serviceId, districtId, wardCode } = shippingAddress;
    const { data: shippingFee } = useCalculateFee({ serviceId, wardCode, districtId });
    const dispatch = useDispatch();

    useEffect(() => {
        if (shippingFee) {
            dispatch(setShippingFee(shippingFee.total));
        }
    }, [shippingFee]);

    return (
        <>
            <Space className='flex w-full justify-between rounded-lg border-gray bg-[#fff] p-4 font-semibold'>
                <Typography.Title level={4}>Thông tin cần thanh toán</Typography.Title>
                <Link to='/shipping'>
                    <Button type='primary' className='p-5 font-semibold'>
                        Cập nhật lại thông tin giao hàng
                    </Button>
                </Link>
            </Space>

            <Space className='mt-5 grid grid-cols-2 gap-5  border-gray bg-[#fff] p-5'>
                <ReceiverCheckoutInfo />
                <ProductItemsCheckout />
            </Space>
        </>
    );
};

export default Checkout;

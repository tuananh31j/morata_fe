import { Button, Space, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import OrderStatusBar from './OrderStatusBar';
import CustomerInfo from './CustomerInfo';
import ServiceInfo from './ServiceInfo';
import TableOrderItems from './TableOrderItems';
import CancelOrderModal from './CancelOrderModal';

const OrderDetail = () => {
    const { id } = useParams();
    const { data } = useOrderDetails(id!);

    const orderStatus = data?.orderStatus;

    const customerInfo = data && data?.customerInfo;
    const receiverInfo = data && data?.receiverInfo;
    const shippingAddress = data && data?.shippingAddress;

    const serviceInfo = {
        paymentMethod: data?.paymentMethod || '',
        shippingFee: data?.shippingFee || '',
        tax: data?.tax || '',
        totalPrice: data?.totalPrice || '',
        isPaid: data?.isPaid || '',
    };

    const orderItems = data?.items || [];

    return (
        <>
            <Space className='flex w-full items-center justify-between rounded-lg bg-[#fff] p-4 font-semibold'>
                <span>Order Detail </span>
                {orderStatus === 'pending' && <CancelOrderModal orderId={id!} />}
            </Space>
            {orderStatus !== 'cancelled' ? (
                <OrderStatusBar orderStatus={orderStatus} />
            ) : (
                <Space className='mt-5 flex w-full flex-col  items-center justify-center rounded-lg bg-[#fff] p-4 font-semibold'>
                    <Space align='center' direction='vertical'>
                        <h2 className='text-rose-500'>
                            Order has been cancelled{' '}
                            {data?.canceledBy === 'admin' ? <span>by Administrator</span> : <span>by customer</span>}
                        </h2>
                        <p className='font-normal'>{data?.description}</p>
                    </Space>
                    <Space></Space>
                </Space>
            )}
            <CustomerInfo customerInfo={customerInfo} receiverInfo={receiverInfo} shippingAddress={shippingAddress} />
            <ServiceInfo serviceInfo={serviceInfo} />
            <TableOrderItems orderItems={orderItems} />
        </>
    );
};

export default OrderDetail;

import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import OrderStatusBar from './OrderStatusBar';
import CustomerInfo from './CustomerInfo';
import ServiceInfo from './ServiceInfo';
import TableOrderItems from './TableOrderItems';

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
            <Space className='font-se w-full rounded-lg bg-[#fff] p-4 font-semibold'>Order Detail </Space>
            <OrderStatusBar orderStatus={orderStatus} />
            <CustomerInfo customerInfo={customerInfo} receiverInfo={receiverInfo} shippingAddress={shippingAddress} />
            <ServiceInfo serviceInfo={serviceInfo} />
            <TableOrderItems orderItems={orderItems} />
        </>
    );
};

export default OrderDetail;

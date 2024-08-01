import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import OrderStatusBar from './OrderStatusBar';

const OrderDetail = () => {
    const { id } = useParams();
    const { data } = useOrderDetails(id!);
    console.log('>>>> data', data);

    return (
        <>
            <Space className='font-se w-full rounded-lg bg-[#fff] p-4 font-semibold'>Order Detail </Space>
            <OrderStatusBar />
        </>
    );
};

export default OrderDetail;

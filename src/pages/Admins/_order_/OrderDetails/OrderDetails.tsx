import { ConfigProvider, Spin, Table } from 'antd';
import { useParams } from 'react-router-dom';
import PopupConfirmOrder from '~/components/_common/PopupOrderStatus/Confirm/PopupConfirmOrder';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import { OrderStatus } from '~/types/enum';
import StepsOrder from './_components/StepsOrder';
import { orderItemsColums } from '../_helper';
import dayjs from 'dayjs';
import PurchaseInformation from './_components/PurchaseInformation';
import Header from './_components/Header';
import { formatDate } from '~/utils/formatDate';

const OrderDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrderDetails(id as string);
    const orderStatus = data?.data.data.orderStatus;
    const orderItems = data?.data.data.items;
    const customerInfo = data?.data.data.customerInfo;
    const description = data?.data.data.description;
    const isPaid = data?.data.data.isPaid;
    const totalPrice = data?.data.data.totalPrice;
    const shippingFee = data?.data?.data.shippingFee;
    const paymentMethod = data?.data?.data.paymentMethod;
    const tax = data?.data?.data.tax;
    const shippingAddress = data?.data.data.shippingAddress;

    return (
        <div className='w-full px-6'>
            <div className='page-content h-full min-h-[85vh] rounded-lg bg-white'>
                {!isLoading && data && (
                    <div className='border-default-200 rounded-lg'>
                        <Header lengthProduct={orderItems!.length} />
                        <div className='p-6'>
                            <PurchaseInformation
                                totalPrice={totalPrice!}
                                tax={tax!}
                                created={formatDate(data.data.data.createdAt)}
                                customerInfo={customerInfo!}
                                description={description!}
                                isPaid={isPaid!}
                                shippingFee={shippingFee!}
                                paymentMethod={paymentMethod!}
                                shippingAddress={shippingAddress!}
                            />
                            <div className=''>
                                {orderStatus === OrderStatus.pending && data && (
                                    <div className='h-[24px]'>
                                        <PopupConfirmOrder order={data.data.data}>Confirm this order</PopupConfirmOrder>
                                    </div>
                                )}
                                {orderStatus && <StepsOrder orderStatus={orderStatus} />}
                                <Table columns={orderItemsColums} dataSource={orderItems} />
                            </div>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className='flex h-[85vh] items-center justify-center'>
                        <ConfigProvider theme={{ components: { Spin: { dotSize: 70 } } }}>
                            <Spin />
                        </ConfigProvider>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;

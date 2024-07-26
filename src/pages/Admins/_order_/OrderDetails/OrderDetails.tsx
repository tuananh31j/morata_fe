import { ConfigProvider, Spin, Table } from 'antd';
import { useParams } from 'react-router-dom';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import { OrderStatus } from '~/constants/enum';
import StepsOrder from './_components/StepsOrder';
import { orderItemsColums } from '../_helper';
import PurchaseInformation from './_components/PurchaseInformation';
import Header from './_components/Header';
import { formatDate } from '~/utils/formatDate';
import PopupFormCancelOrder from '~/components/_common/PopupOrderStatus/ChangeStatusOrder';

const OrderDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrderDetails(id as string);

    const orderStatus = data?.data.data.currentOrderStatus;
    const orderItems = data?.data.data.items;
    const customerInfo = data?.data.data.receiverInfo;
    const description = data?.data.data.note || 'No description';
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
                            <div className='my-4 mt-6'>
                                {data && (
                                    <>
                                        {orderStatus === OrderStatus.pending && (
                                            <div className='flex h-[24px] items-center gap-2'>
                                                <PopupFormCancelOrder status={orderStatus} id={data.data.data._id}>
                                                    Confirm this order
                                                </PopupFormCancelOrder>
                                                <span>or</span>
                                                <PopupFormCancelOrder
                                                    status={orderStatus}
                                                    isCacelled
                                                    id={data.data.data._id}
                                                >
                                                    Cancel this order
                                                </PopupFormCancelOrder>
                                            </div>
                                        )}
                                        {orderStatus === OrderStatus.confirmed && (
                                            <div className='h-[24px]'>
                                                <PopupFormCancelOrder status={orderStatus} id={data.data.data._id}>
                                                    <span className='capitalize'>
                                                        {OrderStatus.shipping} this order
                                                    </span>
                                                </PopupFormCancelOrder>
                                            </div>
                                        )}
                                        {orderStatus === OrderStatus.shipping && (
                                            <div className='h-[24px]'>
                                                <PopupFormCancelOrder status={orderStatus} id={data.data.data._id}>
                                                    <span className='capitalize'>
                                                        {OrderStatus.delivered} this order
                                                    </span>
                                                </PopupFormCancelOrder>
                                            </div>
                                        )}
                                        {orderStatus === OrderStatus.delivered && (
                                            <div className='h-[24px]'>
                                                <PopupFormCancelOrder status={orderStatus} id={data.data.data._id}>
                                                    <span className='capitalize'>{OrderStatus.done} this order</span>
                                                </PopupFormCancelOrder>
                                            </div>
                                        )}
                                    </>
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

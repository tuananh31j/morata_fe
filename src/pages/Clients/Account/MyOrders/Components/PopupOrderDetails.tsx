import { Badge, Button, Card, Flex, Image, Modal, Space, Tooltip } from 'antd';
import { useState } from 'react';
import WrapperList from '~/components/_common/WrapperList';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';
import { Currency } from '~/utils';

const PopupOrderDetails = ({ id }: { id: string }) => {
    const { data } = useOrderDetails(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const orderDetails = data?.data.data;
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip placement='topLeft' title={id}>
                <Button onClick={showModal}>{String(id).slice(0, 5)}...</Button>
            </Tooltip>

            <Modal footer={''} open={isModalOpen} onCancel={handleCancel} width={1000}>
                <WrapperList classic className='m-0' title='Your Order&#39;s Details'>
                    <div className='grid grid-cols-3 items-start gap-5'>
                        <Card title="Receiver's Info" size='small'>
                            <p>Name: {orderDetails?.receiverInfo.name}</p>
                            <p>Email: {orderDetails?.receiverInfo.email}</p>
                            <p>Phone: {orderDetails?.receiverInfo.phone}</p>
                        </Card>

                        <Card title='Payment' size='small'>
                            <p>Method: {orderDetails?.paymentMethod}</p>
                            <p>Shipping Fee: {orderDetails?.shippingFee}</p>
                            <p>Tax: {orderDetails?.tax}</p>
                            <p>Paid Status: {orderDetails?.isPaid ? 'Paid' : "Haven't Paid"}</p>
                        </Card>

                        <Card title='Shipping Address' size='small'>
                            <p>City: {orderDetails?.shippingAddress.city}</p>
                            <p>Country: {orderDetails?.shippingAddress.country}</p>
                            <p>
                                Line : {orderDetails?.shippingAddress.line1}, {orderDetails?.shippingAddress.line2}
                            </p>
                            <p>Postal Code: {orderDetails?.shippingAddress.postal_code}</p>
                            <p>District: {orderDetails?.shippingAddress.state}</p>
                        </Card>

                        <Card title='Products' size='small' className='col-span-3'>
                            <Space direction='vertical' size={7} className='w-full'>
                                {orderDetails?.items &&
                                    orderDetails.items.map((product, i) => {
                                        return (
                                            <Card key={i} className='w-full p-0'>
                                                <div className='flex'>
                                                    <div className='flex w-[20%] items-center justify-center text-center'>
                                                        <Image className='h-[70px] w-[70px]' src={product?.image} />
                                                    </div>

                                                    <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                                        <h3 className='font-medium'>{product?.name}</h3>
                                                    </div>

                                                    <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                                        <span>{product?.price && Currency.format(product.price)}</span>
                                                    </div>

                                                    <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                                        <span> x{product?.quantity}</span>
                                                    </div>

                                                    <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                                        <span>
                                                            {product?.price &&
                                                                Currency.format(product?.price * product?.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}

                                <div className='total mt-3'>
                                    <Flex justify='end'>
                                        <Badge
                                            color='#16bcdc'
                                            count={orderDetails?.items ? orderDetails.items.length : 0}
                                            className='mr-22 flex w-auto pr-2'
                                        >
                                            <Space>
                                                <div className='text-lg font-semibold'>Total:</div>

                                                <div className='text-lg font-semibold'>
                                                    {orderDetails?.totalPrice &&
                                                        Currency.format(orderDetails.totalPrice)}
                                                </div>
                                            </Space>
                                        </Badge>
                                    </Flex>
                                </div>
                            </Space>
                        </Card>
                    </div>
                </WrapperList>
            </Modal>
        </>
    );
};

export default PopupOrderDetails;

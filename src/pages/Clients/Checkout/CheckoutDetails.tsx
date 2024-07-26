import { FileDoneOutlined, HomeTwoTone, IdcardTwoTone, RightCircleFilled, ShoppingTwoTone } from '@ant-design/icons';
import { Badge, Button, Card, Descriptions, DescriptionsProps, Flex, Image, Space, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useMutationCreateOrder } from '~/hooks/checkout/useCreateOrder';
import { useVnPayOrder } from '~/hooks/checkout/useVnPayOrder';
import { RootState } from '~/store/store';
import { Currency } from '~/utils';

const CheckoutDetails = () => {
    const information = useSelector((state: RootState) => state?.orderReducer?.Detail);

    const totalAmount = (information?.items as { price: number; quantity: number }[])?.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);

    const items: DescriptionsProps['items'] = [
        {
            key: '0',
            label: (
                <span className='flex items-center text-lg font-bold text-[#16bcdc]'>
                    <Space>
                        <IdcardTwoTone /> Your Info
                    </Space>
                </span>
            ),
            children: '',
            span: 2,
        },
        {
            key: '1',
            label: <span className='text-base'>Name</span>,
            children: <span className='text-base'>{information?.receiverInfo.name}</span>,
        },
        {
            key: '2',
            label: <span className='text-base'>Contact</span>,
            children: <span className='text-base'>{information?.receiverInfo.phone}</span>,
        },
        {
            key: '3',
            label: <span className='text-base'>Email</span>,
            children: <span className='text-base'>{information?.receiverInfo.email}</span>,
            span: 2,
        },
        {
            key: '4',
            label: (
                <span className='flex items-center text-lg font-bold text-[#16bcdc]'>
                    <Space>
                        <HomeTwoTone /> Shipping Address
                    </Space>
                </span>
            ),
            children: '',
            span: 2,
        },
        {
            key: '5',
            label: <span className='text-base'>Country</span>,
            children: <span className='text-base'>{information?.shippingAddress.country}</span>,
        },
        {
            key: '6',
            label: <span className='text-base'>City</span>,
            children: <span className='text-base'>{information?.shippingAddress.city}</span>,
        },
        {
            key: '7',
            label: <span className='text-base'>District</span>,
            children: <span className='text-base'>{information?.shippingAddress.state}</span>,
        },
        {
            key: '8',
            label: <span className='text-base'>Street Address</span>,
            children: <span className='text-base'>{information?.shippingAddress.line1}</span>,
        },
        {
            key: '9',
            label: <span className='text-base'>Appartment, suite, etc.</span>,
            children: <span className='text-base'>{information?.shippingAddress.line2}</span>,
        },
        {
            key: '10',
            label: <span className='text-base'>Zipcode</span>,
            children: <span className='text-base'>{information?.shippingAddress.postal_code}</span>,
        },
        {
            key: '11',
            label: (
                <span className='flex items-center text-lg font-bold text-[#16bcdc]'>
                    <Space>
                        <ShoppingTwoTone /> Your Cart
                    </Space>
                </span>
            ),
            children: '',
            span: 2,
        },
        {
            key: '12',
            label: 'Products',
            children: (
                <>
                    <Space direction='vertical' size={7} className='w-full'>
                        {information?.items &&
                            information.items.map((product, i) => {
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
                                    count={information?.items ? information.items.length : 0}
                                    className='mr-22 flex w-auto pr-2'
                                >
                                    <Space>
                                        <div className='text-lg font-semibold'>Total:</div>

                                        <div className='text-lg font-semibold'>{Currency.format(totalAmount)}</div>
                                    </Space>
                                </Badge>
                            </Flex>
                        </div>
                    </Space>
                </>
            ),
        },
    ];
    const { mutate: cashCheckout, isPending: CashPending } = useMutationCreateOrder();
    const { mutate: vnPayCheckOut, isPending: VnPayPending } = useVnPayOrder();
    const handleFinishOrder = () => {
        if (information?.PaymentMethods === 1) {
            cashCheckout(information);
        } else if (information?.PaymentMethods === 2) {
            vnPayCheckOut(information);
        }
    };
    return (
        <div className='mx-auto max-w-[1280px]'>
            {/* TITLE */}
            <div className='mb-4 flex px-4 py-3'>
                <FileDoneOutlined className='mr-2 text-3xl text-[#1e3a8a]' />
                <h2 className='text-2xl font-semibold text-[#1e3a8a]'>Here&apos;s your checkout details:</h2>
            </div>

            {/* DETAILS */}
            <Descriptions
                layout='vertical'
                bordered
                column={2}
                labelStyle={{ fontWeight: 'bold' }}
                size='middle'
                items={items}
            />

            {/* PROCEED TO CHECKOUT BTN */}
            <div className='mx-auto my-3 w-1/2'>
                <Button
                    onClick={() => handleFinishOrder()}
                    type='primary'
                    block
                    className='flex h-10 w-[640px] items-center justify-center bg-[#16bcdc] text-lg font-semibold'
                >
                    {!VnPayPending && !CashPending && (
                        <>
                            Proceed to Checkout <RightCircleFilled className='pt-[3px]' />
                        </>
                    )}
                    {VnPayPending && <Spin />}
                    {CashPending && <Spin />}
                </Button>
            </div>
        </div>
    );
};

export default CheckoutDetails;

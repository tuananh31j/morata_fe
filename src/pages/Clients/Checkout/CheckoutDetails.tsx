import { FileDoneOutlined, RightCircleFilled } from '@ant-design/icons';
import { Badge, Button, Card, Descriptions, DescriptionsProps, Flex, Image, Space } from 'antd';

const CheckoutDetails = () => {
    // FAKE DATA
    const products = [
        {
            name: 'Product 1',
            price: 100,
            quantity: 1,
            image: 'image_url_1',
        },
        {
            name: 'Product 2',
            price: 200,
            quantity: 2,
            image: 'image_url_2',
        },
        {
            name: 'Product 3',
            price: 300,
            quantity: 3,
            image: 'image_url_3',
        },
        {
            name: 'Product 4',
            price: 400,
            quantity: 4,
            image: 'image_url_4',
        },
    ];

    const items: DescriptionsProps['items'] = [
        {
            key: '0',
            label: <span className='text-lg font-bold text-[#16bcdc]'>Your Info</span>,
            children: '',
            span: 2,
        },
        {
            key: '1',
            label: <span className='text-base'>Name</span>,
            children: <span className='text-base'>Buyer name here</span>,
        },
        {
            key: '2',
            label: <span className='text-base'>Contact</span>,
            children: <span className='text-base'>Buyer phone number here</span>,
        },
        {
            key: '3',
            label: <span className='text-base'>Email</span>,
            children: <span className='text-base'>Buyer email here</span>,
            span: 2,
        },
        {
            key: '4',
            label: <span className='text-lg font-bold text-[#16bcdc]'>Delivery Address</span>,
            children: '',
            span: 2,
        },
        {
            key: '5',
            label: <span className='text-base'>Country</span>,
            children: <span className='text-base'>Enter country here</span>,
        },
        {
            key: '6',
            label: <span className='text-base'>City</span>,
            children: <span className='text-base'>Enter city here</span>,
        },
        {
            key: '7',
            label: <span className='text-base'>District</span>,
            children: <span className='text-base'>Enter district here</span>,
        },
        {
            key: '8',
            label: <span className='text-base'>Street Address</span>,
            children: <span className='text-base'>Enter street address here</span>,
        },
        {
            key: '9',
            label: <span className='text-base'>Appartment, suite, etc.</span>,
            children: <span className='text-base'>Enter appartment, suite, etc. here</span>,
        },
        {
            key: '10',
            label: <span className='text-base'>Zipcode</span>,
            children: <span className='text-base'>Enter zipcode here</span>,
        },
        {
            key: '11',
            label: <span className='text-lg font-bold text-[#16bcdc]'>Your Cart</span>,
            children: '',
            span: 2,
        },
        {
            key: '12',
            label: 'Products',
            children: (
                <>
                    <Space direction='vertical' size={7} className='w-full'>
                        {products.map((product, i) => {
                            return (
                                <Card key={i} className='w-full p-0'>
                                    <div className='flex'>
                                        <div className='flex w-[20%] items-center justify-center text-center'>
                                            <Image
                                                className='h-[70px] w-[70px]'
                                                src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                                            />
                                        </div>

                                        <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                            {product.name}
                                        </div>

                                        <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                            ${product.price}
                                        </div>

                                        <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                            x{product.quantity}
                                        </div>

                                        <div className='flex w-[20%] items-center justify-center text-center text-base font-normal'>
                                            ${product.price * product.quantity}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}

                        <div className='total mt-3'>
                            <Flex justify='end'>
                                <Badge color='#16bcdc' count={products.length} className='mr-22 flex w-26'>
                                    <Space>
                                        <div className='text-lg font-semibold'>Total:</div>

                                        <div className='text-lg font-semibold'>
                                            {products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
                                        </div>
                                    </Space>
                                </Badge>
                            </Flex>
                        </div>
                    </Space>
                </>
            ),
        },
    ];

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
                    type='primary'
                    block
                    className='flex h-10 items-center justify-center bg-[#16bcdc] text-lg font-semibold'
                >
                    Proceed to Checkout <RightCircleFilled className='pt-[3px]' />
                </Button>
            </div>
        </div>
    );
};

export default CheckoutDetails;

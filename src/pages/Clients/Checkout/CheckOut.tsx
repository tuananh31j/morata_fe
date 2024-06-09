import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useGetMyCart from '~/hooks/Queries/useGetMyCart';
import { RootState } from '~/store/store';
import showMessage from '~/utils/ShowMessage';

const demoDataProduct = [
    {
        name: 'Blink Home Security Camera System',
        image: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/files/55_64x64.png?v=1702563441',
        price: 162,
        quantity: 1,
    },
    {
        name: 'Apple iPhone 11 Pro 256GB Space Gray – Unlocked',
        price: 210,
        image: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/products/products_5_1_64x64.jpg?v=1697644653',
        quantity: 1,
    },
];

const CheckOut = () => {
    // demo use hook useState
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { data: orderItem } = useGetMyCart(user?._id);
    const responsePayloadCheckout = () => {
        return orderItem?.data.items.map((item) => ({
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            image: item.productId.thumbnail,
        }));
    };
    const totalPrice = orderItem
        ? orderItem?.data?.items?.reduce(
              (total: number, product) => total + product.productId.price * product.quantity,
              0
          )
        : 0;
    const handleOnsubmit = (value: any) => {
        if (totalPrice > 1000) {
            showMessage(
                'Your order has exceeded the checkout limit of $1000, please proceed to online checkout!',
                'warning',
                3000
            );
        } else {
            const bodyData = {
                customerInfor: {
                    name: user?.username,
                    email: user?.email,
                    phone: value.phone,
                },
                shippingAddress: value,
                items: responsePayloadCheckout(),
                totalPrice,
            };
            console.log(bodyData);
        }
    };
    const handlePayStripe = () => {
        console.log('ok chờ call api nhé');
    };
    return (
        <>
            <div className='mx-auto mt-[5px] max-w-[1280px]'>
                <Link to={'/'} className='font-bold duration-300 hover:text-cyan-500'>
                    &lt; Back To Home
                </Link>
            </div>
            <div className='mx-auto mt-[25px] flex max-w-[1280px] flex-col-reverse gap-10 md:flex-row'>
                <div className='w-full rounded-lg border-[1px] border-[#7777] p-5'>
                    <h3 className='text-center text-[#777777]'>Express checkout</h3>
                    <div className='my-2'>
                        <button
                            onClick={handlePayStripe}
                            className='flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-blue-700 text-white'
                        >
                            <img
                                src='https://asset.brandfetch.io/idxAg10C0L/idTHPdqoDR.jpeg'
                                width={40}
                                height={40}
                                className='rounded-full'
                                alt=''
                            />
                            <span className='font-medium'>Stripe Pay</span>
                        </button>
                    </div>
                    <h3 className='text-center text-[#777777]'>Or</h3>
                    <hr />
                    <Form name='checkout' onFinish={handleOnsubmit} layout='vertical' style={{ maxWidth: 600 }}>
                        <h3 className='text-[21px] font-semibold'>Contact</h3>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Phone Number'
                                name='phone'
                                rules={[{ required: true, message: 'Enter your phone number' }]}
                            >
                                <Input placeholder='Email or phone number' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <h3 className='text-[21px] font-semibold'>Delivery</h3>

                        <div className=''>
                            <Form.Item
                                name='country'
                                label='Country'
                                rules={[{ required: true, message: 'Please select gender!' }]}
                            >
                                <Select placeholder='select your country' className='h-[48px]'>
                                    <Select.Option value='Việt Nam'>Viet Nam</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='City'
                                name='city'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Select placeholder='select your city' className='h-[48px]'>
                                    <Select.Option value='Hà Nội'>Ha Noi</Select.Option>
                                    <Select.Option value='Hồ Chí Minh'>Ho Chi Minh</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='District'
                                name='state'
                                rules={[{ required: true, message: 'Enter District' }]}
                            >
                                <Input placeholder='District' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Street Address'
                                name='line1'
                                rules={[{ required: true, message: 'Enter Street Address' }]}
                            >
                                <Input placeholder='Street Address' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Apartment / suite/ etc'
                                name='line2'
                                rules={[{ required: true, message: 'Enter Apartment, suite, etc.r' }]}
                            >
                                <Input placeholder='Apartment, suite, etc' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Zip Code'
                                name='postal_code'
                                rules={[{ required: true, message: 'Enter Zip Code' }]}
                            >
                                <Input placeholder='0000000' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>

                        <div className='mt-[35px]'>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: '#3c535e',
                                            defaultHoverBg: '#2a3b44',
                                            defaultHoverBorderColor: 'none',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    htmlType='submit'
                                    className='h-[58px] w-full text-[16px] font-semibold text-white'
                                >
                                    Order Now
                                </Button>
                            </ConfigProvider>
                        </div>
                    </Form>
                </div>
                <div className=' w-full'>
                    <div className='-order-1 flex flex-col gap-[15px] px-5 '>
                        {orderItem?.data.items.map((item, index) => (
                            <div key={index} className='flex items-center gap-[14px]'>
                                <div className='relative rounded-[2px]  border-[1px] '>
                                    <img src={item.productId.thumbnail} alt='' width={80} />
                                    <span
                                        style={{ backgroundColor: 'rgba(0,0,0, 0.58)' }}
                                        className='absolute -right-3 -top-3 z-10 rounded-full px-[9px] py-[2px] text-[12px] font-semibold text-white'
                                    >
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className='w-full'>
                                    <span className='text-[14px]'>{item.productId.name}</span>
                                </div>
                                <div>
                                    <span className='text-[14px]'>${item.productId.price}</span>
                                </div>
                            </div>
                        ))}
                        <div className='mt-[44px]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[14px]'>Subtotal</h3>
                                <span>${totalPrice}</span>
                            </div>

                            <div className='mt-[12px] flex justify-between '>
                                <h3 className='text-[19px] font-medium'>Total </h3>
                                <span className='text-[19px] font-medium'>
                                    <span className='text-[12px] text-[#777777]'>CAD</span> ${totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;

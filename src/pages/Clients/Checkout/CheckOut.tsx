import { Button, ConfigProvider, Form, Input, Radio, Select, Space } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const demoDataProduct = [
    {
        id: 'kaslndlkasnd',
        title: 'Blink Home Security Camera System',
        image: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/files/55_64x64.png?v=1702563441',
        price: 162,
        quantity: 1,
    },
    {
        id: 'asdasdasdsad',
        title: 'Apple iPhone 11 Pro 256GB Space Gray – Unlocked',
        price: 210,
        image: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/products/products_5_1_64x64.jpg?v=1697644653',
        quantity: 1,
    },
];

const CheckOut = () => {
    // demo use hook useState
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const handleOnsubmit = (value: any) => {
        if (value.payMethod === 'PayOnline') {
            navigate('/online');
        }
        console.log({ ...value, demoDataProduct });
    };
    const totalOrderAmount = demoDataProduct.reduce((total, product) => total + product.price * product.quantity, 0);
    const getvalueShipping = (value: string) => {
        setAddress(value);
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
                    <Form name='checkout' onFinish={handleOnsubmit} layout='vertical' style={{ maxWidth: 600 }}>
                        <h3 className='text-[21px] font-semibold'>Contact</h3>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Email or phone number'
                                name='emailorphone'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Input placeholder='Email or phone number' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <h3 className='text-[21px] font-semibold'>Delivery</h3>

                        <div className=' mt-[15px] flex justify-between gap-5'>
                            <Form.Item
                                label='First Name'
                                className='w-full'
                                name='firstName'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Input placeholder='Enter your first name' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                            <Form.Item
                                label='Last Name'
                                className='w-full'
                                name='lastName'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Input placeholder='Enter your last name' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                name='country'
                                label='Country'
                                rules={[{ required: true, message: 'Please select gender!' }]}
                            >
                                <Select placeholder='select your country' className='h-[48px]'>
                                    <Select.Option value='vn'>Viet Nam</Select.Option>
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
                                    <Select.Option value='HaNoi'>Ha Noi</Select.Option>
                                    <Select.Option value='HoChiMinh'>Ho Chi Minh</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Address'
                                name='address'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Input
                                    onChange={(e) => getvalueShipping(e.target.value)}
                                    placeholder='Address'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Apartment / suite/ etc'
                                name='apartment'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Input placeholder='Apartment, suite, etc. (optional)' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name='payMethod'
                                label='Pay Methods'
                                rules={[{ required: true, message: 'Please chose your pay method' }]}
                            >
                                <Radio.Group>
                                    <Space direction='vertical'>
                                        <Radio value={'COD'}>Cash on delivery - COD</Radio>
                                        <Radio value={'PayOnline'}>Pay Online</Radio>
                                    </Space>
                                </Radio.Group>
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
                        {demoDataProduct.map((item, index) => (
                            <div key={index} className='flex items-center gap-[14px]'>
                                <div className='relative rounded-[2px]  border-[1px] border-[#7777]'>
                                    <img src={item.image} alt='' />
                                    <span
                                        style={{ backgroundColor: 'rgba(0,0,0, 0.58)' }}
                                        className='absolute -right-3 -top-3 z-10 rounded-full px-[9px] py-[2px] text-[12px] font-semibold text-white'
                                    >
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className='w-full'>
                                    <span className='text-[14px]'>{item.title}</span>
                                </div>
                                <div>
                                    <span className='text-[14px]'>${item.price}</span>
                                </div>
                            </div>
                        ))}
                        <div className='mt-[44px]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[14px]'>Subtotal</h3>
                                <span>${totalOrderAmount}</span>
                            </div>
                            <div className='mt-[12px] flex items-center justify-between'>
                                <h3 className='text-[14px]'>Shipping </h3>
                                <span className='text-[14px] text-[#777777]'>
                                    {address ? address : 'Enter your address'}
                                </span>
                            </div>
                            <div className='mt-[12px] flex justify-between '>
                                <h3 className='text-[19px] font-medium'>Total </h3>
                                <span className='text-[19px] font-medium'>
                                    <span className='text-[12px] text-[#777777]'>CAD</span> ${totalOrderAmount}
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

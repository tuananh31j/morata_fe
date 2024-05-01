import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, List, Avatar, InputNumber, Slider } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
const CartDrawer = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };

    const products = [
        {
            id: 1,
            name: 'Apple iPhone 11 Pro 256GB Space Gray – Unlocked',
            color: 'Red',
            quantity: 2,
            imageSrc: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/products/products_5_1_small.jpg?v=1697644653',
            href: '/product/1',
            price: 262.0,
        },
        {
            id: 2,
            name: 'Apple iPhone 11 Pro 256GB Space Gray – Unlocked',
            color: 'Blue',
            quantity: 1,
            imageSrc: 'https://cdn.shopify.com/s/files/1/0836/9845/0750/products/products_5_1_small.jpg?v=1697644653',
            href: '/product/2',
            price: 262.0,
        },
    ];
    const freeShippingThreshold = 1000;
    const totalOrderAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const marks = {
        0: `$0`,
        [totalOrderAmount]: `$${totalOrderAmount}`,
        [freeShippingThreshold]: `$${freeShippingThreshold}`,
    };
    const handleQuantityChange = (id: number, value: number) => {
        console.log(id, value);
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className='cursor-pointer' onClick={() => setVisible(true)}>
                {children}
            </span>
            <Drawer
                title={
                    <div className='flex items-center justify-between'>
                        <div className='font-bold uppercase text-[#222222]'>Shopping cart</div>
                        <Button type='text' onClick={onClose}>
                            <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                        </Button>
                    </div>
                }
                width={450}
                placement='right'
                closable={false}
                onClose={onClose}
                open={visible}
                className='relative z-10 '
            >
                <List
                    itemLayout='vertical'
                    dataSource={products}
                    renderItem={(product) => (
                        <List.Item>
                            <div className='flex w-full items-center justify-between'>
                                <List.Item.Meta
                                    avatar={<Avatar className='h-[80px] w-[80px]' src={product.imageSrc} />}
                                    title={
                                        <a
                                            style={{ color: '#0068c9' }}
                                            className='text-[14px] font-bold text-[#0068c9]'
                                            href={product.href}
                                        >
                                            {product.name}
                                        </a>
                                    }
                                    description={
                                        <span className='text-base font-bold text-[#222222]'>${product.price}</span>
                                    }
                                />
                                <Button type='text' className='mb-20 text-indigo-600 hover:text-indigo-500'>
                                    <DeleteOutlined />
                                </Button>
                            </div>
                            <div className='ml-5 flex items-center justify-center'>
                                <Button
                                    type='default'
                                    icon={
                                        <MinusOutlined className='transform transition duration-500 hover:rotate-180' />
                                    }
                                    onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                                />
                                <InputNumber min={1} value={product.quantity} className='pl-7' />
                                <Button
                                    type='default'
                                    icon={
                                        <PlusOutlined className='transform transition duration-500 hover:rotate-180' />
                                    }
                                    onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                />
                            </div>
                        </List.Item>
                    )}
                />
                <div className='free-shipping__text mb-14'>
                    <Slider
                        className='custom-slider'
                        min={0}
                        max={freeShippingThreshold}
                        marks={marks}
                        value={Math.min(totalOrderAmount, freeShippingThreshold)}
                        step={null}
                        trackStyle={{ background: '#FF0000' }}
                    />
                    {totalOrderAmount < freeShippingThreshold && (
                        <p className='mt-8 text-base'>
                            Spend ${freeShippingThreshold - totalOrderAmount} more and get{' '}
                            <span className='text-[#16bcdc]'>Free Shipping !</span>
                        </p>
                    )}
                </div>
                <div className='border-t border-gray-200 px-4 py-6'>
                    <div className='flex justify-between text-base font-bold text-gray-900'>
                        <p className='text-xs uppercase '>Subtotal:</p>
                        <p className='text-base text-[#cc1414]'>$262.00</p>
                    </div>
                    <div className='mt-6'>
                        <Button className=' h-[50px] text-sm font-semibold uppercase' type='default' block>
                            view cart
                        </Button>
                    </div>
                    <div className='mt-6'>
                        <Button
                            className='h-[50px] bg-[#222222] text-sm font-semibold uppercase text-white'
                            type='default'
                            block
                        >
                            Checkout
                        </Button>
                    </div>
                    <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                            or{' '}
                            <Button
                                type='text'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                                onClick={onClose}
                            >
                                Continue Shopping
                            </Button>
                        </p>
                    </div>
                </div>
            </Drawer>
        </motion.div>
    );
};

export default CartDrawer;

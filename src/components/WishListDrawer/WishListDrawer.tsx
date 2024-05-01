import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, ConfigProvider, Drawer, List } from 'antd';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const WishListDrawer = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    };

    const data = [
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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className='cursor-pointer' onClick={() => setVisible(true)}>
                {children}
            </span>
            <Drawer
                title={
                    <div className='flex items-center justify-between'>
                        <div className='font-bold uppercase text-[#222222]'>Wishlist</div>
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
                className='relative z-10'
            >
                <List
                    itemLayout='vertical'
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <div className='flex w-full items-center justify-between'>
                                <List.Item.Meta
                                    avatar={<Avatar className='h-[80px] w-[80px]' src={item.imageSrc} />}
                                    title={
                                        <Link style={{ color: '#0068c9' }} to={item.href}>
                                            <p className='text-[14px] font-bold text-[#0068c9] transition-colors duration-200 hover:text-[#ea0d42]'>
                                                {item.name}
                                            </p>
                                        </Link>
                                    }
                                    description={
                                        <span className='text-base font-bold text-[#222222]'>${item.price}</span>
                                    }
                                />
                                <Button type='text' className='mb-20 text-indigo-600 hover:text-indigo-500'>
                                    <CloseOutlined />
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
                <div className='mt-6'>
                    <ConfigProvider
                        theme={{
                            token: {
                                borderRadiusLG: 8,
                            },
                        }}
                    >
                        <Link to={`/wishlist`} onClick={() => setVisible(false)}>
                            <Button
                                className='h-[50px] bg-[#222222] text-sm font-bold uppercase text-white'
                                type='default'
                                block
                            >
                                View Wishlist
                            </Button>
                        </Link>
                    </ConfigProvider>
                </div>
            </Drawer>
        </motion.div>
    );
};

export default WishListDrawer;

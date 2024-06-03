import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Empty, InputNumber, List, Slider } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMutationDecreaseCart } from '~/hooks/Mutations/cart/useDecreaseQuantity';
import { useMutationIncreaseCart } from '~/hooks/Mutations/cart/useIncreaseQuantity';
import { useMutationRemoveItem } from '~/hooks/Mutations/cart/useRemoveOne';
import { setClose, setOpen } from '~/store/slice/cartSlice';
import { RootState } from '~/store/store';
import { CartData, CartItem } from '~/types/Cart';
import { Currency } from '~/utils';

type CartRenderItemType = {
    productId: CartItem;
    quantity: number;
};
const CartDrawer = ({ children, item }: { children: React.ReactNode; item: CartData }) => {
    const { mutate: increase } = useMutationIncreaseCart();
    const { mutate: removeItem } = useMutationRemoveItem();
    const { mutate: decrease } = useMutationDecreaseCart();
    const cart = useSelector((state: RootState) => state.cartReducer.cartOpen);
    const cartDispatch = useDispatch();
    const onClose = () => {
        cartDispatch(setClose());
    };

    const products = item?.items;
    const freeShippingThreshold = 1000;
    const totalOrderAmount = products?.reduce(
        (total: number, product) => total + product.productId.price * product.quantity,
        0
    );
    const marks = {
        0: `$0`,
        [totalOrderAmount]: `$${totalOrderAmount}`,
        [freeShippingThreshold]: `$${freeShippingThreshold}`,
    };
    const user = useSelector((state: RootState) => state.authReducer.user);
    const handleIncreaseQuantity = (id: string) => {
        if (user) {
            const data = {
                productId: id,
                userId: user._id,
            };
            increase(data);
        }
    };
    const handleRemoveCart = (id: string) => {
        if (user) {
            const data = {
                productId: id,
                userId: user._id,
            };
            removeItem(data);
        }
    };
    const handleDecreaseQuantity = (id: string) => {
        if (user) {
            const data = {
                productId: id,
                userId: user._id,
            };
            decrease(data);
        }
    };

    const debouncedIncrease = debounce((id: string) => handleIncreaseQuantity(id), 300);
    const debouncedDecrease = debounce((id: string) => handleDecreaseQuantity(id), 300);
    const debouncedRemove = debounce((id: string) => handleRemoveCart(id), 300);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className='cursor-pointer' onClick={() => cartDispatch(setOpen())}>
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
                open={cart}
                className='relative z-10 '
            >
                {products?.length < 1 && (
                    <div className='flex flex-col items-center'>
                        <Empty description={false} />
                        <p className='text-center text-xl font-medium leading-6'>Your cart is empty.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] bg-[#222222] px-12 font-bold text-white'>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}
                {products?.length > 0 && (
                    <>
                        <List
                            itemLayout='vertical'
                            className='h-[40vh] w-full overflow-x-hidden overflow-y-scroll'
                            dataSource={products}
                            renderItem={(product: CartRenderItemType) => (
                                <List.Item>
                                    <div className='flex w-full items-center justify-between'>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    className='h-[80px] w-[80px]'
                                                    src={product.productId.thumbnail}
                                                />
                                            }
                                            title={
                                                <Link
                                                    style={{ color: '#0068c9' }}
                                                    className='text-[14px] font-bold text-[#0068c9]'
                                                    to={`/products/${product.productId._id}`}
                                                >
                                                    {product.productId.name}
                                                </Link>
                                            }
                                            description={
                                                <div className='flex justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <span
                                                            className={clsx(
                                                                'text-base font-semibold leading-5 text-[#222]',
                                                                {
                                                                    'text-red-600':
                                                                        product.productId.discountPercentage > 0,
                                                                }
                                                            )}
                                                        >
                                                            {Currency.format(product.productId.price)}
                                                        </span>
                                                        {product.productId.discountPercentage > 0 && (
                                                            <del className=' text-base font-semibold leading-5 text-gray-400'>
                                                                {Currency.format(
                                                                    product.productId.price *
                                                                        (1 + product.productId.discountPercentage / 100)
                                                                )}
                                                            </del>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className='font-medium'>
                                                            Total:{' '}
                                                            <b className='text-[#22222]'>
                                                                {Currency.format(
                                                                    product.productId.price * product.quantity
                                                                )}
                                                            </b>
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        />
                                        <Button
                                            onClickCapture={() => debouncedRemove(product.productId._id)}
                                            type='text'
                                            className='mb-20 text-indigo-600 hover:text-indigo-500'
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                    <div className='ml-5 flex items-center justify-center'>
                                        <Button
                                            type='default'
                                            disabled={product.quantity < 2}
                                            onClick={() => debouncedDecrease(product.productId._id)}
                                            icon={
                                                <MinusOutlined className='transform transition duration-500 hover:rotate-180' />
                                            }
                                            // onClick={() => handleQuantityChange(product.productId._id, product.quantity - 1)}
                                        />
                                        <InputNumber min={1} value={product.quantity} className='pl-7' />
                                        <Button
                                            type='default'
                                            icon={
                                                <PlusOutlined className='transform transition duration-500 hover:rotate-180' />
                                            }
                                            onClick={() => debouncedIncrease(product.productId._id)}
                                        />
                                    </div>
                                </List.Item>
                            )}
                        />
                        {totalOrderAmount < freeShippingThreshold && (
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
                                        Spend ${freeShippingThreshold - totalOrderAmount} more and get
                                        <span className='text-[#16bcdc]'>Free Shipping !</span>
                                    </p>
                                )}
                            </div>
                        )}
                        <div className='border-t border-gray-200 px-4 py-6'>
                            <div className='flex justify-between text-base font-bold text-gray-900'>
                                <p className='text-xs uppercase '>Subtotal:</p>
                                <p className='text-base text-[#cc1414]'>${totalOrderAmount}</p>
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
                    </>
                )}
            </Drawer>
        </motion.div>
    );
};

export default CartDrawer;

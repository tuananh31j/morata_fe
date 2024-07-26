import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty, Image, InputNumber, List, Slider, Spin } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBar from '~/components/_common/Loading/LoadingBar';
import { MAIN_ROUTES } from '~/constants/router';
import { useCart } from '~/hooks/_common/useCart';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import { RootState } from '~/store/store';
import { ICartDataResponse } from '~/types/cart/CartResponse';
import { Currency } from '~/utils';

type PropsType = {
    children: React.ReactNode;
    item?: ICartDataResponse;
};
const CartDrawer = ({ children, item }: PropsType) => {
    const { handleRemoveCart, isPending } = useMutationRemoveItem();
    const { mutate: stripeCheckout, isPending: PendingStripe } = useMutationCheckOutSession();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const { handleOpenCart, onClose, cart } = useCart();
    const user = useSelector((state: RootState) => state.authReducer.user?._id);
    const products = item ? item.items : null;
    const freeShippingThreshold = 1000;
    const totalOrderAmount = products
        ? products?.reduce((total: number, product) => total + product.productVariation.price * product.quantity, 0)
        : 0;
    const marks = {
        0: `$0`,
        [totalOrderAmount]: `$${totalOrderAmount}`,
        [freeShippingThreshold]: `$${freeShippingThreshold}`,
    };
    const responsePayloadCheckout = products?.map((product) => ({
        name: product.productVariation.productId.name,
        price: product.productVariation.price,
        quantity: product.quantity,
        image: product.productVariation.image,
    }));
    const handlePayStripe = () => {
        stripeCheckout({
            items: responsePayloadCheckout,
        });
    };
    const [quantityProduct, setQuantityProduct] = useState<{ quantity: number; id: string }[]>([]);
    const [pendingUpdates, setPendingUpdates] = useState<{ productVariation: string; quantity: number } | null>(null);
    useEffect(() => {
        if (products) {
            const newArr = products.map(({ quantity, productVariation }) => ({ quantity, id: productVariation._id }));
            setQuantityProduct(newArr);
        }
    }, [products]);
    const handleChangeQuantity = (id: string, newQuantity: number) => {
        setQuantityProduct((prev) =>
            prev.map((itemCart) => (itemCart.id === id ? { ...itemCart, quantity: newQuantity } : itemCart))
        );
        setPendingUpdates({ productVariation: id, quantity: newQuantity });
    };
    const debouncedUpdate = useCallback(
        debounce(async (payload: any) => {
            await updateQuantity(payload);
        }, 500),
        []
    );
    const handleIncreaseQuantity = (id: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            return prev.map((itemCart) =>
                itemCart.id === id ? { ...itemCart, quantity: itemCart.quantity + 1 } : itemCart
            );
        });
        const newQuantity = (quantityProduct.find((itemCart) => itemCart.id === id)?.quantity || 0) + 1;
        handleChangeQuantity(id, newQuantity);
    };
    const handleDecreaseQuantity = (id: string) => {
        setQuantityProduct((prev) => {
            if (!prev) return [];
            const itemFill = prev.find((itemCart) => itemCart.id === id);
            if (itemFill && itemFill.quantity > 1) {
                return prev.map((itemCart) =>
                    itemCart.id === id ? { ...itemCart, quantity: itemCart.quantity - 1 } : itemCart
                );
            }
            return prev;
        });
        const newQuantity = (quantityProduct.find((itemCart) => itemCart.id === id)?.quantity || 0) - 1;
        handleChangeQuantity(id, newQuantity);
    };
    const debouncedRemove = debounce((id: string) => handleRemoveCart(id), 500);
    useEffect(() => {
        if (pendingUpdates) {
            debouncedUpdate({
                userId: user,
                ...pendingUpdates,
            });
        }
    }, [pendingUpdates, debouncedUpdate]);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className={'cursor-pointer'} onClick={handleOpenCart}>
                {children}
            </span>
            <Drawer
                title={
                    <>
                        <div className='h-[4px] w-full'>{isPending && <LoadingBar />}</div>
                        <div className='flex items-center justify-between'>
                            <div className='font-bold uppercase text-[#222222]'>Shopping cart</div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                width={450}
                placement='right'
                closable={false}
                onClose={onClose}
                open={cart}
                className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                {!products && (
                    <div className='flex flex-col items-center'>
                        <Empty description={false} />
                        <p className='text-center text-xl font-medium leading-6'>Your cart is empty.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] bg-[#222222] px-12 font-bold text-white'>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}
                {products && products.length < 1 && (
                    <div className='flex flex-col items-center'>
                        <Empty description={false} />
                        <p className='text-center text-xl font-medium leading-6'>Your cart is empty.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] bg-[#222222] px-12 font-bold text-white'>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}
                {products && products.length > 0 && (
                    <>
                        <List
                            itemLayout='vertical'
                            className='h-[40vh] w-full overflow-x-hidden overflow-y-scroll'
                            dataSource={products}
                            renderItem={(product) => {
                                const quantity =
                                    quantityProduct?.find((p) => p.id === product.productVariation._id)?.quantity || 0;
                                return (
                                    <List.Item>
                                        <div className='flex w-full items-center justify-between'>
                                            <List.Item.Meta
                                                avatar={
                                                    <Image
                                                        className='h-[80px] w-[80px]'
                                                        src={product.productVariation.image}
                                                    />
                                                }
                                                title={
                                                    <Link
                                                        style={{ color: '#0068c9' }}
                                                        className='text-[14px] font-bold text-[#0068c9]'
                                                        to={`${MAIN_ROUTES.PRODUCTS}/${product.productVariation.productId._id}`}
                                                    >
                                                        {product.productVariation.productId.name}
                                                    </Link>
                                                }
                                                description={
                                                    <div className='flex justify-between'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='flex flex-col'>
                                                                <span>
                                                                    {product.productVariation.color.toUpperCase()}
                                                                </span>
                                                                <span
                                                                    className={clsx(
                                                                        'text-base font-semibold leading-5 text-[#222]'
                                                                        // {
                                                                        //     'text-red-600':
                                                                        //         product.productId.discountPercentage > 0,
                                                                        // }
                                                                    )}
                                                                >
                                                                    {Currency.format(product.productVariation.price)}
                                                                </span>
                                                            </div>
                                                            <div className='ml-5 flex items-center justify-center'>
                                                                <Button
                                                                    type='default'
                                                                    disabled={quantity < 2}
                                                                    icon={
                                                                        <MinusOutlined className='transform transition duration-500 hover:rotate-180' />
                                                                    }
                                                                    onClick={() =>
                                                                        handleDecreaseQuantity(
                                                                            product.productVariation._id
                                                                        )
                                                                    }
                                                                />
                                                                <InputNumber min={1} value={quantity} className='' />
                                                                <Button
                                                                    type='default'
                                                                    disabled={
                                                                        quantity === product.productVariation.stock
                                                                    }
                                                                    icon={
                                                                        <PlusOutlined className='transform transition duration-500 hover:rotate-180' />
                                                                    }
                                                                    onClick={() =>
                                                                        handleIncreaseQuantity(
                                                                            product.productVariation._id
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            {/* {product.productId.discountPercentage > 0 && (
                                                            <del className=' text-gray-400 text-base font-semibold leading-5'>
                                                                {Currency.format(
                                                                    product.productId.price *
                                                                        product.quantity *
                                                                        (1 + product.productId.discountPercentage / 100)
                                                                )}
                                                            </del>
                                                        )} */}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                            <Button
                                                onClickCapture={() => debouncedRemove(product.productVariation._id)}
                                                type='text'
                                                className='mb-20 text-indigo-600 hover:text-indigo-500'
                                            >
                                                <DeleteOutlined />
                                            </Button>
                                        </div>
                                    </List.Item>
                                );
                            }}
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
                        <div className='border-gray-200 border-t px-4 py-6'>
                            <div className='text-gray-900 flex justify-between text-base font-bold'>
                                <p className='text-xs uppercase '>Subtotal:</p>
                                <p className='text-base text-[#cc1414]'>{Currency.format(totalOrderAmount)}</p>
                            </div>
                            <div className='mt-6'>
                                <button
                                    onClick={handlePayStripe}
                                    disabled={!products.length}
                                    className='
                                    flex
                                    h-[48px] w-full items-center justify-center gap-5 rounded-[5px] bg-blue-700 text-sm font-semibold text-white duration-500 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-65'
                                >
                                    {!PendingStripe && (
                                        <>
                                            <img
                                                src='https://asset.brandfetch.io/idxAg10C0L/idTHPdqoDR.jpeg'
                                                width={40}
                                                height={40}
                                                className='rounded-full'
                                                alt=''
                                            />
                                            <span>PAY WITH STRIPE</span>
                                        </>
                                    )}
                                    {PendingStripe && <Spin />}
                                </button>
                            </div>
                            <div className='mt-6'>
                                <Link to={MAIN_ROUTES.CHECKOUT}>
                                    <Button
                                        onClick={onClose}
                                        className='h-[50px] bg-[#222222] text-sm font-semibold uppercase text-white'
                                        type='default'
                                        block
                                    >
                                        CheckOut
                                    </Button>
                                </Link>
                            </div>
                            {totalOrderAmount > 1000 && (
                                <div className='h-[30px]'>
                                    <p className='px-2 text-yellow-500'>
                                        Warning: Your order has exceeded the checkout limit of $1000, please proceed to
                                        online checkout!
                                    </p>
                                </div>
                            )}
                            <div className='text-gray-500 mt-6 flex justify-center text-center text-sm'>
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

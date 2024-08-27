import { CloseOutlined, DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, Empty, Image, InputNumber, List, Slider, Spin } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBar from '~/components/_common/Loading/LoadingBar';
import { MAIN_ROUTES } from '~/constants/router';
import { useCart } from '~/hooks/_common/useCart';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import { RootState } from '~/store/store';
import { IAddCartPayload } from '~/types/cart/CartPayload';
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
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const responsePayloadCheckout = products?.map((item) => ({
        name: item?.productVariation?.productId?.name,
        price: item?.productVariation?.price,
        quantity: item?.quantity,
        image: item?.productVariation?.image,
        productId: item?.productVariation?.productId?._id,
        productVariationId: item?.productVariation?._id,
    }));
    const handlePayStripe = () => {
        stripeCheckout({
            items: responsePayloadCheckout,
            currency: 'vnd',
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
    /* eslint-disable */
    const debouncedUpdate = useCallback(
        debounce(async (payload: IAddCartPayload) => {
            await updateQuantity(payload);
        }, 500),
        []
    );
    /* eslint-disable */

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
    /* eslint-disable */
    useEffect(() => {
        if (pendingUpdates) {
            debouncedUpdate({
                userId: user ? user : '',
                ...pendingUpdates,
            });
        }
    }, [pendingUpdates, debouncedUpdate]);
    /* eslint-enable */

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
                            <div className='font-bold uppercase text-[#222222]'>Giỏ Hàng</div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                width={'42vw'}
                placement='right'
                closable={false}
                onClose={onClose}
                open={cart}
                className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                {!products && (
                    <div className='flex flex-col items-center'>
                        <Empty description={false} />
                        <p className='text-center text-xl font-medium leading-6'>Giỏ hàng hiện không có sản phẩm.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] bg-[#222222] px-12 font-bold text-white'>
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
                {products && products.length < 1 && (
                    <div className='flex flex-col items-center'>
                        <Empty description={false} />
                        <p className='text-center text-xl font-medium leading-6'>Giỏ hàng hiện không có sản phẩm.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] bg-[#222222] px-12 font-bold text-white'>
                            Tiếp tục mua hàng
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
                                return product.productVariation.isActive ? (
                                    <List.Item key={product.productVariation._id}>
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
                                                        to={`${MAIN_ROUTES.PRODUCTS}/${product?.productVariation?.productId?._id}`}
                                                    >
                                                        {product?.productVariation?.productId?.name}
                                                    </Link>
                                                }
                                                description={
                                                    <div className='flex justify-between'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='flex flex-col'>
                                                                {product.productVariation?.variantAttributes?.map(
                                                                    (itemP, index) => (
                                                                        <div key={index}>
                                                                            <span className='capitalize text-black'>
                                                                                {itemP.name}
                                                                            </span>
                                                                            :<span className='ms-2'>{itemP.value}</span>
                                                                            {/* {product.productVariation.color.toUpperCase()} */}
                                                                        </div>
                                                                    )
                                                                )}
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
                                                                <ConfigProvider
                                                                    theme={{
                                                                        token: {
                                                                            colorBgContainerDisabled: 'white',
                                                                            colorTextDisabled: 'black',
                                                                        },
                                                                    }}
                                                                >
                                                                    <InputNumber
                                                                        min={1}
                                                                        disabled={true}
                                                                        value={quantity}
                                                                        className=''
                                                                    />
                                                                </ConfigProvider>

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
                                                            <del className='text-base font-semibold leading-5 text-gray-400 '>
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
                                ) : (
                                    <List.Item key={product.productVariation._id}>
                                        <div className='relative flex min-h-[125px] w-full items-center'>
                                            <div className='absolute z-50 flex h-full w-full items-center justify-end rounded-lg bg-[#7777]'>
                                                <h3 className='mr-20 font-medium'>Sản phẩm hiển không khả dụng</h3>
                                            </div>
                                            <Image
                                                className='h-[80px] w-[80px] opacity-40'
                                                src={product.productVariation.image}
                                            />
                                            <div className='flex items-center opacity-40'>
                                                <div>
                                                    <span
                                                        style={{ color: '#0068c9' }}
                                                        className='text-[14px] font-bold text-[#0068c9]'
                                                    >
                                                        {product?.productVariation?.productId?.name}
                                                    </span>
                                                    <div className=' flex justify-between'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='flex flex-col  gap-2'>
                                                                <div className='flex gap-2'>
                                                                    {product.productVariation?.variantAttributes?.map(
                                                                        (itemP, index) => (
                                                                            <div key={index}>
                                                                                <span className='capitalize text-black'>
                                                                                    {itemP.name}
                                                                                </span>
                                                                                :<span>{itemP.value}</span>
                                                                                {/* {product.productVariation.color.toUpperCase()} */}
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
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
                                                            {/* {product.productId.discountPercentage > 0 && (
                                                            <del className='text-base font-semibold leading-5 text-gray-400 '>
                                                                {Currency.format(
                                                                    product.productId.price *
                                                                        product.quantity *
                                                                        (1 + product.productId.discountPercentage / 100)
                                                                )}
                                                            </del>
                                                        )} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <span
                                                onClickCapture={() => debouncedRemove(product.productVariation._id)}
                                                className='absolute right-5 top-[50%] z-[55] -translate-y-[50%] cursor-pointer text-indigo-600 hover:text-indigo-500'
                                            >
                                                <DeleteOutlined />
                                            </span>
                                        </div>
                                    </List.Item>
                                );
                            }}
                        />
                        {/* {totalOrderAmount < freeShippingThreshold && (
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
                        )} */}
                        <div className='border-gray-200 border-t px-4 py-6'>
                            <div className='text-gray-900 flex justify-between text-base font-bold'>
                                <p className='text-xs uppercase '>Tổng đơn hàng:</p>
                                <p className='text-base text-[#cc1414]'>{Currency.format(totalOrderAmount)}</p>
                            </div>

                            <div className='mt-6'>
                                <Link to={MAIN_ROUTES.CART}>
                                    <Button
                                        onClick={onClose}
                                        className='h-[50px] bg-white text-sm font-semibold uppercase text-black transition-colors duration-300 hover:bg-[#16bcdc] hover:text-white'
                                        type='default'
                                        block
                                    >
                                        Xem giỏ hàng
                                    </Button>
                                </Link>
                            </div>

                            <div className='text-gray-500 mt-6 flex justify-center text-center text-sm'>
                                <p>
                                    Hoặc{' '}
                                    <Button
                                        type='text'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                        onClick={onClose}
                                    >
                                        Tiếp tục mua hàng
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

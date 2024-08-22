import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, InputNumber, Spin, Table } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TableProps } from 'antd/lib';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import { addItems, removeAll, removeItems, setItemsCart } from '~/store/slice/cartSlice';
import { RootState, useTypedSelector } from '~/store/store';
import { IAddCartPayload } from '~/types/cart/CartPayload';
import { ICartItemsResponse } from '~/types/cart/CartResponse';
import { Currency } from '~/utils';

const CartDetail = () => {
    useDocumentTitle('Giỏ hàng');
    const { handleRemoveCart, isPending } = useMutationRemoveItem();
    const { mutate: stripeCheckout, isPending: PendingStripe } = useMutationCheckOutSession();
    const dispatch = useDispatch();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const { mutate: removeAllCart, isPending: isRemoveAllPending } = useMutationRemoveAll();
    const user = useTypedSelector((state) => state.authReducer.user?._id);
    const { data: cartResponseData, isLoading, responsePayloadCheckout } = useGetMyCart(user);
    const cartItem = useTypedSelector((state) => state.cartReducer.items);
    const products = cartResponseData?.data;
    const totalOrderAmount = cartItem
        ? cartItem.reduce((total: number, product) => total + product.productVariation.price * product.quantity, 0)
        : 0;
    const taxAmount = Math.round(totalOrderAmount * 0.1);
    const priceWithTax = totalOrderAmount + taxAmount;

    const handlePayStripe = () => {
        stripeCheckout({
            items: responsePayloadCheckout,
            currency: 'VND',
        });
    };
    const [quantityProduct, setQuantityProduct] = useState<{ quantity: number; id: string }[]>([]);
    const [pendingUpdates, setPendingUpdates] = useState<{ productVariation: string; quantity: number } | null>(null);
    const findItemsActive = products?.items.filter((v) => v.productVariation.isActive);
    useEffect(() => {
        if (products) {
            const newArr = products?.items.map(({ quantity, productVariation }) => ({
                quantity,
                id: productVariation._id,
            }));
            setQuantityProduct(newArr);
        }
        if (products) {
            dispatch(setItemsCart(findItemsActive!));
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
    const onchangeItemsChecked = (e: CheckboxChangeEvent, productVariation: ICartItemsResponse) => {
        if (!e.target.checked) {
            dispatch(removeItems(productVariation.productVariation._id));
        } else if (e.target.checked) {
            dispatch(addItems(productVariation));
        }
    };
    const onChangeTargetAll = (type: 'REMOVE' | 'ADD') => {
        switch (type) {
            case 'ADD':
                return dispatch(setItemsCart(findItemsActive!));
            case 'REMOVE':
                return dispatch(removeAll());

            default:
                return null;
        }
    };

    const columns: TableProps<ICartItemsResponse>['columns'] = [
        {
            key: '',
            dataIndex: '',
            title: 'Chọn',
            render: (_, record) => {
                const isChecked = cartItem.some((item) => item.productVariation._id === record.productVariation._id);
                return (
                    <Checkbox
                        onChange={(e) => onchangeItemsChecked(e, record)}
                        disabled={!record.productVariation.isActive}
                        checked={isChecked}
                    />
                );
            },
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Sản phẩm',
            render: (_, product) => (
                <div>
                    <div className='flex gap-2'>
                        <div>
                            <Image className='h-[80px] w-[80px]' src={product.productVariation.image} />
                        </div>
                        <div>
                            {product.productVariation.isActive ? (
                                <div className='flex flex-wrap'>
                                    <Link
                                        style={{ color: '#0068c9' }}
                                        className='text[#0068c9] text-base font-semibold'
                                        to={`${MAIN_ROUTES.PRODUCTS}/${product.productVariation.productId._id}`}
                                    >
                                        {product.productVariation.productId.name}
                                    </Link>
                                </div>
                            ) : (
                                <div className='flex h-full items-center justify-center'>
                                    <h3 className='ml-4 font-medium'>Sản Phẩm Hiện không Khả Dụng</h3>
                                </div>
                            )}
                            {product.productVariation.isActive && (
                                <div className='flex flex-col'>
                                    {product.productVariation?.variantAttributes?.map((itemP, index) => (
                                        <div key={index} className='flex gap-2'>
                                            <span className='font-medium capitalize text-black'>{itemP.name}:</span>
                                            <span>{itemP.value}</span>
                                        </div>
                                    ))}
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
                            )}
                        </div>
                    </div>
                </div>
            ),
            width: '50%',
        },
        {
            key: 'stock',
            dataIndex: 'stock',
            title: <span className='flex items-center justify-center'>Số lượng</span>,
            render: (_, product) => {
                const quantity = quantityProduct?.find((p) => p.id === product.productVariation._id)?.quantity || 0;
                return product.productVariation.isActive ? (
                    <div className='flex items-center justify-center'>
                        <Button
                            type='default'
                            disabled={quantity < 2}
                            icon={<MinusOutlined className='transform transition duration-500 hover:rotate-180' />}
                            onClick={() => handleDecreaseQuantity(product.productVariation._id)}
                        />
                        <InputNumber min={1} value={quantity} />
                        <Button
                            type='default'
                            disabled={quantity === product.productVariation.stock}
                            icon={<PlusOutlined className='transform transition duration-500 hover:rotate-180' />}
                            onClick={() => handleIncreaseQuantity(product.productVariation._id)}
                        />
                    </div>
                ) : (
                    <div className='flex items-center justify-center'>
                        <InputNumber min={1} value={quantity} />
                    </div>
                );
            },
        },
        {
            key: 'subTotal',
            dataIndex: 'subTotal',
            title: 'Tổng tiền',
            render: (_, product) => <span>{Currency.format(product.productVariation.price * product.quantity)}</span>,
        },
        {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (_, product) => (
                <DeleteOutlined
                    className='cursor-pointer rounded-full bg-rose-200 p-2 text-rose-700 transition-colors duration-500 hover:bg-rose-300'
                    onClickCapture={() => debouncedRemove(product.productVariation._id)}
                />
            ),
        },
    ];

    return (
        <>
            <div className='my-16 bg-white px-6 py-8'>
                <h1 className='my-4 text-3xl font-medium text-black'>Giỏ hàng</h1>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-[2.4fr,1fr] '>
                    <Form>
                        <div>
                            {products?.items && (
                                <Table
                                    loading={isLoading}
                                    rowKey={(product) => product.productVariation._id}
                                    columns={columns}
                                    dataSource={products.items}
                                />
                            )}
                            <div className='my-6 flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    <Link
                                        to='/'
                                        className='block rounded-sm bg-black px-6 py-[0.62rem] text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    >
                                        Tiếp tục mua hàng
                                    </Link>
                                    <Button
                                        size='large'
                                        onClick={() => onChangeTargetAll('ADD')}
                                        className='block rounded-sm bg-black px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                    >
                                        Chọn Tất Cả Sản Phẩm
                                    </Button>
                                    {cartItem.length > 0 && (
                                        <Button
                                            size='large'
                                            onClick={() => onChangeTargetAll('REMOVE')}
                                            className='block rounded-sm bg-black px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                        >
                                            Bỏ Chọn Tất Cả Sản Phẩm
                                        </Button>
                                    )}
                                </div>
                                <Button
                                    size='large'
                                    disabled={isRemoveAllPending}
                                    loading={isRemoveAllPending}
                                    onClick={() => removeAllCart({ userId: user ? user : '' })}
                                    className='block rounded-sm bg-black px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                >
                                    Xóa tất cả
                                </Button>
                            </div>
                            <div></div>
                        </div>
                        {/* <div className='mt-8'>
                            <h4 className='m-2 text-lg font-medium'>Thêm ghi chú</h4>
                            <TextArea
                                placeholder='Điền ghi chú để chúng tôi có thể hỗ trợ bạn'
                                rows={6}
                                className='font-semibold text-black'
                            ></TextArea>
                        </div> */}
                    </Form>

                    <div className='border-2 border-[#16bcdc] px-8 pb-6 pt-6 text-base text-black'>
                        {cartItem.length > 0 ? (
                            <>
                                <div className='mt-4 flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                                    <span>Tổng tiền mặt hàng:</span>
                                    <span className='text-lg '>{Currency.format(totalOrderAmount)}</span>
                                </div>
                                <div className=' flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                                    <span>Thuế:</span>
                                    <span>10%</span>
                                </div>
                                <div className=' flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                                    <span>Tổng tiền:</span>
                                    <span className='text-lg text-green-500'>{Currency.format(priceWithTax)}</span>
                                </div>
                                <p className='my-4 opacity-90'>Phí vận chuyển sẽ được tính khi thanh toán.</p>
                            </>
                        ) : (
                            <div className='flex min-h-[185px] items-center justify-center'>
                                <h3 className='font-bold'>Vui Lòng Chọn Sản Phẩm Để Thanh Toán</h3>
                            </div>
                        )}

                        <div className='mt-4'>
                            {totalOrderAmount > 50000000 && (
                                <div className='flex h-[48px] items-center justify-center'>
                                    <p className='text-center text-sm text-red'>
                                        Tổng tiền mặt hàng trên 50 triệu COD không khả dụng
                                    </p>
                                </div>
                            )}
                            {totalOrderAmount < 50000000 && (
                                <Link to={MAIN_ROUTES.SHIPPING}>
                                    <Button
                                        size='large'
                                        disabled={totalOrderAmount > 50000000 || !cartItem.length}
                                        className={`block h-[48px] w-full  rounded-[5px] bg-black px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]`}
                                    >
                                        Thanh Toán
                                    </Button>
                                </Link>
                            )}
                            <div className='mt-2'>
                                <div className='mb-2 flex w-full justify-center'>
                                    <span className='text-center text-sm text-[#777777]'>
                                        Thanh toán online miễn phí phí vận chuyển
                                    </span>
                                </div>
                                <button
                                    onClick={handlePayStripe}
                                    disabled={!cartItem.length}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartDetail;

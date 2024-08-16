import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, InputNumber, List, Spin, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { TableProps } from 'antd/lib';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { RiH3 } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { record } from 'zod';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationRemoveAll } from '~/hooks/cart/Mutations/useRemoveAll';
import { useMutationRemoveItem } from '~/hooks/cart/Mutations/useRemoveOne';
import { useUpdateQuantity } from '~/hooks/cart/Mutations/useUpdateQuantity';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import { useTypedSelector } from '~/store/store';
import { IAddCartPayload } from '~/types/cart/CartPayload';
import { ICartDataResponse, ICartItemsResponse } from '~/types/cart/CartResponse';
import { Currency } from '~/utils';

const CartDetail = () => {
    const { handleRemoveCart, isPending } = useMutationRemoveItem();
    const { mutate: stripeCheckout, isPending: PendingStripe } = useMutationCheckOutSession();
    const { mutate: updateQuantity } = useUpdateQuantity();
    const [isAgree, setIsAgree] = useState<boolean>(false);
    const { mutate: removeAllCart, isPending: isRemoveAllPending } = useMutationRemoveAll();
    const user = useTypedSelector((state) => state.authReducer.user?._id);
    const { data: cartResponseData, isLoading } = useGetMyCart(user);
    const products = cartResponseData?.data;

    const freeShippingThreshold = 1000;
    const totalOrderAmount = products?.items
        ? products?.items?.reduce(
              (total: number, product) => total + product.productVariation.price * product.quantity,
              0
          )
        : 0;

    const marks = {
        0: `$0`,
        [totalOrderAmount]: `$${totalOrderAmount}`,
        [freeShippingThreshold]: `$${freeShippingThreshold}`,
    };
    const responsePayloadCheckout = products?.items?.map((product) => ({
        name: product.productVariation.productId.name,
        price: product.productVariation.price,
        quantity: product.quantity,
        image: product.productVariation.image,
        productId: product.productVariation.productId._id,
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
            const newArr = products?.items.map(({ quantity, productVariation }) => ({
                quantity,
                id: productVariation._id,
            }));
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

    const columns: TableProps<ICartItemsResponse>['columns'] = [
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
                            <div className='flex flex-wrap'>
                                <Link
                                    style={{ color: '#0068c9' }}
                                    className='text[#0068c9] text-base font-semibold'
                                    to={`${MAIN_ROUTES.PRODUCTS}/${product.productVariation.productId._id}`}
                                >
                                    {product.productVariation.productId.name}
                                </Link>
                            </div>
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
                return (
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
                            <Table
                                loading={isLoading}
                                rowKey={(product) => product.productVariation._id}
                                columns={columns}
                                dataSource={products?.items}
                            />
                            <div className='my-6 flex items-center justify-between'>
                                <Link
                                    to='/'
                                    className='block rounded-sm bg-black px-6 py-[0.62rem] text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                >
                                    Tiếp tục mua hàng
                                </Link>

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

                    <div className='border-2 border-[#16bcdc] px-8 py-6 text-base text-black'>
                        {/* <div className='flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                            <span>Tổng tiền phụ:</span>
                            <span>{Currency.format(totalOrderAmount)}</span>
                        </div>
                        <div className='mt-4 flex items-center justify-between border-b  border-gray pb-6 text-base font-semibold'>
                            <span>Voucher:</span>
                            <Link to={'/'} className='hover:text-[#16bcdc]'>
                                Chọn voucher
                            </Link>
                        </div>
                        <div className='mt-4 flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                            <span>Bạn tiết kiệm được:</span>
                            <span>{Currency.format(10000)}</span>
                        </div>
                        <div className='mt-4 flex items-center justify-between border-b border-gray pb-6 text-base font-semibold'>
                            <span>Tổng tiền:</span>
                            <span className='text-lg text-green-500'>{Currency.format(totalOrderAmount)}</span>
                        </div>
                        <p className='my-4 opacity-90'>Thuế và phí vận chuyển sẽ được tính khi thanh toán.</p>
                        <div className='mb-3'>
                            <Checkbox checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)}>
                                {' '}
                                <span className='select-none'>
                                    Tôi đồng ý với{' '}
                                    <Link to={'/'} className='text-base font-semibold text-black hover:text-[#16bcdc]'>
                                        Điều khoản và Chính sách
                                    </Link>
                                </span>
                            </Checkbox>
                        </div> */}
                        <div className='mt-4'>
                            <Link to={MAIN_ROUTES.SHIPPING}>
                                <Button
                                    size='large'
                                    disabled={totalOrderAmount > 5000000}
                                    className={`block w-full rounded-sm bg-black px-10 py-2 text-center text-sm font-medium text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]`}
                                >
                                    Thanh Toán
                                </Button>
                            </Link>
                            <div className='mt-6'>
                                <button
                                    onClick={handlePayStripe}
                                    disabled={!products?.items.length}
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

import { Button, ConfigProvider, Form, InputNumber } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { IVariantItem } from '~/pages/Clients/ProductDetails/ProductDetails';
import { setImages, updateVariant } from '~/store/slice/DetailProduct';
import { RootState, useAppDispatch } from '~/store/store';
import { variationAttribute } from '~/types/cart/CartResponse';
import { IProductItemNew } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';

interface IPickerData {
    color: string;
    storage: string;
}

export default function ActionDetail({ product }: { product: IProductItemNew }) {
    const [valueQuantity, setQuantityValue] = useState(1);
    const variant = useSelector((state: RootState) => state?.detailProductReducer?.variant);
    const { mutate } = useMutationCart();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const initialVariant = product?.variationIds?.find((item) => item.stock > 0 && item.isActive);
    const [active, setActive] = useState<string>();

    // @ function
    const handleIncrement = () => {
        if (valueQuantity < (variant ? variant.stock : 0)) setQuantityValue(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setQuantityValue(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setQuantityValue(e ? e : 1);
    };
    const handleOnSubmit = (data: IPickerData) => {
        if (user) {
            const bodyAddToCart = {
                productVariation: variant ? variant._id : '',
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);

            setQuantityValue(1);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };
    /* eslint-disable */
    const dispatch = useAppDispatch();
    useEffect(() => {
        setQuantityValue(1);
    }, [product._id]);
    /* eslint-enable */
    const handleOnclickVariant = (item: IVariantItem) => {
        dispatch(updateVariant(item));
        if (valueQuantity > item.stock) {
            setQuantityValue(item.stock);
        }
    };
    const handleChangeVariant = (item: IVariantItem) => {
        handleOnclickVariant(item);
        setActive(item._id);
    };

    /* eslint-disable */
    useEffect(() => {
        // default variant value
        dispatch(
            updateVariant(
                initialVariant || {
                    _id: '',
                    stock: 0,
                    price: 0,
                    image: '',
                    productId: '',
                    isActive: false,
                }
            )
        );
        setActive(initialVariant?._id || '');
    }, [product]);
    /* eslint-enable */

    return (
        <>
            <div className='product-action'>
                {/* Button add to cart and quantity */}
                <Form onFinish={handleOnSubmit} layout='vertical'>
                    <div className='my-5'>
                        <Form.Item name={'variant'}>
                            <div className='flex flex-wrap items-center gap-3'>
                                {product?.variationIds.map((item) => {
                                    return (
                                        <div
                                            key={item._id}
                                            onClick={() => handleChangeVariant(item)}
                                            className={clsx(
                                                `flex cursor-pointer items-center justify-between gap-3 rounded-md border-2   bg-white px-2 py-1 transition duration-300 hover:opacity-70`,
                                                active === item._id && item.stock >= 1
                                                    ? 'border-blue-600 shadow-8'
                                                    : 'border-blue-100',
                                                item.stock < 1 || !item.isActive ? 'pointer-events-none opacity-50' : ''
                                            )}
                                        >
                                            <div className='select-none'>
                                                <img
                                                    src={item.image}
                                                    alt='variant product'
                                                    className='h-10 w-10 object-cover'
                                                />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                {item?.variantAttributes?.map((attr: variationAttribute, index) => (
                                                    <span
                                                        key={index}
                                                        className='flex select-none gap-x-2 text-sm font-medium text-black'
                                                    >
                                                        <span>{attr.name}:</span>
                                                        <span className='font-normal'>{attr.value}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Form.Item>
                    </div>
                    <div className='my-3 flex items-center gap-2'>
                        <span className='select-none font-medium text-[#777777]'>Sản phẩm còn lại:</span>

                        {variant?.stock === 0 || !variant?.isActive ? (
                            <span className='text-red'>Sản phẩm hết hàng</span>
                        ) : (
                            ''
                        )}
                        {(variant?.stock as number) > 0 && <span className='font-medium'>{variant?.stock}</span>}
                    </div>

                    <div className=' items-center gap-5 md:flex'>
                        <div className='mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]'>
                            <Button
                                onClick={handleDecrement}
                                disabled={valueQuantity < 2}
                                className='h-[48px] w-[48px]'
                            >
                                -
                            </Button>
                            <InputNumber
                                min={1}
                                max={variant?.stock || 1}
                                onChange={onChangeInputQuantity}
                                className='flex h-[48px] w-[58px] items-center'
                                value={valueQuantity}
                                controls={false}
                            />
                            <Button
                                onClick={handleIncrement}
                                disabled={valueQuantity === variant?.stock}
                                className='h-[48px] w-[48px]'
                            >
                                +
                            </Button>
                        </div>
                        <div className='w-[100%]'>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultHoverBg: '#16bcdc',
                                            defaultHoverColor: 'white',
                                            defaultHoverBorderColor: 'none',
                                        },
                                    },
                                }}
                            >
                                <button
                                    disabled={variant?.stock === 0 || !variant?.isActive}
                                    type='submit'
                                    className={`h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white ${variant?.stock === 0 || !variant?.isActive ? 'pointer-events-none opacity-60' : 'hover:bg-[#16bcdc]'}`}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </ConfigProvider>
                        </div>
                    </div>
                </Form>
                {/* Button buy with pay method other */}
                <div className='mt-[25px]'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBg: '#5a31f4',
                                    defaultHoverColor: 'white',
                                    defaultHoverBorderColor: 'none',
                                },
                            },
                        }}
                    >
                        {/* <Button
                            size={'large'}
                            disabled={variant?.stock === 0 || !variant?.isActive}
                            className={`h-[50px] w-full rounded-[30px] bg-[#5a31f4] ${variant?.stock === 0 || !variant?.isActive ? 'pointer-events-none opacity-60' : ''}  font-bold text-white`}
                        >
                            Thanh toán với Stripe
                        </Button> */}
                    </ConfigProvider>
                </div>
                {/* action favorite */}
            </div>
        </>
    );
}

import { Button, ConfigProvider, Form, InputNumber, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { IVariantItem } from '~/pages/Clients/ProductDetails/ProductDetails';
import { updateVariant } from '~/store/slice/DetailProduct';
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
    const initialVariant = product?.variationIds?.[0];
    const [active, setActive] = useState<number>(0);

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
        if (product.variationIds) {
            dispatch(updateVariant(product?.variationIds[0]));
        }
    }, [product._id]);
    /* eslint-enable */
    const handleOnclickVariant = (item: IVariantItem) => {
        console.log(item);
        dispatch(updateVariant(item));
        if (valueQuantity > item.stock) {
            setQuantityValue(item.stock);
        }
    };
    const handleChangeVariant = (item: IVariantItem, index: number) => {
        handleOnclickVariant(item);
        setActive(index);
    };

    /* eslint-disable */
    useEffect(() => {
        // default variant value
        dispatch(updateVariant(initialVariant));
    }, []);
    /* eslint-enable */

    return (
        <>
            <div className='product-action'>
                {/* Button add to cart and quantity */}
                <Form onFinish={handleOnSubmit} layout='vertical'>
                    <div className='my-4'>
                        <Form.Item name={'variant'}>
                            <div className='flex items-center gap-3'>
                                {product?.variationIds.map((item, index) => (
                                    <div
                                        key={item._id}
                                        onClick={() => handleChangeVariant(item, index)}
                                        className={` flex cursor-pointer items-center justify-between gap-3 rounded-sm border-2 ${active === index ? 'border-blue-600' : 'border-blue-200'} bg-white px-2 py-1 transition duration-300 hover:border-blue-600`}
                                    >
                                        <div className='select-none'>
                                            <img src={item.image} alt='variant product' className='h-10 w-10' />
                                        </div>
                                        {item?.variantAttributes?.map((attr: variationAttribute) => (
                                            <span key={attr._id} className='select-none text-sm text-black'>
                                                {attr.value}{' '}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Form.Item>
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
                                max={variant?.stock}
                                onChange={onChangeInputQuantity}
                                className='flex h-[48px] w-[58px] items-center '
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
                                    type='submit'
                                    className='h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white hover:bg-[#16bcdc]'
                                >
                                    Add to Cart
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
                        <Button
                            size={'large'}
                            className='h-[50px] w-full rounded-[30px] bg-[#5a31f4]  font-bold text-white'
                        >
                            Buy with Stripe
                        </Button>
                    </ConfigProvider>
                </div>
                {/* action favorite */}
            </div>
        </>
    );
}

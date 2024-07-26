import { Button, ConfigProvider, Form, InputNumber, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { IVariantItem } from '~/pages/Clients/ProductDetails/ProductDetails';
import { updateVariant } from '~/store/slice/DetailProduct';
import { RootState, useAppDispatch } from '~/store/store';
import { IProductItemNew } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';

interface IPickerData {
    color: string;
    storage: string;
}

export default function ActionDetail({ product }: { product: IProductItemNew }) {
    const [valueQuantity, setQuantityValue] = useState(1);
    const variant = useSelector((state: RootState) => state.DetailProduct.variant);
    const { mutate } = useMutationCart();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
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
        console.log(data);
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        setQuantityValue(1);
        if (product.variationIds) {
            dispatch(updateVariant(product?.variationIds[0]));
        }
    }, [product._id]);
    const handleOnclickVariant = (item: IVariantItem) => {
        dispatch(updateVariant(item));
        if (valueQuantity > item.stock) {
            setQuantityValue(item.stock);
        }
    };
    return (
        <>
            <div className='product-action'>
                {/* Button add to cart and quantity */}
                <Form onFinish={handleOnSubmit} layout='vertical'>
                    <div className='my-4'>
                        <Form.Item>
                            <Radio.Group
                                defaultValue={product.variationIds[0]._id}
                                optionType='button'
                                buttonStyle='solid'
                                className='flex flex-wrap gap-x-4 gap-y-6 border-none'
                            >
                                {product.variationIds.map((item, index) => (
                                    <div key={index}>
                                        <Radio
                                            className=' flex items-center'
                                            onClick={() => handleOnclickVariant(item)}
                                            value={item._id}
                                        >
                                            {item.color.toUpperCase()}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
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

import { DockerOutlined, FileProtectOutlined, HeartOutlined, MenuOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, InputNumber, Radio, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutationCart } from '~/hooks/Mutations/cart/useAddCart';
import { useGetAllAtributes } from '~/hooks/Queries/Attributes/useGetAttributesByCate';
import { RootState } from '~/store/store';
import { IProduct } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';

interface IPickerData {
    color: string;
    storage: string;
}
export default function ActionDetail({ product }: { product: IProduct }) {
    const { data: attributes, isFetching } = useGetAllAtributes(product.categoryId);
    const [valueQuantity, setQuantityValue] = useState(1);
    const { mutate } = useMutationCart();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const handleIncrement = () => {
        if (valueQuantity < (product ? product.stock : 0)) setQuantityValue(valueQuantity + 1);
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
                productId: product._id,
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);
            setQuantityValue(1);
        } else {
            navigate('/auth/login');
            showMessage('You need to login first!', 'warning');
        }
        console.log(data);
    };
    useEffect(() => {
        setQuantityValue(1);
    }, [product._id]);
    return (
        <>
            <div className='product-action'>
                {/* Button add to cart and quantity */}
                <Form onFinish={handleOnSubmit} layout='vertical'>
                    <div className='my-4'>
                        {attributes &&
                            attributes.data.length > 1 &&
                            attributes.data.map((label, index) => (
                                <Form.Item
                                    key={index}
                                    label={label.attribute}
                                    name={label.attribute.toLocaleLowerCase()}
                                    initialValue={label.details[0].value}
                                    rules={[{ required: true, message: `Please choose the ${label.attribute}` }]}
                                >
                                    <Radio.Group
                                        optionType='button'
                                        buttonStyle='solid'
                                        className='flex flex-wrap gap-x-4 gap-y-6 border-none'
                                    >
                                        {label.details.map((item, i) => (
                                            <div key={i}>
                                                <Radio
                                                    className={`${label.attribute.toLocaleLowerCase() === 'color' ? 'rounded-full' : 'rounded-sm'}`}
                                                    style={{ backgroundColor: item.value }}
                                                    value={item.value}
                                                >
                                                    {label.attribute.toLocaleLowerCase() !== 'color' && item.name}
                                                </Radio>
                                            </div>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            ))}
                        {isFetching && (
                            <div className='flex h-[20vh] w-full items-center justify-center'>
                                <ConfigProvider theme={{ components: { Spin: { dotSize: 30 } } }}>
                                    <Spin />
                                </ConfigProvider>
                            </div>
                        )}
                    </div>
                    <div className=' items-center md:flex '>
                        <div className='mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]'>
                            <Button onClick={handleDecrement} disabled={valueQuantity < 2} className='h-[48px]'>
                                -
                            </Button>
                            <InputNumber
                                min={1}
                                max={product.stock}
                                onChange={onChangeInputQuantity}
                                className='flex h-[48px] items-center'
                                value={valueQuantity}
                                controls={false}
                            />
                            <Button
                                onClick={handleIncrement}
                                disabled={valueQuantity === product.stock}
                                className='h-[48px]'
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
                <div className='mt-[15px] flex gap-5 text-sm'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBorderColor: 'none',
                                    defaultHoverBorderColor: 'none',
                                },
                            },
                        }}
                    >
                        <Button className='flex items-center'>
                            <HeartOutlined /> Add wishlist
                        </Button>
                        <Button className='flex items-center'>
                            <MenuOutlined /> Add compare
                        </Button>
                    </ConfigProvider>
                </div>
                {/* Roles for COD */}
                <div className='mt-[35px]'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBorderColor: 'none',
                                    defaultHoverBorderColor: 'none',
                                },
                            },
                        }}
                    >
                        <Button className='flex items-center text-base '>
                            <FileProtectOutlined /> Shipping and Returns
                        </Button>
                    </ConfigProvider>
                    <div className='ml-[15px] mt-[25px]'>
                        <p>
                            <DockerOutlined />{' '}
                            <span className='text-[#777777]'>
                                Estimate Delivery: <b className='text-black'>2 - 5 days</b>
                            </span>
                        </p>
                        <p className='mt-[15px]'>
                            <RedoOutlined />{' '}
                            <span className='text-[#777777]'>
                                Return within <b className='text-black'>30 days</b> of purchase. Taxes are
                                non-refundable.
                            </span>
                        </p>
                    </div>
                </div>
                {/* Availability product */}
                <div className='ml-[15px] mt-[35px] flex flex-col gap-2'>
                    <div className='flex '>
                        <p className='w-[115px] text-[#777777]'>Availability: </p>
                        {product.stock > 0 && <b className='text-green-500'>In Stock</b>}
                        {product.stock < 1 && <b className='text-red-500'>Out in Stock</b>}
                    </div>
                    <div className='flex'>
                        <p className='w-[115px]  text-[#777777]'>SKU: </p>
                        <span className='font-semibold text-black'>{product.sku}</span>
                    </div>
                    <div className='flex'>
                        <p className='w-[115px]  text-[#777777]'>Vendor: </p>
                        {/* <span className='font-semibold text-black'>{product.brandId.name}</span> */}
                    </div>
                    <div className='flex'>
                        <p className='w-[115px]  text-[#777777]'>Categories: </p>
                        {/* <span className='font-semibold text-black'>{product.categoryId.name}</span> */}
                    </div>
                </div>
            </div>
        </>
    );
}

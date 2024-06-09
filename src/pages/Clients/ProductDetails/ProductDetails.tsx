import {
    DockerOutlined,
    EyeOutlined,
    FileProtectOutlined,
    FireFilled,
    HeartOutlined,
    MenuOutlined,
    RedoOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import ProgressBar from '~/components/_common/ProgressBar';
import RatingDisplay from '~/components/_common/RatingDisplay';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { useMutationCart } from '~/hooks/Mutations/cart/useAddCart';
import useGetDetailProduct from '~/hooks/Queries/Products/useGetDetailProduct';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import ProductRelated from '~/pages/Clients/ProductDetails/_components/ProductRelated/ProductRelated';
import { RootState } from '~/store/store';
import { IAddCartPayload } from '~/types/cart/CartPayload';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';
import DescriptionProduct from './_components/Description/DescriptionProduct';
import ThumnailProduct from './_components/Thumbnail/ThumnailProduct';

const ProductDetails = () => {
    const [valueQuantity, setQuantityValue] = useState(1);
    const { mutate } = useMutationCart();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { id } = useParams();
    const { data: productDetail, isLoading } = useGetDetailProduct(id as string);
    const product = productDetail?.data;
    useDocumentTitle(`${product?.name}`);
    useEffect(() => {
        setQuantityValue(1);
    }, [id]);
    const oldPrice = product ? product?.price * (1 + product?.discountPercentage / 100) : 0;
    const handleIncrement = () => {
        if (valueQuantity < (product ? product.stock : 0)) setQuantityValue(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setQuantityValue(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setQuantityValue(e ? e : 1);
    };
    const handleAddToCart = (data: Omit<IAddCartPayload, 'userId'>) => {
        if (user) {
            const bodyAddToCart = {
                ...data,
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);
            setQuantityValue(1);
        } else {
            navigate('/auth/login');
            showMessage('You need to login first!', 'warning');
        }
    };
    return (
        <>
            {/* BeadCrumb */}
            {!isLoading && product && (
                <>
                    <BreadcrumbDisplay titleProduct={`${product.name}`} />
                    <div className='mt-[41px]'>
                        {/* Product Media and detail container */}
                        <div className='flex flex-col gap-[10px] lg:flex-row xl:px-[30px] xl:py-[40px]'>
                            {/* Product Media */}
                            <ThumnailProduct items={product.images} thumbnail={product.thumbnail} />
                            {/* Product Detail container */}
                            <div className='product-detail w-full'>
                                {/* Title and price */}
                                <div className='product-title'>
                                    <h1 className='text-2xl font-semibold text-[#0068c9]'>{product.name}</h1>
                                    <div className='product-rating  flex h-[49px] gap-5  text-sm'>
                                        <RatingDisplay rating={product.rating} reviews={product.reviewIds.length} />
                                        <div className='mt-[10px] flex items-center gap-2'>
                                            <FireFilled style={{ color: 'red' }} />
                                            <span>21 sold in last 24 hours</span>
                                        </div>
                                    </div>
                                    <div className='price mt-[25px] flex items-end gap-2'>
                                        <span className='text-3xl font-bold'>{Currency.format(product.price)}</span>
                                        {product.discountPercentage > 0 && (
                                            <del className='text-base font-bold text-[#777777]'>
                                                {Currency.format(oldPrice)}
                                            </del>
                                        )}
                                    </div>
                                    {product.discountPercentage > 0 && (
                                        <>
                                            <div className='mt-[15px]'>
                                                <span className='text-[14px] font-medium leading-6 text-red-500'>
                                                    Discount: {Currency.format(oldPrice - product.price)} (-
                                                    {product.discountPercentage}%)
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* information product */}
                                <div className='information-product mt-[25px]'>
                                    <ul className='list-inside list-disc text-sm leading-6 text-[#777777]'>
                                        <li>Bass and Stereo Sound</li>
                                        <li>Display with 3088 x 1440 pixels resolution.</li>
                                        <li>Memory, Storage & SIM: 12GB RAM, 256GB.</li>
                                    </ul>
                                </div>
                                {/* viewer now */}
                                <div className='mt-[29px] flex items-center gap-2'>
                                    <span className='flex items-center justify-center rounded-[50%] bg-black px-2 py-2'>
                                        <EyeOutlined style={{ color: 'white', fontSize: '12px' }} />
                                    </span>
                                    <span className=' text-sm'>17 people are viewing this right now</span>
                                </div>
                                {/* Progress  stock product*/}
                                {product.stock < 100 && (
                                    <>
                                        <div className='Progress-stock mt-[25px]'>
                                            <p className='text-base font-normal'>
                                                Hurry Up! Only <span className='text-cyan-500'>{product.stock}</span>{' '}
                                                left in stock
                                            </p>
                                            <ProgressBar stock={product.stock} />
                                        </div>
                                    </>
                                )}
                                {/* Produt action  */}
                                <div className='product-action  mt-[25px]'>
                                    {/* Button add to cart and quantity */}
                                    <div className=' items-center md:flex'>
                                        <div className='mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]'>
                                            <Button
                                                onClick={handleDecrement}
                                                disabled={valueQuantity < 2}
                                                className='h-[48px]'
                                            >
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
                                                <Button
                                                    onClick={() =>
                                                        handleAddToCart({
                                                            quantity: valueQuantity,
                                                            productId: product._id,
                                                        })
                                                    }
                                                    size={'large'}
                                                    className='h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white hover:bg-[#16bcdc]'
                                                >
                                                    Add to Cart
                                                </Button>
                                            </ConfigProvider>
                                        </div>
                                    </div>
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
                                                Buy with ...
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
                                                    Return within <b className='text-black'>30 days</b> of purchase.
                                                    Taxes are non-refundable.
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
                                        <div className='flex'>
                                            <p className='w-[115px]  text-[#777777]'>Tags: </p>
                                            {/* <span className='font-semibold text-black'>
                                                {product.brandId.name}, {product.categoryId.name}
                                            </span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DescriptionProduct />
                        {!isLoading && productDetail && <ProductRelated relatedProduct={productDetail} />}
                        {isLoading && (
                            <div className='flex gap-2'>
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails;

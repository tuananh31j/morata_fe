import {
    DockerOutlined,
    FileProtectOutlined,
    FireFilled,
    HeartOutlined,
    MenuOutlined,
    RedoOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import ProgressBar from '~/components/_common/ProgressBar';
import RatingDisplay from '~/components/_common/RatingDisplay';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import useGetDetailProduct from '~/hooks/products/Queries/useGetDetailProduct';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import ActionDetail from '~/pages/Clients/ProductDetails/_components/Action/ActionDetail';
import ProductRelated from '~/pages/Clients/ProductDetails/_components/ProductRelated/ProductRelated';
import { Currency } from '~/utils';
import DescriptionProduct from './_components/Description/DescriptionProduct';
import ThumnailProduct from './_components/Thumbnail/ThumnailProduct';
import { Button, ConfigProvider } from 'antd';

const ProductDetails = () => {
    const { id } = useParams();
    const { data: productDetail, isLoading } = useGetDetailProduct(id as string);
    const product = productDetail?.data;
    const oldPrice = product ? product?.price * (1 + product?.discountPercentage / 100) : 0;
    useDocumentTitle(`${product?.name}`);

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
                                                <span className='text-red-500 text-[14px] font-medium leading-6'>
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
                                {/* <div className='mt-[29px] flex items-center gap-2'>
                                    <span className='flex items-center justify-center rounded-[50%] bg-black px-2 py-2'>
                                        <EyeOutlined style={{ color: 'white', fontSize: '12px' }} />
                                    </span>
                                    <span className=' text-sm'>17 people are viewing this right now</span>
                                </div> */}
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
                                <ActionDetail product={product} />
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
                                                Return within <b className='text-black'>30 days</b> of purchase. Taxes
                                                are non-refundable.
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

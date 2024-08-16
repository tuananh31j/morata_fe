import { DockerOutlined, HeartOutlined, RedoOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import RatingDisplay from '~/components/_common/RatingDisplay';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetDetailProduct from '~/hooks/products/Queries/useGetDetailProduct';
import ActionDetail from '~/pages/Clients/ProductDetails/_components/Action/ActionDetail';
import ProductRelated from '~/pages/Clients/ProductDetails/_components/ProductRelated/ProductRelated';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { RootState } from '~/store/store';
import { Currency } from '~/utils';
import DescriptionProduct from './_components/Description/DescriptionProduct';
import ThumnailProduct from './_components/Thumbnail/ThumnailProduct';
import { Button, ConfigProvider } from 'antd';
import useMutationAddWishList from '~/hooks/wishlist/Mutations/useAddWishList';
import showMessage from '~/utils/ShowMessage';
import { MAIN_ROUTES } from '~/constants/router';
import useGetAllWishlist from '~/hooks/wishlist/Queries/useGetAllWishlist';
import useFilter from '~/hooks/_common/useFilter';

export type IVariantItem = {
    _id: string;
    price: number;
    discountPercentage?: number;
    stock: number;
    // sku: string;
    image?: string;
    productId: string;
    isActive: boolean;
};

const ProductDetails = () => {
    const { id } = useParams();
    const { query } = useFilter();
    const navigate = useNavigate();

    const { data: productDetail, isLoading } = useGetDetailProduct(id as string);
    const { mutate: addWishlist } = useMutationAddWishList();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { data: allWishList } = useGetAllWishlist(query);
    const wishListIds = allWishList?.data.wishList.map((item) => item._id);
    const handleAddWishlist = () => {
        if (user) {
            if (wishListIds?.includes(id as string)) {
                showMessage('Product already added to wishlist!', 'warning');
                return;
            }
            addWishlist({ productId: id as string });
            navigate(MAIN_ROUTES.WISHLIST);
        } else {
            navigate(MAIN_ROUTES.LOGIN);
            showMessage('You need to login first!', 'warning');
        }
    };

    const product = productDetail?.data;
    const dispatch = useDispatch();

    /* eslint-enable */
    const isInitialMount = useRef(true);
    useDocumentTitle(`${product?.name}`);
    const variant = useSelector((state: RootState) => state.detailProductReducer.variant);

    /* eslint-disable */
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return () => {
                if (!isInitialMount.current) {
                    dispatch(setReviewData({ orderId: '', isOpen: false, productId: '' }));
                }
                window.localStorage.removeItem('orderId');
            };
        }
    }, []);
    /* eslint-enable */
    return (
        <>
            {/* BeadCrumb */}
            {!isLoading && product && (
                <>
                    <BreadcrumbDisplay titleProduct={`${product.name}`} />
                    <div className='mt-[5px]'>
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
                                        <RatingDisplay rating={product.rating} reviews={product.reviewCount} />
                                        {/* <div className='mt-[10px] flex items-center gap-2'>
                                            <FireFilled style={{ color: 'red' }} />
                                            <span>21 sold in last 24 hours</span>
                                        </div> */}
                                    </div>
                                    <div className='price mt-[25px] flex items-end gap-2'>
                                        {variant && (
                                            <span className='text-3xl font-bold'>{Currency.format(variant.price)}</span>
                                        )}
                                        {product.discount > 0 && (
                                            <del className='text-base font-bold text-[#777777]'>
                                                {/* {Currency.format(oldPrice)} */}
                                            </del>
                                        )}
                                    </div>
                                    {product.discount > 0 && (
                                        <>
                                            <div className='mt-[15px]'>
                                                {/* <span className='text-red-500 text-sm leading-6 text-[#777777]'>
                                                    Discount: {Currency.format(oldPrice - product.price)} (-
                                                    {product.discountPercentage}%)
                                                </span> */}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* information product */}
                                {/* <div className='information-product mt-[25px]'>
                                    <ul className='list-inside list-disc text-sm leading-6 text-[#777777]'>
                                        <li>Bass and Stereo Sound</li>
                                        <li>Display with 3088 x 1440 pixels resolution.</li>
                                        <li>Memory, Storage & SIM: 12GB RAM, 256GB.</li>
                                    </ul>
                                </div> */}
                                {/* viewer now */}
                                {/* <div className='mt-[29px] flex items-center gap-2'>
                                    <span className='flex items-center justify-center rounded-[50%] bg-black px-2 py-2'>
                                        <EyeOutlined style={{ color: 'white', fontSize: '12px' }} />
                                    </span>
                                    <span className='text-sm '>17 people are viewing this right now</span>
                                </div> */}
                                {/* Progress  stock product*/}
                                {/* {product.stock < 100 && (
                                    <>
                                        <div className='Progress-stock mt-[25px]'>
                                            <p className='text-base font-normal'>
                                                Hurry Up! Only <span className='text-cyan-500'>{product.stock}</span>{' '}
                                                left in stock
                                            </p>
                                            <ProgressBar stock={product.stock} />
                                        </div>
                                    </>
                                )} */}
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
                                        <Button className='flex items-center' onClick={handleAddWishlist}>
                                            <HeartOutlined /> Add to wishlist
                                        </Button>
                                        {/* <Button className='flex items-center'>
                                            <MenuOutlined /> Add compare
                                        </Button> */}
                                    </ConfigProvider>
                                </div>
                                {/* Roles for COD */}
                                <div className='mt-[35px]'>
                                    {/* <ConfigProvider
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
                                    </ConfigProvider> */}
                                    <div className='ml-[15px] mt-[25px]'>
                                        <p>
                                            <DockerOutlined />{' '}
                                            <span className='text-[#777777]'>
                                                Thời gian giao hàng: <b className='text-black'>2 - 5 ngày</b>
                                            </span>
                                        </p>
                                        <p className='mt-[15px]'>
                                            <RedoOutlined />{' '}
                                            <span className='text-[#777777]'>
                                                Trả hàng trong vòng <b className='text-black'>30 days</b> khi đã mua.
                                                Thuế không được hoàn trả
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                {/* Availability product */}
                                <div className='ml-[15px] mt-[35px] flex flex-col gap-2'>
                                    <div className='flex '>
                                        <p className='w-[115px] text-[#777777]'>Availability: </p>
                                        {(variant?.stock as number) > 0 && <b className='text-green-500'>Còn hàng</b>}
                                        {!variant?.stock && <b className='text-red'>Hết hàng</b>}
                                    </div>

                                    <div className='flex'>
                                        <p className='w-[115px]  text-[#777777]'>Thương hiệu: </p>
                                        {product.brandId.name && (
                                            <Link
                                                to={`/products?brandId=${product.brandId._id}`}
                                                className='font-semibold text-black'
                                            >
                                                {product.brandId.name}
                                            </Link>
                                        )}
                                    </div>
                                    <div className='flex'>
                                        <p className='w-[115px]  text-[#777777]'>Danh mục: </p>
                                        {product.categoryId.name && (
                                            <Link
                                                to={`/products?categoryId=${product.categoryId._id}`}
                                                className='font-semibold text-black'
                                            >
                                                {product.categoryId.name}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DescriptionProduct review={product.rating} product={product} />
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

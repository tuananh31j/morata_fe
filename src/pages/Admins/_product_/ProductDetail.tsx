import { Tag } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RatingDisplay from '~/components/_common/RatingDisplay';
import useGetDetailProduct from '~/hooks/products/Queries/useGetDetailProduct';
import ActionDetail from '~/pages/Clients/ProductDetails/_components/Action/ActionDetail';
import ThumnailProduct from '~/pages/Clients/ProductDetails/_components/Thumbnail/ThumnailProduct';
import { useTypedSelector } from '~/store/store';
import { Currency } from '~/utils';

const ProductDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetDetailProduct(id!);
    const detailProduct = data?.data;
    const productVariation = useTypedSelector((state) => state.detailProductReducer);
    return (
        <>
            {!isLoading && (
                <div className='mx-6 mt-[41px] rounded-xl bg-white'>
                    {/* Product Media and detail container */}
                    <div className='flex flex-col gap-5 lg:flex-row xl:px-[30px] xl:py-[40px]'>
                        {/* Product Media */}
                        <ThumnailProduct
                            items={detailProduct?.images || []}
                            thumbnail={detailProduct?.thumbnail || ''}
                        />
                        {/* Product Detail container */}
                        <div className='product-detail w-full'>
                            {/* Title and price */}
                            <div className='product-title border-gray-300 border-b pb-4'>
                                <div className='border-gray-300 border-b pb-4'>
                                    <h1 className='text-2xl font-semibold '>{detailProduct?.name}</h1>
                                    <div className='mt-4 text-sm  '>
                                        <span className=' '>Review: </span>
                                        <RatingDisplay
                                            rating={detailProduct?.rating || 0}
                                            reviews={detailProduct?.reviewCount || 0}
                                        />
                                    </div>
                                </div>

                                <div className='price mt-4 flex items-end gap-2'>
                                    <span className='text-3xl font-bold '>
                                        {Currency.format(productVariation.variant?.price || 9999)}
                                    </span>
                                    {/* <del className='text-base font-bold text-[#777777]'>
                                        {Currency.format(productVariation.variant?.price || 9999)}
                                    </del> */}
                                </div>
                                <div className='mt-4 flex items-center gap-5'>
                                    <div className=''>
                                        <span className='text-base font-normal leading-6 '>
                                            Discount: (-
                                            {detailProduct?.discount}%)
                                        </span>
                                    </div>
                                    <div className='Progress-stock'>
                                        <p className='text-base font-normal '>
                                            Stock:{' '}
                                            <span className='text-cyan-500'>
                                                {detailProduct?.variationIds[0].stock}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='border-gray-300  mt-4 border-b pb-4'>
                                <div className='mb-2 mt-3 '>
                                    <p className='text-base font-normal '>
                                        Category:{' '}
                                        <Tag color='red' className='ml-2'>
                                            {detailProduct && detailProduct.categoryId.name}
                                        </Tag>
                                    </p>
                                </div>
                                <div className='mb-2 mt-3'>
                                    <span className='text-base '>
                                        Brand:{' '}
                                        <Tag color='gold' className='ml-2'>
                                            {detailProduct && detailProduct.brandId.name}
                                        </Tag>
                                    </span>
                                </div>
                                {/* Brand */}
                                <div className=' mt-3'>
                                    <div>
                                        {/* <p className='text-base font-normal  '>
                                            Sku: <span className='text-cyan-500'>{detailProduct?.sku}</span>
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                            {/* information product */}
                            <div className='information-product mt-[25px]'>
                                {detailProduct && <ActionDetail product={detailProduct} />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;

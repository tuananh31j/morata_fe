import { Tag } from 'antd';
import { useParams } from 'react-router-dom';
import RatingDisplay from '~/components/_common/RatingDisplay';
import useGetDetailProduct from '~/hooks/Queries/Products/useGetDetailProduct';
import ThumnailProduct from '~/pages/Clients/ProductDetails/_components/Thumbnail/ThumnailProduct';
import { Currency } from '~/utils';

const ProductDetail = () => {
    const { id } = useParams();
    console.log(id);
    const { data, isLoading } = useGetDetailProduct(id!);
    const detailProduct = data?.data;
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
                            <div className='product-title border-b border-gray-300 pb-4'>
                                <div className='border-b border-gray-300 pb-4'>
                                    <h1 className='text-2xl font-semibold '>{detailProduct?.name}</h1>
                                    <div className='mt-4 text-sm  '>
                                        <span className=' '>Review: </span>
                                        <RatingDisplay
                                            rating={detailProduct?.rating || 0}
                                            reviews={detailProduct?.reviewIds.length}
                                        />
                                    </div>
                                </div>

                                <div className='price mt-4 flex items-end gap-2'>
                                    <span className='text-3xl font-bold '>
                                        {Currency.format(
                                            detailProduct?.price ||
                                                9999 * (1 - (detailProduct?.discountPercentage || 0) / 100)
                                        )}
                                    </span>
                                    <del className='text-base font-bold text-[#777777]'>
                                        {Currency.format(detailProduct?.price || 9999)}
                                    </del>
                                </div>
                                <div className='mt-4 flex items-center gap-5'>
                                    <div className=''>
                                        <span className='text-base font-normal leading-6 '>
                                            Discount: (-
                                            {detailProduct?.discountPercentage}%)
                                        </span>
                                    </div>
                                    <div className='Progress-stock'>
                                        <p className='text-base font-normal '>
                                            Stock: <span className='text-cyan-500'>{detailProduct?.stock}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4  border-b border-gray-300 pb-4'>
                                <div className='mb-2 mt-3 '>
                                    <p className='text-base font-normal '>
                                        Category:{' '}
                                        <Tag color='red' className='ml-2'>
                                            {detailProduct?.categoryId}
                                        </Tag>
                                    </p>
                                </div>
                                <div className='mb-2 mt-3'>
                                    <span className='text-base '>
                                        Brand:{' '}
                                        <Tag color='gold' className='ml-2'>
                                            {detailProduct?.brandId}
                                        </Tag>
                                    </span>
                                </div>
                                {/* Brand */}
                                <div className=' mt-3'>
                                    <div>
                                        <p className='text-base font-normal  '>
                                            Sku: <span className='text-cyan-500'>{detailProduct?.sku}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* information product */}
                            <div className='information-product mt-[25px]'>
                                <ul className='list-inside list-disc text-sm leading-6 text-[#777777]  '>
                                    <li>Bass and Stereo Sound</li>
                                    <li>Display with 3088 x 1440 pixels resolution.</li>
                                    <li>Memory, Storage & SIM: 12GB RAM, 256GB.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;

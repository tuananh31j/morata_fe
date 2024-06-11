import { Tag } from 'antd';
import RatingDisplay from '~/components/_common/RatingDisplay';
import ThumnailProduct from '~/pages/Clients/ProductDetails/_components/Thumbnail/ThumnailProduct';
import { Currency } from '~/utils';

const ProductDetail = () => {
    return (
        <>
            <div className='mx-6 mt-[41px] rounded-xl bg-white dark:bg-[#111c44]'>
                {/* Product Media and detail container */}
                <div className='flex flex-col gap-5 lg:flex-row xl:px-[30px] xl:py-[40px]'>
                    {/* Product Media */}
                    <ThumnailProduct
                        items={[
                            'https://picsum.photos/500/500',
                            'https://picsum.photos/500/500',
                            'https://picsum.photos/500/500',
                            'https://picsum.photos/500/500',
                            'https://picsum.photos/500/500',
                        ]}
                        thumbnail={'https://picsum.photos/500/500'}
                    />
                    {/* Product Detail container */}
                    <div className='product-detail w-full'>
                        {/* Title and price */}
                        <div className='product-title border-b border-gray-50 pb-4 dark:border-opacity-60'>
                            <div className='border-b border-gray-50 pb-4 dark:border-opacity-60'>
                                <h1 className='text-2xl font-semibold text-white dark:opacity-80'>
                                    iPad 10.2 2021 WiFi 64GB | Chính hãng Apple Việt Nam
                                </h1>
                                <div className='mt-4 text-sm dark:text-white  dark:opacity-80'>
                                    <span className=' dark:text-white dark:opacity-80'>Review: </span>
                                    <RatingDisplay rating={4} reviews={5} />
                                </div>
                            </div>

                            <div className='price mt-4 flex items-end gap-2'>
                                <span className='text-3xl font-bold dark:text-white dark:opacity-80'>
                                    {Currency.format(3000)}
                                </span>
                                <del className='text-base font-bold text-[#777777] dark:text-gray-300 '>
                                    {Currency.format(3400)}
                                </del>
                            </div>
                            <div className='mt-4 flex items-center gap-5'>
                                <div className=''>
                                    <span className='text-base font-normal leading-6 dark:text-white dark:opacity-80'>
                                        Discount: (-
                                        {11}%)
                                    </span>
                                </div>
                                <div className='Progress-stock'>
                                    <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                        Stock: <span className='text-cyan-300'>{5}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4  border-b border-gray-50 pb-4 dark:border-opacity-60'>
                            <div className='mb-2 mt-3 '>
                                <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                    Category:{' '}
                                    <Tag color='red' className='ml-2'>
                                        Ipad
                                    </Tag>
                                </p>
                            </div>
                            <div className='mb-2 mt-3'>
                                <span className='text-base dark:text-white dark:opacity-80'>
                                    Brand:{' '}
                                    <Tag color='gold' className='ml-2'>
                                        Apple
                                    </Tag>
                                </span>
                            </div>
                            {/* Brand */}
                            <div className=' mt-3'>
                                <div>
                                    <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                        Sku: <span className='text-cyan-300'>skujasmcdas</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* information product */}
                        <div className='information-product mt-[25px]'>
                            <ul className='list-inside list-disc text-sm leading-6 text-[#777777] dark:text-white dark:opacity-80'>
                                <li>Bass and Stereo Sound</li>
                                <li>Display with 3088 x 1440 pixels resolution.</li>
                                <li>Memory, Storage & SIM: 12GB RAM, 256GB.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;

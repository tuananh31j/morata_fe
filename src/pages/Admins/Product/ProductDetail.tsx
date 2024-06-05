import { FireFilled } from '@ant-design/icons';
import { Tag } from 'antd';
import ProgressBar from '~/components/_common/ProgressBar';
import RatingDisplay from '~/components/_common/RatingDisplay';
import ThumnailProduct from '~/pages/Clients/ProductDetails/_components/Thumbnail/ThumnailProduct';

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
                        <div className='product-title'>
                            <h1 className='text-2xl font-semibold text-white dark:opacity-80'>
                                iPad 10.2 2021 WiFi 64GB | Chính hãng Apple Việt Nam
                            </h1>
                            <div className='product-rating  flex h-[49px] gap-5 text-sm text-white '>
                                <RatingDisplay rating={4} reviews={5} />
                            </div>
                            <div className='price mt-[25px] flex items-end gap-2'>
                                <span className='text-3xl font-bold dark:text-white dark:opacity-80'>$3000</span>
                                <del className='text-base font-bold text-[#777777] dark:text-gray-300 '>$3400</del>
                            </div>
                            <>
                                <div className='mt-[15px]'>
                                    <span className='text-[14px] font-medium leading-6 dark:text-white dark:opacity-80'>
                                        Discount: {Math.floor(((3400 - 3000) / 3400) * 100)}%
                                    </span>
                                </div>
                            </>
                        </div>
                        {/* Progress  stock product*/}
                        <>
                            <div className='Progress-stock mt-[25px]'>
                                <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                    Stock: <span className='text-cyan-300'>{5}</span>
                                </p>
                                <ProgressBar stock={80} />
                            </div>
                        </>
                        {/* Progress  category product*/}
                        <>
                            <div className='Progress-stock mt-[25px]'>
                                <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                    Category:{' '}
                                    <Tag color='geekblue' className='ml-2 text-lg'>
                                        Ipad
                                    </Tag>
                                </p>
                            </div>
                        </>
                        {/* Progress  Sku product*/}
                        <>
                            <div className='Progress-stock mt-[25px]'>
                                <p className='text-base font-normal dark:text-white dark:opacity-80'>
                                    Sku: <span className='text-cyan-300'>skukodas</span>
                                </p>
                            </div>
                        </>
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

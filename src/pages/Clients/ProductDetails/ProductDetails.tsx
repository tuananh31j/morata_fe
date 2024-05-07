import {
    DockerOutlined,
    EyeOutlined,
    FileProtectOutlined,
    FireFilled,
    HeartOutlined,
    MenuOutlined,
    RedoOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';

import SmallCard from '~/components/Product/SmallCard';
import ProgressBar from '~/components/ProgressBar';
import RatingDisplay from '~/components/RatingDisplay';
import WrapperList from '~/components/WrapperList';
import DescriptionProduct from './_component/Description/DescriptionProduct';
import ThumnailProduct from './_component/Thumbnail/ThumnailProduct';
import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import useDocumentTitle from '~/hooks/useDocumentTitle';

// demo data product gallery
const items = [
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_1.jpg?v=1697644630' },
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_2.jpg?v=1697644630' },
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_3.jpg?v=1697644630' },
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_4.jpg?v=1697644630' },
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_6.jpg?v=1697644630' },
    { url: 'https://demo-morata.myshopify.com/cdn/shop/products/products_3_7.jpg?v=1697644630' },
];
const data = [1, 1, 1, 1, 1, 1, 11, 1];

const ProductDetails = () => {
    useDocumentTitle('Tên sản phẩm');

    return (
        <>
            {/* BeadCrumb */}
            <div className='mt-[41px]'>
                {/* Product Media and detail container */}
                <div className='flex flex-col gap-[10px] lg:flex-row xl:px-[30px] xl:py-[40px]'>
                    {/* Product Media */}
                    <ThumnailProduct items={items} />
                    {/* Product Detail container */}
                    <div className='product-detail w-full'>
                        {/* Title and price */}
                        <div className='product-title'>
                            <h1 className='text-2xl font-semibold text-[#0068c9]'>
                                Apple iPad Air 4 10.9-inch Wi-Fi 256GB
                            </h1>
                            <div className='product-rating  flex h-[49px] gap-5  text-sm'>
                                <RatingDisplay rating={5} reviews={100} />
                                <div className='mt-[10px] flex items-center gap-2'>
                                    <FireFilled style={{ color: 'red' }} />
                                    <span>21 sold in last 24 hours</span>
                                </div>
                            </div>
                            <div className='price mt-[25px]'>
                                <span className='text-3xl font-bold'>$49.00</span>
                            </div>
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
                        <div className='Progress-stock mt-[25px]'>
                            <p className='text-base font-normal'>
                                Hurry Up! Only <span className='text-cyan-500'>4</span> left in stock
                            </p>
                            <ProgressBar stock={4} />
                        </div>
                        {/* Produt action  */}
                        <div className='product-action  mt-[25px]'>
                            {/* Button add to cart and quantity */}
                            <div className=' items-center md:flex'>
                                <div className='mb-[15px] w-[100%] md:mb-0 lg:w-[28%]'>
                                    <Button className='h-[48px]'>-</Button>
                                    <span className='px-[5px] text-base font-semibold'>01</span>
                                    <Button className='h-[48px]'>+</Button>
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
                                    <b className='text-green-500'>In Stock</b>
                                </div>
                                <div className='flex'>
                                    <p className='w-[115px]  text-[#777777]'>SKU: </p>
                                    <span className='font-semibold text-black'>N/A-01</span>
                                </div>
                                <div className='flex'>
                                    <p className='w-[115px]  text-[#777777]'>Vendor: </p>
                                    <span className='font-semibold text-black'>Apple</span>
                                </div>
                                <div className='flex'>
                                    <p className='w-[115px]  text-[#777777]'>Categories: </p>
                                    <span className='font-semibold text-black'>BestSelling, Featured Products</span>
                                </div>
                                <div className='flex'>
                                    <p className='w-[115px]  text-[#777777]'>Tags: </p>
                                    <span className='font-semibold text-black'>
                                        host, Laptop & Ipad, Smart Phones & Tablets
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DescriptionProduct />
                <WrapperList title='Related Products'>
                    <CarouselDisplay>
                        {data.map((item, i) => (
                            <CarouselItem>
                                <SmallCard />
                            </CarouselItem>
                        ))}
                    </CarouselDisplay>
                </WrapperList>
                <WrapperList title='Recently Viewed Products'>
                    <CarouselDisplay>
                        {data.map((item, i) => (
                            <CarouselItem>
                                <SmallCard />
                            </CarouselItem>
                        ))}
                    </CarouselDisplay>
                </WrapperList>
            </div>
        </>
    );
};

export default ProductDetails;

import { Typography } from 'antd';
import Slideshow from '~/components/_common/Slideshow';
import SlideItem from '~/components/Banner/SlideItem';

const { Title, Paragraph } = Typography;
const Banner = () => {
    const banners = [
        {
            image: 'https://demo-morata.myshopify.com/cdn/shop/files/banner_1_1.png?v=1697475450&width=3840',
            title: 'Phiên bản thể thao đặc biệt',
            description: 'Kết nối không dây với TV , Máy tính, Laptop ...',
        },
        {
            image: 'https://demo-morata.myshopify.com/cdn/shop/files/banner_1_2.png?v=1697475450&width=3840',
            title: 'Phiên bản thể thao đặc biệt 1',
            description: 'Kết nối không dây với TV , Máy tính, Laptop ...',
        },
        {
            image: 'https://demo-morata.myshopify.com/cdn/shop/files/banner_1_3.png?v=1697475450&width=3840',
            title: 'Phiên bản thể thao đặc biệt 2',
            description: 'Kết nối không dây với TV , Máy tính, Laptop ...',
        },
    ];

    return (
        <div className='container m-10 mx-auto'>
            <div className='gap-3 lg:grid lg:grid-cols-2'>
                <div className='content-slide pb-4 lg:pb-0'>
                    <Slideshow banners={banners} />
                </div>

                <div className='grid gap-2 sm:grid-cols-2 sm:gap-4'>
                    <div className='grid gap-2 sm:gap-4'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                loading='lazy'
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_1.png?v=1697473091&width=1500'
                                alt=''
                            />

                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2 ' level={4}>
                                    Canyon Star Raider
                                </Title>
                                <Paragraph className='text-white'>Headphone & Audio</Paragraph>
                            </div>
                        </div>

                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                loading='lazy'
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110 '
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_2.png?v=1697474702&width=1500'
                                alt=''
                            />

                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Samsung Galaxy S
                                </Title>
                                <Paragraph className='text-white'>Smartphone & Tablets</Paragraph>
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-2 sm:gap-4'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                loading='lazy'
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_3.png?v=1697474702&width=1500'
                                alt=''
                            />

                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Galaxy Buds Plus
                                </Title>
                                <Paragraph className='text-white'>Wireless Earbuds</Paragraph>
                            </div>
                        </div>

                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
                                loading='lazy'
                                className='h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_4.png?v=1697474702&width=1780'
                                alt=''
                            />

                            <div className=' absolute inset-0 flex w-[80%] flex-col  items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Senheiser
                                </Title>
                                <Paragraph className='text-white'>Speaker & Audio</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

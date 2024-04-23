import { Button, Carousel, Typography } from 'antd';
const { Title, Paragraph } = Typography;
import { motion } from 'framer-motion';
import { useState } from 'react';
const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div className='container m-10 mx-auto'>
            <div className='mx-2 gap-3 lg:grid lg:grid-cols-2'>
                <div className='content-slide pb-2 '>
                    <Carousel
                        autoplay
                        autoplaySpeed={4000}
                        centerPadding='50'
                        beforeChange={(from, to) => setCurrentSlide(to)}
                        className=' '
                        draggable
                    >
                        <div style={{ marginRight: '10px' }} className=' relative max-w-[1500px] '>
                            <img
                                className='h-full w-full  rounded-xl object-cover lg:h-[300px] xl:h-[365px] 2xl:h-[440px]'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/banner_1_3.png?v=1697475451&width=3840'
                                alt=''
                            />
                            <motion.div
                                className='absolute inset-0 flex w-[70%] flex-col items-start justify-center p-4'
                                initial={{ y: -100, opacity: 0 }}
                                animate={currentSlide === 0 ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Title style={{ color: 'white' }} level={3} className=' pb-2'>
                                    Gaming Headset Brilliant Lighting Effect
                                </Title>
                                <Paragraph className='text-white'>
                                    Wireless Connection with TV , Computer, Laptop ...
                                </Paragraph>
                                <Button type='primary' className='rounded bg-black text-white'>
                                    DISCOVER NOW
                                </Button>
                            </motion.div>
                        </div>
                        <div style={{ marginRight: '10px' }} className=' relative '>
                            <img
                                className='h-full w-full rounded-xl object-cover lg:h-[300px] xl:h-[365px] 2xl:h-[440px]'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/banner_1_1.png?v=1697475450&width=3840'
                                alt=''
                            />
                            <motion.div
                                className='absolute inset-0 flex w-[70%] flex-col items-start justify-center p-4'
                                initial={{ x: -100, opacity: 0 }}
                                animate={currentSlide === 1 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Title style={{ color: 'white' }} level={3} className='pb-2 text-white'>
                                    Sport Edition Rest Special Edition
                                </Title>
                                <Paragraph className='text-white'>
                                    Wireless Connection with TV , Computer, Laptop ...
                                </Paragraph>
                                <Button type='primary' className='rounded bg-black text-white'>
                                    DISCOVER NOW
                                </Button>
                            </motion.div>
                        </div>
                        <div style={{ marginRight: '10px' }} className=' relative '>
                            <img
                                className='h-full w-full rounded-xl object-cover lg:h-[300px] xl:h-[365px] 2xl:h-[440px]'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/banner_1_3.png?v=1697475451&width=3840'
                                alt=''
                            />
                            <motion.div
                                className='absolute inset-0 flex w-[70%] flex-col items-start justify-center p-4'
                                initial={{ y: 100, opacity: 0 }}
                                animate={currentSlide === 2 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Title style={{ color: 'white' }} level={3} className='pb-2 text-white'>
                                    Sport Edition Best Choice Of Your
                                </Title>
                                <Paragraph className='text-white'>
                                    Wireless Connection with TV , Computer, Laptop ...
                                </Paragraph>
                                <Button type='primary' className='rounded bg-black text-white'>
                                    DISCOVER NOW
                                </Button>
                            </motion.div>
                        </div>
                    </Carousel>
                </div>
                <div className='grid grid-cols-2 gap-4 '>
                    <div className='grid gap-2'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
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
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110 '
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_2.png?v=1697474702&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Phone Galaxy S20
                                </Title>
                                <Paragraph className='text-white'>Cellphone & Tablets</Paragraph>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2'>
                        <div className='group relative overflow-hidden rounded-3xl'>
                            <img
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
                                className=' h-full w-full transform transition-transform duration-500 group-hover:scale-110'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/1_4.png?v=1697474702&width=1500'
                                alt=''
                            />
                            <div className=' absolute inset-0 flex w-[80%] flex-col  items-start justify-center p-4 md:w-[70%]'>
                                <Title style={{ color: 'white' }} className='pb-2' level={4}>
                                    Chair Swoon Lounge,
                                </Title>
                                <Paragraph className='text-white'>Decor & Furniture</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

import { Button, Carousel, Typography } from 'antd';
const { Title, Paragraph } = Typography;
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import SliderControls from '../SliderControls';
import { CarouselRef } from 'antd/es/carousel';

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<CarouselRef>(null);
    const handlePrev = () => {
        if (ref.current) {
            ref.current.prev();
        }
    };
    const handleNext = () => {
        if (ref.current) {
            ref.current.next();
        }
    };
    return (
        <>
            <div className='relative'>
                <div className='group'>
                    <Carousel
                        ref={ref}
                        autoplay
                        autoplaySpeed={4000}
                        centerPadding='50'
                        beforeChange={(from, to) => setCurrentSlide(to)}
                        className=''
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
                    <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
                </div>
            </div>
        </>
    );
};

export default Slideshow;

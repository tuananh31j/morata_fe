import { Image } from 'antd';
import Carousel, { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import SliderControls from '~/components/_common/SliderControls';
// Set demo type as any
const ThumnailProduct = ({ items, thumbnail }: { items: string[]; thumbnail: string }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<CarouselRef>(null);
    const onclickImage = (e: number) => {
        ref.current?.goTo(e, false);
        setCurrentSlide(e);
    };
    const onChange = (slide: number) => {
        setCurrentSlide(slide);
    };
    const handlePrev = () => {
        ref.current?.prev();
    };
    const handleNext = () => {
        ref.current?.next();
    };
    const images = [thumbnail, ...items];

    return (
        <div className='product-thumbnail w-full flex-col gap-4'>
            {items.length > 0 && (
                <div className='product-thumbnail-main w-[100%] lg:w-[475px] 2xl:w-[725px]'>
                    <div className='group relative'>
                        <Carousel
                            dots={false}
                            ref={ref}
                            draggable
                            className=' flex justify-center overflow-hidden rounded-[15px]'
                            beforeChange={onChange}
                            afterChange={onChange}
                            infinite
                        >
                            {images?.map((item, index: number) => (
                                <Image
                                    className='object-contain duration-75 lg:h-[475px] lg:w-[475px] 2xl:h-[625px] 2xl:w-[725px]'
                                    key={index}
                                    preview={true}
                                    src={item}
                                />
                            ))}
                        </Carousel>
                        <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
                    </div>
                </div>
            )}
            {images.length > 0 && (
                <div className='product-thumbnail-gallery mt-6 hidden gap-2 lg:flex '>
                    {images?.map((item, index: number) => (
                        <div
                            key={index}
                            onClick={() => onclickImage(index)}
                            className={`flex cursor-pointer items-center overflow-hidden rounded-[5px]  ${currentSlide === index ? 'border-[1px] border-black' : 'border-[1px] border-[#7777]'} duration-75`}
                        >
                            <img loading='lazy' className='w-[68px]' src={item} alt='' />
                        </div>
                    ))}
                </div>
            )}
            {/* {items.length < 1 && (
                <div className='product-thumbnail-main w-[100%] lg:w-[375px] 2xl:w-[625px]'>
                    <div className='overflow-hidden rounded-[15px]'>
                        <Image preview={true} className='h-[625px] w-[625px]' src={thumbnail} />
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default ThumnailProduct;

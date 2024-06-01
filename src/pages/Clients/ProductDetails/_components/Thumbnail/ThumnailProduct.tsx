import { Image } from 'antd';
import Carousel, { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
// Set demo type as any
const ThumnailProduct = ({ items, thumbnail }: { items: string[]; thumbnail: string }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<CarouselRef>(null);
    const onclickImage = (e: number) => {
        setCurrentSlide(e);
        ref.current?.goTo(e, false);
    };
    const onChange = (slide: number) => {
        setCurrentSlide(slide);
    };
    return (
        <div className='product-thumbnail flex w-full gap-[16px]'>
            {items.length > 1 && (
                <div className='product-thumbnail-gallery hidden flex-col gap-2 lg:flex '>
                    {items?.map((item, index: number) => (
                        <div
                            key={index}
                            onClick={() => onclickImage(index)}
                            className={`cursor-pointer overflow-hidden rounded-[5px] border-[1px] ${currentSlide === index ? 'border-[#777777]' : ''} duration-75`}
                        >
                            <img loading='lazy' className='w-[68px]' src={item} alt='' />
                        </div>
                    ))}
                </div>
            )}

            {items.length > 1 && (
                <div className='product-thumbnail-main w-[100%] lg:w-[375px] 2xl:w-[625px]'>
                    <Carousel
                        dots={false}
                        ref={ref}
                        draggable
                        className='overflow-hidden rounded-[15px]'
                        beforeChange={onChange}
                        afterChange={onChange}
                        infinite
                    >
                        {items?.map((item, index: number) => <Image key={index} preview={true} src={item} />)}
                    </Carousel>
                </div>
            )}
            {items.length < 1 && (
                <div className='product-thumbnail-main w-[100%]  lg:w-[375px] 2xl:w-[625px]'>
                    <div className='overflow-hidden rounded-[15px]'>
                        <Image preview={true} src={thumbnail} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThumnailProduct;

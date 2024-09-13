import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import { IProductItemNew } from '~/types/Product';
import SliderControls from '../SliderControls';
import SlideItem from '~/components/Banner/SlideItem';

interface ISlideshowProps {
    ItemCard?: React.ElementType;
    banners?: {
        image: string;
        title: string;
        description: string;
    }[];
    Products?: IProductItemNew[];
}

const Slideshow: React.FC<ISlideshowProps> = ({ ItemCard, banners, Products }) => {
    const [_, setCurrentSlide] = useState(0);
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

    // const data = [1, 1, 1];

    return (
        <>
            <div className='relative'>
                <div className='group'>
                    <Carousel
                        ref={ref}
                        centerPadding='50'
                        beforeChange={(from, to) => setCurrentSlide(to)}
                        draggable
                        infinite
                        speed={300}
                    >
                        {banners &&
                            banners?.map((banner, i) => {
                                return <SlideItem key={i} product={banner} />;
                            })}

                        {Products &&
                            ItemCard &&
                            Products?.map((item, i) => {
                                return <ItemCard key={i} product={item} />;
                            })}

                        {/* {!Products && data?.map((item, i) => <SlideItem key={i} status={currentSlide === i} />)} */}
                    </Carousel>

                    <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
                </div>
            </div>
        </>
    );
};

export default Slideshow;

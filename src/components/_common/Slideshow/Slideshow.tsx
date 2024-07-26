import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import { IProductItemNew } from '~/types/Product';
import SliderControls from '../SliderControls';

// interface ICardItemProps {
//     [key: string]: any; // có api thì sẽ định nghĩa lại
// }

interface ISlideshowProps {
    ItemCard: React.ElementType;
    Products?: IProductItemNew[];
}

const Slideshow: React.FC<ISlideshowProps> = ({ ItemCard, Products }) => {
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
    const data = [1, 1, 1, 1];
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
                        {Products?.map((item, i) => {
                            return <ItemCard key={i} product={item} />;
                        })}
                        {!Products && data?.map((item, i) => <ItemCard key={i} status={currentSlide === i} />)}
                    </Carousel>
                    <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext} />
                </div>
            </div>
        </>
    );
};

export default Slideshow;

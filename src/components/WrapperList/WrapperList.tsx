import { useRef } from 'react';
import { Carousel } from 'antd';
import useWindowSize from '~/hooks/useWindowSize';
import { getMaxSlidesToShow } from '~/utils';
import { CarouselRef } from 'antd/es/carousel';
import TitleDisplay from '../TitleDisplay';
import SliderControls from '../SliderControls';
import Slideshow from '../Slideshow';
import FeatureCard from '../Product/FeatureCard';
import MediumCard from '../Product/MediumCard';

interface IWrapperListProps {
    data: number[];
    CardItem: () => JSX.Element;
    title: string;
    flex?: boolean;
    seeMore?: { path: string; name: string };
    propsCard?: { flex?: boolean };
}
const WrapperList: React.FC<IWrapperListProps> = ({ data, CardItem, title, flex, seeMore }) => {
    const windowSize = useWindowSize();
    const maxSlidesToShow = getMaxSlidesToShow(windowSize.windowWidth);
    const slidesToShow = maxSlidesToShow <= data.length ? maxSlidesToShow : data.length;
    const isButtonHandle = slidesToShow >= data.length;
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
        <div className=' transition-all duration-300 ease-in'>
            <TitleDisplay title={title} seeMore={seeMore} />
            {!flex && (
                <div className='group relative'>
                    <Carousel className='' ref={ref} slidesToShow={slidesToShow} draggable dots={false}>
                        {data.map((item, i) => (
                            <div className='' key={i}>
                                <div
                                    className='2
                        mx-[10px] bg-transparent'
                                >
                                    {/* @CardItem */}
                                    <CardItem />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                    <SliderControls isButtonHandle={isButtonHandle} handleNext={handleNext} handlePrev={handlePrev} />
                </div>
            )}
            {flex && (
                <>
                    <div className='mx-2 items-center gap-3 lg:flex'>
                        <div className='lg:w-[40%]'>
                            <Slideshow ItemCard={MediumCard} />
                        </div>
                        <div className='grid h-full flex-1 grid-cols-3 gap-4'>
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                            <FeatureCard />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WrapperList;

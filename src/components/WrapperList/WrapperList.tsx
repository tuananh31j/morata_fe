import { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import useWindowSize from '~/hooks/useWindowSize';
import { getMaxSlidesToShow } from '~/utils';
import { CarouselRef } from 'antd/es/carousel';
import clsx from 'clsx';
import Title from '../Title';

interface IWrapperListProps {
    data: number[];
    CardItem: () => JSX.Element;
    title: string;
    seeMore?: { path: string; name: string };
}
const WrapperList: React.FC<IWrapperListProps> = ({ data, CardItem, title, seeMore }) => {
    const windowSize = useWindowSize();
    const ref = useRef<CarouselRef>(null);
    const maxSlidesToShow = getMaxSlidesToShow(windowSize.windowWidth);
    const slidesToShow = maxSlidesToShow <= data.length ? maxSlidesToShow : data.length;
    const isButtonHandle = slidesToShow >= data.length;

    return (
        <div className='group transition-all duration-300 ease-in'>
            <Title title={title} seeMore={seeMore} />
            <div className='relative'>
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
                <div
                    className={clsx({
                        ['hidden']: isButtonHandle,
                    })}
                >
                    <LeftOutlined
                        onClick={() => !!ref.current && ref.current.prev()}
                        className='absolute left-1 top-[50%] translate-y-[-50%] rounded-full border-transparent bg-[#222222]  p-3 text-[10px] font-extrabold text-white opacity-0 transition-all duration-700 ease-in-out hover:bg-[#16bcdc] group-hover:block group-hover:opacity-100'
                    />
                    <RightOutlined
                        onClick={() => !!ref.current && ref.current.next()}
                        className='absolute right-1 top-[50%] translate-y-[-50%] rounded-full border-transparent  bg-[#222222] p-3 text-[10px] font-extrabold text-white opacity-0 transition-all duration-700 ease-in-out hover:bg-[#16bcdc] group-hover:block group-hover:opacity-100'
                    />
                </div>
            </div>
        </div>
    );
};

export default WrapperList;

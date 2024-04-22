import { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import useWindowSize from '~/hooks/useWindowSize';
import { getMaxSlidesToShow } from '~/utils';
import { CarouselRef } from 'antd/es/carousel';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
            <div className='my-5 flex items-center justify-between border-b-[1.5px]'>
                <div className='inline-block border-b-[1.5px] border-[#16bcdc] py-[4px]  text-start md:border-b-[2.3px]'>
                    <h1 className='text-start font-[400] capitalize'>{title}</h1>
                </div>
                <div>
                    {!!seeMore && (
                        <Link to={seeMore.path} className='text-[10px] font-[400] capitalize'>
                            {seeMore.name} <RightOutlined className='text-[7px]' />
                        </Link>
                    )}
                </div>
            </div>
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

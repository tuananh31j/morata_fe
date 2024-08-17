import {
    DollarCircleOutlined,
    LeftOutlined,
    RightOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useTotalStats } from '~/hooks/stats/useTotal';
import CardDataStats from '~/pages/Admins/_dashboard_/_components/Card/CardDataStats';
import DatePickerCard from '~/pages/Admins/_dashboard_/_components/DatePickerCard/DatePickerCard';
import { Currency } from '~/utils';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const StatisticsCards: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({ type: 'single', date: moment().format('YYYY-MM-DD') });
    const { data, isLoading, error } = useTotalStats(dateInput);
    const carouselRef = useRef<CarouselRef>(null);

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };

    if (isLoading) return <div className='flex h-screen items-center justify-center'>Loading...</div>;
    if (error)
        return <div className='text-red-500 flex h-screen items-center justify-center'>Error: {error.message}</div>;
    const statsData = data?.data?.data || {};
    const cardData = [
        {
            title: 'Total Orders',
            total: statsData.totalOrders || 0,
            rate: `${(statsData.orderSuccessRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderSuccessRate || 0) > 50,
            levelDown: (statsData.orderSuccessRate || 0) <= 50,
            subtitle: `Successful: ${statsData.successfulOrders || 0} | Cancelled: ${statsData.cancelledOrders || 0}`,
            icon: <ShoppingCartOutlined />,
            tooltip: 'Total number of orders placed in the selected period.',
            tooltipRate: 'Percentage of successful orders out of total orders.',
        },
        {
            title: 'Total Revenue',
            total: Currency.format(statsData.totalRevenue || 0),
            rate: Currency.format(statsData.averageDailyRevenue || 0),
            subtitle: 'Average Daily Revenue',
            icon: <DollarCircleOutlined />,
            tooltip: 'Total revenue generated in the selected period. The rate shows average daily revenue.',
            tooltipRate: 'Average daily revenue for the selected period.',
        },
        {
            title: 'New Users',
            total: statsData.newUsers || 0,
            rate: `${(statsData.orderCancelRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderCancelRate || 0) < 30,
            levelDown: (statsData.orderCancelRate || 0) >= 30,
            subtitle: 'Order Cancel Rate',
            icon: <UserOutlined />,
            tooltip:
                'Number of new users registered in the selected period. The rate shows the order cancellation rate.',
            tooltipRate: 'Percentage of orders that were cancelled.',
        },
        {
            title: 'New Products',
            total: statsData.newProducts || 0,
            icon: <ShoppingOutlined />,
            tooltip: 'Number of new products added to the catalog in the selected period.',
        },
    ];
    const carouselSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const SliderButton = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
        <button
            onClick={onClick}
            className={`absolute top-1/2 ${direction === 'left' ? 'left-0' : 'right-0'} z-10 -translate-y-1/2 transform
                 rounded-full bg-white bg-opacity-50 p-2 shadow-md transition-all duration-300 hover:bg-opacity-75
                 focus:outline-none focus:ring-2 focus:ring-blue-300`}
            aria-label={`Slide ${direction}`}
        >
            {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
        </button>
    );

    return (
        <>
            <div className='mb-3 ml-3'>
                <DatePickerCard onDateChange={handleDateChange} initialDate={dateInput} />
            </div>

            <div className='relative mb-8'>
                <Carousel {...carouselSettings} ref={carouselRef}>
                    {cardData.map((cardProps, index) => (
                        <div key={index} className='h-full px-2'>
                            <CardDataStats {...cardProps} />
                        </div>
                    ))}
                </Carousel>
                <SliderButton direction='left' onClick={() => carouselRef.current?.prev()} />
                <SliderButton direction='right' onClick={() => carouselRef.current?.next()} />
            </div>
        </>
    );
};

export default StatisticsCards;

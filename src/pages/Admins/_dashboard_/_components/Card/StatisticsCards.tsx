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
            title: 'Tổng đơn hàng',
            total: statsData.totalOrders || 0,
            rate: `${(statsData.orderSuccessRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderSuccessRate || 0) > 50,
            levelDown: (statsData.orderSuccessRate || 0) <= 50,
            subtitle: `Thành công: ${statsData.successfulOrders || 0} | Đã hủy: ${statsData.cancelledOrders || 0}`,
            icon: <ShoppingCartOutlined />,
            tooltip: 'Tổng số lượng đơn hàng được đặt theo khoảng thời gian đã chọn',
            rateTooltip: 'Tỉ lệ đơn hàng thành công theo khoảng thời gian đã chọn',
        },
        {
            title: 'Tổng doanh thu',
            total: Currency.format(statsData.totalRevenue || 0),
            rate: Currency.format(statsData.averageDailyRevenue || 0),
            subtitle: 'Doanh thu trung bình',
            icon: <DollarCircleOutlined />,
            tooltip: 'Tổng doanh thu theo khoảng thời gian đã chọn',
            rateTooltip: 'Doanh thu trung bình theo khoảng thời gian đã chọn',
        },
        {
            title: 'Người dung mới',
            total: statsData.newUsers || 0,
            rate: `${(statsData.orderCancelRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderCancelRate || 0) < 30,
            levelDown: (statsData.orderCancelRate || 0) >= 30,
            subtitle: 'Tỉ lệ hủy đơn hàng',
            icon: <UserOutlined />,
            tooltip: 'Số lượng người dùng mới đăng ký tài khoản trong khoảng thời gian đã chọn',
            rateTooltip: 'Tỉ lệ hủy đơn hàng theo khoảng thời gian đã chọn',
        },
        {
            title: 'Sản phẩm mới',
            total: statsData.newProducts || 0,
            icon: <ShoppingOutlined />,
            tooltip: 'Số lượng sản phẩm mới được thêm vào cửa hàng trong khoảng thời gian đã chọn',
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

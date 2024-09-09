/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import { UseRangePicker } from '~/hooks/stats/useRangePicker';
import DateRangePickerComponent from '~/pages/Admins/_dashboard_/_components/Charts/RangePicker/DateRangePickerComponent';
import { optionsBarChart } from './_option';

const BarChartRangePicker: React.FC = () => {
    const today = dayjs();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today, today]);
    const { data: dailyStats } = UseRangePicker(dateRange[0], dateRange[1]);

    const revenue = Array.isArray(dailyStats?.data) ? dailyStats?.data.map((item: any) => item.totalRevenue) || [] : [];
    const orders = Array.isArray(dailyStats?.data) ? dailyStats?.data.map((item: any) => item.totalOrders) || [] : [];
    const time = Array.isArray(dailyStats?.data) ? dailyStats?.data.map((item: any) => item.date) || [] : [];

    const series = [
        {
            name: 'Đơn hàng',
            data: orders || [0],
        },
        {
            name: 'Doanh thu',
            data: revenue || [0],
        },
    ];
    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };
    useEffect(() => {
        // Khi component mount, đảm bảo rằng dateRange có giá trị
        if (!dateRange[0] || !dateRange[1]) {
            setDateRange([today, today]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <WrapperList
            title='Đơn hàng và doanh thu'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
        >
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart(time)}
                        series={series}
                        type='bar'
                        height={350}
                        width={'100%'}
                    />
                </div>
            </div>
        </WrapperList>
    );
};

export default BarChartRangePicker;

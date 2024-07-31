import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import { DatePicker, DatePickerProps } from 'antd';
import { useDailyStats } from '~/hooks/stats/useDailyStats';
import { optionsBarChart } from './_option';
import DateRangePickerComponent from '~/pages/Admins/_dashboard_/_components/Charts/RangePicker/DateRangePickerComponent';
import { Dayjs } from 'dayjs';
import { UseRangePicker } from '~/hooks/stats/useRangePicker';

const BarChartRangePicker: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const { data: dailyStats } = UseRangePicker(...dateRange);

    const revenue = dailyStats?.data?.map((item: any) => item.totalRevenue) || [];
    const orders = dailyStats?.data?.map((item: any) => item.totalOrders) || [];
    const time = dailyStats?.data?.map((item: any) => item.date) || [];

    const series = [
        {
            name: 'Orders',
            data: orders || [0],
        },
        {
            name: 'Revenue',
            data: revenue || [0],
        },
    ];
    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates) {
            setDateRange(dates);
        } else {
            setDateRange([null, null]);
        }
    };

    return (
        <WrapperList
            title='RangePicker Statistics'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} />}
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

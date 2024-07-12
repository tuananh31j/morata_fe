import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import { useYearlyStats } from '~/hooks/stats/useYearly';
import { optionsBarChart } from './_option';

const YearlyStats: React.FC = () => {
    const { data: yearlyStats } = useYearlyStats();

    const years = yearlyStats?.data.map((item: any) => item.year);
    const revenue = yearlyStats?.data.map((item: any) => item.totalRevenue);
    const orders = yearlyStats?.data.map((item: any) => item.totalOrders);

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
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <WrapperList title='Yearly Statistics' option={<DatePicker onChange={onChange} picker='year' />} lineButtonBox>
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart(years)}
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

export default YearlyStats;

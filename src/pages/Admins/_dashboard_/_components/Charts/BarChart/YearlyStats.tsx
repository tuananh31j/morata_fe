import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import { useYearlyStats } from '~/hooks/stats/useYearly';
import { optionsBarChart } from './_option';

const YearlyStats: React.FC = () => {
    const { data: yearlyStats } = useYearlyStats();

    const years = yearlyStats?.data.map((item: any) => item.year) || [];
    const revenue = yearlyStats?.data.map((item: any) => item.totalRevenue) || [];
    const orders = yearlyStats?.data.map((item: any) => item.totalOrders) || [];

    const series = [
        {
            name: 'Orders',
            data: orders.length > 0 ? orders : [0],
        },
        {
            name: 'Revenue',
            data: revenue.length > 0 ? revenue : [0],
        },
    ];

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <>
            {orders && revenue && (
                <WrapperList
                    title='Yearly Statistics'
                    option={<DatePicker onChange={onChange} picker='year' />}
                    lineButtonBox
                >
                    <div>
                        <div id='barChart'>
                            {years.length > 0 ? (
                                <ReactApexChart
                                    options={optionsBarChart(years)}
                                    series={series}
                                    type='bar'
                                    height={350}
                                    width={'100%'}
                                />
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    </div>
                </WrapperList>
            )}
        </>
    );
};

export default YearlyStats;

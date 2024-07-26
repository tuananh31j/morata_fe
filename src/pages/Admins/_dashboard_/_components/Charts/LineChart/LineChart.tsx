import React from 'react';
import ReactApexChart from 'react-apexcharts';

import { DatePicker, DatePickerProps } from 'antd';
import WrapperList from '~/components/_common/WrapperList';
import { optionsLineChart } from './_options';
import { useMonthlyStats } from '~/hooks/stats/useMonthlyStats';

const LineChart = () => {
    const { data: result } = useMonthlyStats();

    const revenue = result?.data.map((item: any) => item.totalRevenue);
    const months = result?.data.map((item: any) => item.month);

    const series = [
        {
            name: 'Revenue',
            data: revenue || [0],
        },
    ];

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <WrapperList
            title='Statistics Monthly'
            className='xl:col-span-12'
            option={<DatePicker onChange={onChange} picker='year' />}
            lineButtonBox
        >
            <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                        <ReactApexChart
                            options={optionsLineChart(months)}
                            series={series}
                            type='area'
                            height={350}
                            width={'100%'}
                        />
                    </div>
                </div>
            </div>
        </WrapperList>
    );
};

export default LineChart;

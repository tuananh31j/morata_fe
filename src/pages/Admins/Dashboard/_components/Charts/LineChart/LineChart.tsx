import React from 'react';
import ReactApexChart from 'react-apexcharts';
import optionsLineChart from './_options';
import { DatePicker, DatePickerProps } from 'antd';
import WrapperList from '~/components/_common/WrapperList';
import { useOrderMonthly } from '~/hooks/stats/useOrderMonthly';

type ILineChartProps = { name: string; data: number[] };

const LineChart: React.FC<ILineChartProps> = ({ name }) => {
    const { data } = useOrderMonthly();
    const orderMonthly = data?.data.map((item: any) => item.totalRevenue);
    console.log(orderMonthly);

    const series = [
        {
            name,
            orderMonthly,
        },
    ];

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <WrapperList
            title='Revenue order'
            className='xl:col-span-12'
            option={<DatePicker onChange={onChange} picker='year' />}
            lineButtonBox
        >
            <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                        <ReactApexChart
                            options={optionsLineChart}
                            series={series.map((s) => ({ name: s.name, data: s.orderMonthly }))}
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

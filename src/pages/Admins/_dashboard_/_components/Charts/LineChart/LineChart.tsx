import React from 'react';
import ReactApexChart from 'react-apexcharts';
import optionsLineChart from './_options';
import { DatePicker, DatePickerProps } from 'antd';
import WrapperList from '~/components/_common/WrapperList';

type ILineChartProps = { name: string; data: number[] };

const LineChart: React.FC<ILineChartProps> = ({ name, data }) => {
    const series = [
        {
            name,
            data,
        },
        {
            name: 'ok',
            data: [23, 11, 22, 27, 33, 22, 11, 21, 44, 22, 22, 45],
        },
    ];

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <WrapperList title={name} className='xl:col-span-12' lineButtonBox>
            <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                        <ReactApexChart
                            options={optionsLineChart}
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

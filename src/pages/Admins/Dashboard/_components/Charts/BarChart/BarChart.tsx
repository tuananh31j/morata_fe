import React from 'react';
import ReactApexChart from 'react-apexcharts';
import optionsBarChart from './_option';
import WrapperList from '~/components/_common/WrapperList';
import { DatePicker, DatePickerProps } from 'antd';

const BarChart: React.FC = () => {
    const series = [
        {
            name: 'Sales',
            data: [44, 55, 41, 67, 22, 43, 65],
        },
        {
            name: 'Revenue',
            data: [13, 23, 20, 8, 13, 27, 15],
        },
    ];
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <WrapperList
            title='Revenue order'
            className='col-span-12 xl:col-span-6'
            option={<DatePicker onChange={onChange} picker='year' />}
            lineButtonBox
        >
            <div>
                <div id='barChart' className='-ml-5'>
                    <ReactApexChart options={optionsBarChart} series={series} type='bar' height={350} width={'100%'} />
                </div>
            </div>
        </WrapperList>
    );
};

export default BarChart;

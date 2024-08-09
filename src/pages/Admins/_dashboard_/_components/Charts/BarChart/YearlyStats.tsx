import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import { useYearlyStats } from '~/hooks/stats/useYearly';
import { optionsBarChart } from './_option';

const YearlyStats: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
    const { data: yearlyStats, refetch } = useYearlyStats(selectedYear);

    useEffect(() => {
        refetch();
    }, [selectedYear, refetch]);

    const yearData = yearlyStats?.data || { year: selectedYear, totalOrders: 0, totalRevenue: 0 };
    const { year, totalOrders, totalRevenue } = yearData;

    const series = [
        {
            name: 'Orders',
            data: [totalOrders],
        },
        {
            name: 'Revenue',
            data: [totalRevenue],
        },
    ];

    const onYearChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        if (date) {
            const newYear = date.year();
            if (newYear <= dayjs().year()) {
                setSelectedYear(newYear);
            }
        }
    };

    const disabledDate = (current: Dayjs) => {
        return current.year() > dayjs().year();
    };

    return (
        <WrapperList
            title='Yearly Statistics'
            option={
                <DatePicker
                    onChange={onYearChange}
                    picker='year'
                    defaultValue={dayjs().year(selectedYear)}
                    disabledDate={disabledDate}
                />
            }
            lineButtonBox
        >
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart([String(year)])}
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

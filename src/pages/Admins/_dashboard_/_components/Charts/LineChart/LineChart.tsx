import { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import dayjs, { Dayjs } from 'dayjs';
import WrapperList from '~/components/_common/WrapperList';
import { useMonthlyStats } from '~/hooks/stats/useMonthlyStats';
import DateRangePickerComponent from '~/pages/Admins/_dashboard_/_components/Charts/RangePicker/DateRangePickerComponent';
import { optionsLineChart } from './_options';

const LineChart = () => {
    const today = dayjs();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today.subtract(1, 'year'), today]);
    const { data: result, isLoading } = useMonthlyStats();

    const totalRevenue = result?.data?.map((item: any) => item.totalRevenue) || [];
    const totalOrder = result?.data?.map((item: any) => item.totalOrders) || [];
    const months = result?.data?.map((item: any) => item.month) || [];

    const showRevenue = totalRevenue.some((value: any) => value !== undefined && value !== null);
    const showOrders = totalOrder.some((value: any) => value !== undefined && value !== null);

    const series = useMemo(
        () => [
            ...(showRevenue ? [{ name: 'Revenue', data: totalRevenue }] : []),
            ...(showOrders ? [{ name: 'Orders', data: totalOrder }] : []),
        ],
        [totalRevenue, totalOrder, showRevenue, showOrders]
    );
    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <WrapperList
            title='Monthly Stats'
            className='xl:col-span-12'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
        >
            <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                        {series.length > 0 && (
                            <ReactApexChart
                                options={optionsLineChart(months, showRevenue, showOrders)}
                                series={series}
                                type='line'
                                height={350}
                                width={'100%'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </WrapperList>
    );
};

export default LineChart;

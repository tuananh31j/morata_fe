import React from 'react';
import BarChartRangePicker from '~/pages/Admins/_dashboard_/_components/Charts/BarChart/RangePicker';
import { TopProducts } from '~/pages/Admins/_dashboard_/_components/TopProducts/TopProducts';
import YearlyStats from './_components/Charts/BarChart/YearlyStats';
import LineChart from './_components/Charts/LineChart/LineChart';
import TopUsers from '~/pages/Admins/_dashboard_/_components/TopUsers/_component/TopUsers';
import StatisticsCards from '~/pages/Admins/_dashboard_/_components/Card/StatisticsCards';

const DashboardNew: React.FC = () => {
    return (
        <>
            <div className='mb-3 ml-3'>
                <StatisticsCards />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='rounded-lg bg-white p-4 shadow'>
                    <BarChartRangePicker />
                </div>
                <div className='rounded-lg bg-white p-4 shadow'>
                    <YearlyStats />
                </div>
            </div>

            <div className='item-center mt-[5rem] grid grid-cols-1'>
                <LineChart />
            </div>

            <div>
                <TopProducts />
            </div>
            <div>
                <TopUsers />
            </div>
        </>
    );
};

export default DashboardNew;

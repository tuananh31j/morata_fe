import CartIcon from '~/components/_common/Icons/CartIcon';
import ProductIcon from '~/components/_common/Icons/ProductIcon';
import UsersIcon from '~/components/_common/Icons/UsersIcon';
import CardDataStats from './_components/CardDataStats';
import { useTotalStats } from '~/hooks/stats/useTotal';
import LineChart from './_components/Charts/LineChart/LineChart';
import DailyStats from './_components/Charts/BarChart/DailyStats';
import YearlyStats from './_components/Charts/BarChart/YearlyStats';
import DateRangePickerComponent from '~/pages/Admins/_dashboard_/_components/Charts/RangePicker/DateRangePickerComponent';
import { Dayjs } from 'dayjs';
import BarChartRangePicker from '~/pages/Admins/_dashboard_/_components/Charts/BarChart/RangePicker';

const DashboardNew: React.FC = () => {
    const { data: totalStats } = useTotalStats();

    const totalOrders = totalStats?.data.totalOrders;
    const totalProducts = totalStats?.data.totalProducts;
    const totalUsers = totalStats?.data.totalUsers;
    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates) {
            const [startDate, endDate] = dates;
            console.log('Start Date:', startDate.format('DD-MM-YYYY'));
            console.log('End Date:', endDate.format('DD-MM-YYYY'));
            // Gửi dữ liệu lên server hoặc xử lý tiếp tại đây
        }
    };

    return (
        <>
            <BarChartRangePicker />

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
                <CardDataStats title='Total Orders' total={totalOrders} rate='4.35%' levelUp>
                    <CartIcon />
                </CardDataStats>
                <CardDataStats title='Total Products' total={totalProducts} rate='2.59%' levelUp>
                    <ProductIcon />
                </CardDataStats>
                <CardDataStats title='Total Users' total={totalUsers} rate='0.95%' levelDown>
                    <UsersIcon />
                </CardDataStats>
            </div>

            <div className='item-center mt-[5rem] grid grid-cols-1'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    <div>
                        <DailyStats />
                    </div>
                    <div>
                        <YearlyStats />
                    </div>
                </div>
                <div>
                    <LineChart />
                </div>
            </div>

            <div className='col-span-12 xl:col-span-6'>{/* <TopUsers title='Top users' /> */}</div>
            <h1>Chọn khoảng thời gian</h1>
            <DateRangePickerComponent onDateRangeChange={handleDateRangeChange} />
        </>
    );
};

export default DashboardNew;

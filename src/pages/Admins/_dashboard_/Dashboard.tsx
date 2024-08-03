import CartIcon from '~/components/_common/Icons/CartIcon';
import ProductIcon from '~/components/_common/Icons/ProductIcon';
import UsersIcon from '~/components/_common/Icons/UsersIcon';
import { useTotalStats } from '~/hooks/stats/useTotal';
import BarChartRangePicker from '~/pages/Admins/_dashboard_/_components/Charts/BarChart/RangePicker';
import { TopProducts } from '~/pages/Admins/_dashboard_/_components/TopProducts/TopProducts';
import CardDataStats from './_components/CardDataStats';
import YearlyStats from './_components/Charts/BarChart/YearlyStats';
import LineChart from './_components/Charts/LineChart/LineChart';

const DashboardNew: React.FC = () => {
    const { data: totalStats } = useTotalStats();

    const totalOrders = totalStats?.data.totalOrders;
    const totalProducts = totalStats?.data.totalProducts;
    const totalUsers = totalStats?.data.totalUsers;
    return (
        <>
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
                        <BarChartRangePicker />
                    </div>
                    <div>
                        <YearlyStats />
                    </div>
                </div>
                <div>
                    <LineChart />
                </div>
            </div>

            {/* <div className='col-span-12 xl:col-span-6'><TopUsers title='Top users' /></div> */}

            {/* TOP PRODUCTS STATS */}
            <div>
                <TopProducts />
            </div>
        </>
    );
};

export default DashboardNew;

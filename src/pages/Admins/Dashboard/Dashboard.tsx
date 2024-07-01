import CartIcon from '~/components/_common/Icons/CartIcon';
import ProductIcon from '~/components/_common/Icons/ProductIcon';
import UsersIcon from '~/components/_common/Icons/UsersIcon';
import CardDataStats from './_components/CardDataStats';
import EyeIcon from '~/components/_common/Icons/EyeIcon';
import LineChart from './_components/Charts/LineChart';
import PieChart from './_components/Charts/PieChart';
import TopBrand from './_components/Top5Table/TopBrands/TopBrand';
import ResentActiviti from './_components/ResentActiviti';
import OrderStatusStatistics from './_components/OrderStatusStatistics';
import InCome from './_components/InCome';
import BarChart from './_components/Charts/BarChart';
import TopUser from './_components/Top5Table/TopUsers/TopUser';

const DashboardNew: React.FC = () => {
    return (
        <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
                <CardDataStats title='Total views' total='$3.456K' rate='0.43%' levelUp>
                    <EyeIcon />
                </CardDataStats>
                <CardDataStats title='Total Profit' total='$45,2K' rate='4.35%' levelUp>
                    <CartIcon />
                </CardDataStats>
                <CardDataStats title='Total Product' total='2.450' rate='2.59%' levelUp>
                    <ProductIcon />
                </CardDataStats>
                <CardDataStats title='Total Users' total='3.456' rate='0.95%' levelDown>
                    <UsersIcon />
                </CardDataStats>
            </div>

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <LineChart />
                <BarChart />
                <PieChart />
                <div className='col-span-12 xl:col-span-7'>
                    <OrderStatusStatistics />
                </div>
                <div className='col-span-12 xl:col-span-6'>
                    <TopBrand title='Top Brands' />
                </div>
                <div className='col-span-12 xl:col-span-6'>
                    <TopBrand title='Top Categories' />
                </div>
                <ResentActiviti />
                <InCome />

                <div className='col-span-12 xl:col-span-6'>
                    <TopUser title='Top users' />
                </div>
            </div>
        </>
    );
};

export default DashboardNew;

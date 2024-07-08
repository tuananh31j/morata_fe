import CartIcon from '~/components/_common/Icons/CartIcon';
import ProductIcon from '~/components/_common/Icons/ProductIcon';
import UsersIcon from '~/components/_common/Icons/UsersIcon';
import CardDataStats from './_components/CardDataStats';
import LineChart from './_components/Charts/LineChart';
import BarChart from './_components/Charts/BarChart/BarChart';
import TopUsers from './_components/TopUsers/TopUsers';

const DashboardNew: React.FC = () => {
    return (
        <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
                <CardDataStats title='Total Orders' total='$45,2K' rate='4.35%' levelUp>
                    <CartIcon />
                </CardDataStats>
                <CardDataStats title='Total Products' total='2.450' rate='2.59%' levelUp>
                    <ProductIcon />
                </CardDataStats>
                <CardDataStats title='Total Users' total='3.456' rate='0.95%' levelDown>
                    <UsersIcon />
                </CardDataStats>
            </div>

            <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
                <LineChart name='Revenue' data={[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45]} />
                <BarChart />
                <div className='col-span-12 xl:col-span-6'>
                    <TopUsers title='Top users' />
                </div>
            </div>
        </>
    );
};

export default DashboardNew;

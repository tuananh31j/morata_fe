import CartIcon from '~/components/_common/Icons/CartIcon';
import UsersIcon from '~/components/_common/Icons/UsersIcon';
import CardDataStats from './_components/CardDataStats';
import LineChart from './_components/Charts/LineChart/LineChart';
import { CheckOutlined, CloseOutlined, DollarOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CustomerReviewsCard } from './_components/CustomerReviewsCard';
import WrapperList from '~/components/_common/WrapperList';
import DatePickerCard from './_components/DatePickerCard/DatePickerCard';

// import { Tabs, TabsProps } from 'antd';
// import { Link } from 'react-router-dom';

// const items = new Array(3).fill(null).map((_, i) => {
//     const id = String(i + 1);
//     return {
//         label: `Tab ${id}`,
//         key: id,
//         children: `Content of Tab Pane ${id}`,
//         style: i === 0 ? { height: 200 } : undefined,
//     };
// });
// const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
//     <Link to={'/'} style={{ zIndex: 1 }}>
//         <DefaultTabBar {...props} />
//     </Link>
// );

const DashboardNew: React.FC = () => {
    return (
        <>
            {/* <Tabs onChange={onChange} type='card' renderTabBar={renderTabBar} items={items} /> */}

            <div className='flex justify-between'>
                <DatePickerCard />
                <Button type='default' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                    Export Data
                </Button>
            </div>

            <WrapperList lineButtonBox title='Key Metrics'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-7 grid grid-cols-2 grid-rows-2 gap-4'>
                        <CardDataStats colorBorderActive='green' title='Sales' total='$45,2K' rate='4.35%' levelUp>
                            <DollarOutlined className='text-primary dark:fill-white' />
                        </CardDataStats>
                        <CardDataStats colorBorderActive='red' title='Total Orders' total='150' rate='4.35%' levelUp>
                            <CartIcon />
                        </CardDataStats>
                        <CardDataStats
                            colorBorderActive='blue'
                            title='Cancelled Orders'
                            total='100'
                            rate='4.35%'
                            levelUp
                        >
                            <CloseOutlined className='text-rose-800 dark:fill-white' />
                        </CardDataStats>
                        <CardDataStats
                            colorBorderActive='yellow'
                            title='Fulfilled Orders'
                            total='50'
                            rate='4.35%'
                            levelUp
                        >
                            <CheckOutlined className='text-green-800 dark:fill-white' />
                        </CardDataStats>
                        <CardDataStats colorBorderActive='red' title='Total Users' total='1000' rate='4.35%' levelUp>
                            <UsersIcon />
                        </CardDataStats>
                        <CardDataStats
                            colorBorderActive='blue'
                            title='Cancelled Sales'
                            total='$45,2K'
                            rate='4.35%'
                            levelUp
                        >
                            <CartIcon />
                        </CardDataStats>
                    </div>

                    <div className='col-span-5'>
                        <CustomerReviewsCard />
                    </div>
                </div>
            </WrapperList>

            <div className='grid grid-cols-12 gap-4 md:gap-4 2xl:gap-7.5'>
                <LineChart
                    name='Trend Chart of Each Metric
'
                    data={[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45]}
                />
                <div className='col-span-12 xl:col-span-6'></div>
            </div>
        </>
    );
};

export default DashboardNew;

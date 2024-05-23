import WrapperList from '~/components/_common/WrapperList';
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import OrderTable from '~/pages/Clients/Account/MyOrders/Components/OrderTable';

const MyOrders = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'All',
            children: <OrderTable />,
        },
        {
            key: '2',
            label: 'Pending',
            children: <OrderTable />,
        },
        {
            key: '3',
            label: 'Confirmed',
            children: <OrderTable />,
        },
        {
            key: '4',
            label: 'On Delivery',
            children: <OrderTable />,
        },
        {
            key: '5',
            label: 'Done',
            children: <OrderTable />,
        },
    ];

    return (
        <WrapperList title='My orders' className='my-0'>
            {/* @Content */}
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            titleFontSize: 16,
                            inkBarColor: '#16bcdc',
                            itemActiveColor: '#16bcdc',
                        },
                    },
                }}
            >
                <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </ConfigProvider>
        </WrapperList>
    );
};

export default MyOrders;

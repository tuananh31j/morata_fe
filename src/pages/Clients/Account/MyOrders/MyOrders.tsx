import WrapperList from '~/components/_common/WrapperList';
import { ConfigProvider } from 'antd';
import OrderTable from './Components/OrderTable';

const MyOrders = () => {
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
                {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}
                <OrderTable />
            </ConfigProvider>
        </WrapperList>
    );
};

export default MyOrders;

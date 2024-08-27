import WrapperList from '~/components/_common/WrapperList';
import { ConfigProvider } from 'antd';
import OrderTable from './Components/OrderTable';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const MyOrders = () => {
    useDocumentTitle('Đơn hàng của tôi');

    return (
        <WrapperList classic title='Các đơn hàng của tôi' className='my-0'>
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

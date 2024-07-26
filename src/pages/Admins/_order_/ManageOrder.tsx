import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import OrderManagementTabs from '~/components/OrderManagementTabs/OrderManagementTabs';
import { ADMIN_ROUTES } from '~/constants/router';

const ManageOrders = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onChange = (key: string) => {
        navigate(`${ADMIN_ROUTES.ORDERS_LIST}/${key}`);
    };

    const activeKey = location.pathname.split('/').pop();

    return (
        <>
            <div className='my-8 flex items-center justify-between'>
                <h1 className='text-3xl font-bold dark:text-white dark:opacity-80'>Manage Orders</h1>
                <Tooltip title='Export Excel'>
                    <Button
                        type='primary'
                        icon={<VerticalAlignBottomOutlined />}
                        className='flex items-center bg-indigo-600 hover:bg-indigo-700'
                    >
                        <span className='ml-2'>Export</span>
                    </Button>
                </Tooltip>
            </div>
            <div>
                <OrderManagementTabs activeKey={activeKey || 'all'} onChange={onChange} />
            </div>
            <Outlet />
        </>
    );
};

export default ManageOrders;

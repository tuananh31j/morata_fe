import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { TableProps, Tooltip, Avatar, Progress } from 'antd';
import dayjs from 'dayjs';
import { Currency } from '~/utils';

type TopBuyer = {
    _id: string;
    totalOrders: number;
    totalSpent: number;
    totalItems: number;
    lastOrderDate: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
};

type TopBuyersData = {
    topBuyers: TopBuyer[];
    dateRange: {
        start: string;
        end: string;
    };
};

export const columns: TableProps<TopBuyer>['columns'] = [
    {
        title: <span className='text-base font-semibold'>#</span>,
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: '5%',
        render: (_, __, index) => <div className='text-center font-semibold text-[#0068c9]'>{index + 1}</div>,
    },
    {
        title: <span className='text-base font-semibold'>Customer</span>,
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        render: (_, buyer: TopBuyer) => (
            <div className='flex items-center'>
                <Avatar size={48} src={buyer.avatar} icon={!buyer.avatar && <UserOutlined />} className='mr-3' />
                <div className='flex flex-col'>
                    <span className='text-base font-semibold'>{buyer.name}</span>
                    <span className='text-sm text-[#64748b]'>{buyer.email}</span>
                    <span className='text-sm text-[#64748b]'>{buyer.phone}</span>
                </div>
            </div>
        ),
    },
    {
        title: (
            <Tooltip title='Amount of successful orders made by the customer' color='blue'>
                <span className='text-base font-semibold'>
                    Orders <QuestionCircleOutlined />
                </span>
            </Tooltip>
        ),
        dataIndex: 'totalOrders',
        key: 'totalOrders',
        align: 'center',
        width: '15%',
        render: (totalOrders) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#0068c9]'>{totalOrders}</div>
                <div className='text-xs text-[#64748b]'>orders</div>
            </div>
        ),
    },
    {
        title: (
            <Tooltip title='Amount of money the customer has spent' color='blue'>
                <span className='text-base font-semibold'>
                    Spent <QuestionCircleOutlined />
                </span>
            </Tooltip>
        ),
        dataIndex: 'totalSpent',
        key: 'totalSpent',
        align: 'center',
        width: '20%',
        render: (totalSpent) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#3c50e0]'>{Currency.format(totalSpent)}</div>
                <Progress
                    percent={Math.round((totalSpent / 20000) * 100)}
                    showInfo={false}
                    strokeColor='#3c50e0'
                    trailColor='#e6f7ff'
                />
            </div>
        ),
    },
    {
        title: <span className='text-base font-semibold'>Items</span>,
        dataIndex: 'totalItems',
        key: 'totalItems',
        align: 'center',
        width: '15%',
        render: (totalItems) => (
            <div className='text-center'>
                <div className='text-lg font-semibold text-[#722ed1]'>{totalItems}</div>
                <div className='text-xs text-[#64748b]'>items</div>
            </div>
        ),
    },
    {
        title: <span className='text-base font-semibold'>Last Order</span>,
        dataIndex: 'lastOrderDate',
        key: 'lastOrderDate',
        align: 'center',
        width: '15%',
        render: (date) => (
            <div className='text-center'>
                <div className='text-base font-semibold'>{dayjs(date).format('DD/MM/YYYY')}</div>
                <div className='text-xs text-[#64748b]'>{dayjs(date).format('HH:mm')}</div>
            </div>
        ),
    },
];

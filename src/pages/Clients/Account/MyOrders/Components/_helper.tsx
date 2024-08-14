import { Button, type TableColumnsType } from 'antd';
import { OrderStatus, PaymentMethod } from '~/constants/enum';
import ActionLink from './ActionLink';
import PopupOrderDetails from './PopupOrderDetails';
import OrderStatusTag from '~/components/OrderStatusTag';
import { Currency } from '~/utils';
import dayjs from 'dayjs';
import { MAIN_ROUTES } from '~/constants/router';
import { Link } from 'react-router-dom';

export interface DataType {
    _id: string;
    paymentMethod: PaymentMethod;
    currentOrderStatus: string;
    totalPrice: number;
    createdAt: string;
}

const filterStatusItems = [
    {
        text: 'Pending',
        value: OrderStatus.pending,
    },
    {
        text: 'Cancelled',
        value: OrderStatus.cancelled,
    },
    {
        text: 'Confirmed',
        value: OrderStatus.confirmed,
    },
    {
        text: 'Shipping',
        value: OrderStatus.shipping,
    },
    {
        text: 'Delivered',
        value: OrderStatus.delivered,
    },
    {
        text: 'Done',
        value: OrderStatus.done,
    },
];
const updateFilterStatus = (value: any, record: any) => record.orderStatus.indexOf(value) === 0;

export const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: '_id',
        render: (value) => <span>{value}</span>,
    },
    {
        title: 'Payments Method',
        dataIndex: 'paymentMethod',

        render: (text: string) => <span className='font-semibold'>{text.toUpperCase()}</span>,
        filters: [
            {
                text: 'Card',
                value: PaymentMethod.card,
            },
            {
                text: 'Cash',
                value: PaymentMethod.cash,
            },
        ],
        onFilter: (value: any, record: any) => record.paymentMethod.indexOf(value) === 0,
    },

    {
        title: 'Total price',
        dataIndex: 'totalPrice',
        showSorterTooltip: { target: 'full-header' },
        render: (value) => <span>{Currency.format(value)}</span>,
        sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
    },
    {
        title: 'Payment Status',
        dataIndex: 'orderStatus',
        render: (value) => <OrderStatusTag status={value} />,
        filters: filterStatusItems,
        onFilter: updateFilterStatus,
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        showSorterTooltip: { target: 'full-header' },
        render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
    },
    {
        title: 'Actions',
        dataIndex: 'orderStatus',
        render: (value, record) => (
            <>
                <Link to={`${MAIN_ROUTES.MY_ORDERS}/${record._id}`}>
                    <Button type='primary' className='mr-2'>
                        Xem chi tiết
                    </Button>
                </Link>
                {value === 'done' && <ActionLink status={value} orderId={record._id} />}
            </>
        ),
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
];

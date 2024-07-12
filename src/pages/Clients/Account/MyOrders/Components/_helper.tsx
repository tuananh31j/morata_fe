import { type TableColumnsType } from 'antd';
import { OrderStatus, PaymentMethod } from '~/types/enum';
import ActionLink from './ActionLink';
import dayjs from 'dayjs';
import PopupOrderDetails from './PopupOrderDetails';
import OrderStatusTag from '~/components/OrderStatusTag';

export interface DataType {
    _id: string;
    paymentMethod: PaymentMethod;
    orderStatus: string;
    totalPrice: number;
    createdAt: string;
}

const filterStatusItems = [
    {
        text: 'Pending',
        value: OrderStatus.pending,
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
        text: 'Canceled',
        value: OrderStatus.canceled,
    },
    {
        text: 'Done',
        value: OrderStatus.done,
    },
];

export const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: '_id',
        render: (value) => <PopupOrderDetails id={value} />,
    },
    {
        title: 'Payments',
        dataIndex: 'paymentMethod',
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
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        showSorterTooltip: { target: 'full-header' },
        render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
    },
    {
        title: 'Total price',
        dataIndex: 'totalPrice',
        showSorterTooltip: { target: 'full-header' },
    },
    {
        title: 'Status',
        dataIndex: 'orderStatus',
        render: (value) => <OrderStatusTag status={value} />,
        filters: filterStatusItems,
    },
    {
        title: 'Actions',
        dataIndex: 'orderStatus',
        render: (value, record) => <ActionLink status={value} orderId={record._id} />,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
];

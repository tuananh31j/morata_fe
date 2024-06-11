import React from 'react';
import { type TableColumnsType, type TableProps } from 'antd';
import OrderStatusTag from './OrderStatusTag';
import { OrderStatus } from '~/types/enum';
import ActionLink from './ActionLink';
import dayjs from 'dayjs';
import PopupOrderDetails from './PopupOrderDetails';
// import OrderStatusTag from './Components/OrderStatusTag';

interface DataType {
    key: React.Key;
    _id: string;
    paymentMethod: string;
    orderStatus: string;
    totalPrice: number;
    createdAt: string;
}

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
                value: 'card',
            },
            {
                text: 'Cash',
                value: 'cash',
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.paymentMethod.indexOf(value as string) === 0,
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        showSorterTooltip: { target: 'full-header' },
        render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
    {
        title: 'Total price',
        dataIndex: 'totalPrice',
        showSorterTooltip: { target: 'full-header' },
        sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
        title: 'Status',
        dataIndex: 'orderStatus',
        render: (value) => <OrderStatusTag status={value} />,
        filters: [
            {
                text: 'Pending',
                value: OrderStatus.pending,
            },
            {
                text: 'Confirmed',
                value: OrderStatus.confirmed,
            },
            {
                text: 'Done',
                value: OrderStatus.done,
            },
            {
                text: 'Shipping',
                value: OrderStatus.shipping,
            },
            {
                text: 'Canceled',
                value: OrderStatus.canceled,
            },
        ],
        onFilter: (value, record) => record.orderStatus.indexOf(value as string) === 0,
    },
    {
        title: 'Actions',
        dataIndex: 'orderStatus',
        render: (value) => <ActionLink status={value} />,
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortDirections: ['descend'],
    },
];

export const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

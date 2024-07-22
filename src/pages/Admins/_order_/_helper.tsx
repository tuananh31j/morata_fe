import { Space, Tooltip, TableProps } from 'antd';
import OrderStatusTag from '~/components/OrderStatusTag';
import { ORDER_STATUS_ARR, OrderStatus, PaymentMethod } from '~/constants/enum';
import IsPaidTag from '~/components/IsPaidTag';
import { formatDate } from '~/utils/formatDate';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { ADMIN_ROUTES } from '~/constants/router';
import { IOrderParams } from '~/types/Order';
import PaymentMethodTag from '~/components/PaymentMethodTag';

export interface DataType {
    _id: string;
    paymentMethod: PaymentMethod;
    orderStatus: OrderStatus;
    totalPrice: number;
    createdAt: string;
}

export const ordersListColums = (filtered: IOrderParams): TableProps['columns'] => {
    return [
        {
            title: 'pRODUCT',
            dataIndex: ['_id', 'name', 'image'],
            key: '_id',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'PaymentMethod',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            filteredValue: filtered.paymentMethod,
            filters: [
                { text: 'Card', value: PaymentMethod.card },
                { text: 'Cash', value: PaymentMethod.cash },
            ],
            render: (paymentMethod) => <PaymentMethodTag method={paymentMethod} />,
        },
        {
            title: 'OrderStatus',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: [
                { text: 'Pending', value: OrderStatus.pending },
                { text: 'Canceled', value: OrderStatus.canceled },
                { text: 'Confirmed', value: OrderStatus.confirmed },
                { text: 'Shipping', value: OrderStatus.shipping },
                { text: 'Delivered', value: OrderStatus.delivered },
                { text: 'Done', value: OrderStatus.done },
            ],
            filteredValue: filtered.orderStatus,
            render: (orderStatus) => <OrderStatusTag status={orderStatus} />,
        },
        {
            title: 'IsPaid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            filters: [
                { text: 'Paid', value: true },
                { text: 'Not paid', value: false },
            ],
            render: (isPaid) => <IsPaidTag isPaid={isPaid} />,
            filteredValue: filtered.isPaid,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (createdAt) => {
                return <span>{formatDate(createdAt)}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size='middle'>
                    <Tooltip title='Get detail'>
                        <Link to={`${ADMIN_ROUTES.ORDERS}/${record._id}/detail`} className='text-cyan-500'>
                            <EyeOutlined
                                className='hover:bg-gray-100 cursor-pointer rounded-full p-2 transition-colors'
                                style={{ fontSize: '1.2rem' }}
                            />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];
};

export const orderItemsColums: TableProps['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (img) => <img src={img} alt='' width={100} />,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <span>${price}</span>,
    },
];

export const renderSteps = ({ currentStep }: { currentStep: OrderStatus }) => {
    let newArr = ORDER_STATUS_ARR;
    if (currentStep === OrderStatus.canceled) {
        newArr = ORDER_STATUS_ARR.filter((item) => item !== OrderStatus.confirmed);
    } else {
        newArr = ORDER_STATUS_ARR.filter((item) => item !== OrderStatus.canceled);
    }
    const items = newArr.map((step) => ({
        title: step,
    }));
    return {
        items,
        steps: newArr,
    };
};

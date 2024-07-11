// import { type TableColumnsType } from 'antd';
// import dayjs from 'dayjs';
// import OrderStatusTag from '~/components/OrderStatusTag';

import { TableProps } from 'antd';
import { ORDER_STATUS_ARR, OrderStatus } from '~/types/enum';

// export interface DataType {
//     _id: string;
//     paymentMethod: string;
//     orderStatus: string;
//     totalPrice: number;
//     createdAt: string;
// }

// export const columns: TableColumnsType<DataType> = [
//     {
//         title: 'ID',
//         dataIndex: '_id',
//         render: (value) => <PopupOrderDetails id={value} />,
//     },
//     {
//         title: 'Payments',
//         dataIndex: 'paymentMethod',
//         filters: [
//             {
//                 text: 'Card',
//                 value: 'card',
//             },
//             {
//                 text: 'Cash',
//                 value: 'cash',
//             },
//         ],
//         onFilter: (value, record) => record.paymentMethod.indexOf(value as string) === 0,
//     },
//     {
//         title: 'Date',
//         dataIndex: 'createdAt',
//         showSorterTooltip: { target: 'full-header' },
//         render: (value) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
//     },
//     {
//         title: 'Total price',
//         dataIndex: 'totalPrice',
//         showSorterTooltip: { target: 'full-header' },
//         sorter: (a, b) => a.totalPrice - b.totalPrice,
//     },
//     {
//         title: 'Status',
//         dataIndex: 'orderStatus',
//         render: (value) => <OrderStatusTag status={value} />,
//         filters: [
//             {
//                 text: 'Pending',
//                 value: OrderStatus.pending,
//             },
//             {
//                 text: 'Confirmed',
//                 value: OrderStatus.confirmed,
//             },
//             {
//                 text: 'Shipping',
//                 value: OrderStatus.shipping,
//             },
//             {
//                 text: 'Canceled',
//                 value: OrderStatus.canceled,
//             },
//             {
//                 text: 'Done',
//                 value: OrderStatus.done,
//             },
//         ],
//         onFilter: (value, record) => record.orderStatus.indexOf(value as string) === 0,
//     },
//     {
//         title: 'Actions',
//         dataIndex: 'orderStatus',
//         render: (value, record) => <ActionLink status={value} orderId={record._id} />,
//         // sorter: (a, b) => a.name.length - b.name.length,
//         // sortDirections: ['descend'],
//     },
// ];

export const orderItems: TableProps['columns'] = [
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

/* eslint-disable no-nested-ternary */
import type { TableColumnsType } from 'antd';
import { Button, Pagination, Space, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { TableProps } from 'antd/lib';
import { ORDER_STATUS } from '~/constants/order';
import useTable from '~/hooks/_common/useTable';
import { OrderStatus } from '~/constants/enum';

interface Props {
    ordersList: {
        _id: string;
        totalPrice: number;
        paymentMethod: string;
        isPaid: boolean;
        createdAt: string;
    }[];
    totalDocs: number;
}

interface DataType {
    key: number;
    code: string;
    total: number;
    customerName: string;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

const OrderTable = ({ ordersList, totalDocs }: Props) => {
    const { getColumnSearchProps, query, onSelectPaginateChange, onFilter } = useTable();
    const dataSource =
        ordersList && ordersList.length
            ? ordersList.map((order: any, index) => {
                  return {
                      key: index,
                      code: order._id,
                      customerName: order?.customerInfo?.name,
                      total: order.totalPrice,
                      paymentMethod: order.paymentMethod,
                      paymentStatus: order.isPaid ? 'Paid' : 'Unpaid',
                      orderStatus: order.orderStatus,
                      createdAt: order.createdAt,
                  };
              })
            : [];

    const columns: TableColumnsType<DataType> = [
        {
            key: 'search',
            dataIndex: 'code',
            title: 'Mã đơn hàng',
            ...getColumnSearchProps('code'),
            filteredValue: query._id,
        },
        {
            key: 'search',
            dataIndex: 'customerName',
            title: 'Tên khách hàng',
            ...getColumnSearchProps('customerName'),
            ellipsis: true,
        },
        {
            key: 'totalPrice',
            dataIndex: 'total',
            title: 'Tổng tiền',
            render: (text: number) => {
                return <span>{text.toLocaleString()} đ</span>;
            },
            sortOrder: query.sort
                ? query.sort.includes('totalPrice')
                    ? query.sort.includes('-')
                        ? 'descend'
                        : 'ascend'
                    : undefined
                : undefined,
            sorter: (a: any, b: any) => a.total - b.total,
        },
        {
            key: 'isPaid',
            dataIndex: 'paymentStatus',
            title: 'Trạng thái thanh toán',
            render: (text: string) => {
                if (text === 'Unpaid') {
                    return <span className='font-semibold text-red'>Chưa thanh toán</span>;
                }

                return <span className='font-semibold text-green-500'>Đã thanh toán</span>;
            },
            filters: [
                { text: 'Đã thanh toán', value: true },
                { text: 'Chưa thanh toán', value: false },
            ],
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: 'Trạng thái đơn hàng',
            filteredValue: query.orderStatus ? (query.orderStatus as string).split(',') : undefined,
            render: (text: string) => {
                if (text === ORDER_STATUS.CANCELLED) {
                    return <span className='font-semibold text-red'>Đã hủy</span>;
                    // eslint-disable-next-line no-else-return
                } else if (text === ORDER_STATUS.CONFIRMED) {
                    return <span className='font-semibold text-blue-500'>Đã xác nhận</span>;
                } else if (text === ORDER_STATUS.SHIPPING) {
                    return <span className='font-semibold text-green-500'>Đang giao</span>;
                } else if (text === ORDER_STATUS.DELIVERED) {
                    return <span className='font-semibold text-green-500'>Đã giao</span>;
                } else if (text === ORDER_STATUS.DONE) {
                    return <span className='font-semibold text-green-500'>Hoàn thành</span>;
                }

                return <span className='font-semibold text-yellow-500'>Chờ xác nhận</span>;
            },
            filters: [
                { text: 'Chờ Xác nhận', value: OrderStatus.pending },
                { text: 'Đã xác nhận', value: OrderStatus.confirmed },
                { text: 'Đang giao', value: OrderStatus.shipping },
                { text: 'Đã giao', value: OrderStatus.delivered },
                { text: 'Hoàn thành', value: OrderStatus.done },
                { text: 'Đã hủy', value: OrderStatus.cancelled },
            ],
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đặt hàng',
            render: (text: string) => {
                return moment(text).format('DD/MM/YYYY hh:mm:ss');
            },
            sortOrder: query.sort
                ? query.sort.includes('createdAt')
                    ? query.sort.includes('-')
                        ? 'descend'
                        : 'ascend'
                    : undefined
                : undefined,
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
        },
        {
            key: 'action',
            title: 'Thao tác',
            render: (text, record) => {
                return (
                    <Link to={`/admin/orders/${record.code}/detail`}>
                        <Button type='primary'>Xem chi tiết</Button>
                    </Link>
                );
            },
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (_, filters, sorter, extra) => {
        onFilter(filters, sorter);
    };

    return (
        <>
            <Table onChange={onChange} columns={columns} dataSource={dataSource} pagination={false} />
            <Space className='m-5 flex w-full justify-end'>
                <Pagination
                    onChange={onSelectPaginateChange}
                    pageSize={10}
                    total={totalDocs}
                    current={Number(query.page || 1)}
                />
            </Space>
        </>
    );
};
export default OrderTable;

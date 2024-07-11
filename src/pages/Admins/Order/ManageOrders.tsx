import { EyeOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

import { Button, Space, Table, TableProps, Tag, Tooltip } from 'antd';

import Search from 'antd/es/input/Search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderStatusTag from '~/components/OrderStatusTag';
import { ADMIN_ROUTES } from '~/constants/router';
import useFilterOrder from '~/hooks/_common/useFilterOrder';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import { setOrders, setSearchQuery, updateQueryParamsOrder } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';
import { OrderStatus } from '~/types/enum';

const ManageOrders = () => {
    const dispatch = useDispatch();
    const { queryParams, updateQueryParam } = useFilterOrder();
    const { data } = useGetAllOrders(queryParams);

    const searchQuery = useSelector((state: RootState) => state.orderReducer.searchQuery);
    const filteredOrders = useSelector((state: any) => state.orderReducer.filteredData);

    useEffect(() => {
        if (data) {
            console.log('object');
            dispatch(setOrders(data.data.data));
        }
    }, [data, dispatch, queryParams]);

    const handleSearchChange = (event: any) => {
        updateQueryParam('search', event.target.value);
        dispatch(setSearchQuery(event.target.value));
    };
    const onPageChange = (page: number, pageSize: number) => {
        updateQueryParam('page', String(page));
        dispatch(updateQueryParamsOrder({ key: 'page', value: String(page) }));
        dispatch(updateQueryParamsOrder({ key: 'limit', value: String(pageSize) }));
    };

    const columns: TableProps['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => <span>{text}</span>, // Update the render function to match the interface
        },
        {
            title: 'PaymentMethod',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            filters: [
                { text: 'Card', value: 'card' },
                { text: 'Cash', value: 'cash' },
            ],
            onFilter: (value, record) => {
                return false;
            },
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
            onFilter: (value, record) => record.orderStatus.indexOf(value.toString()) === 0,
            render: (orderStatus) => <OrderStatusTag status={orderStatus} />,
        },
        {
            title: 'IsPaid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (
                <Tag color={isPaid ? 'green' : 'red'} key={isPaid}>
                    {isPaid ? 'Paid' : 'Not paid'}
                </Tag>
            ),
            filters: [
                { text: 'Paid', value: true },
                { text: 'Not paid', value: false },
            ],
            onFilter: (value, record) => record.isPaid === value,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            sortDirections: ['descend', 'ascend'],
            render: (createdAt) => {
                const date = new Date(createdAt);
                const formattedDate = date.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                return <span>{formattedDate}</span>;
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

    return (
        <div className='mx-6'>
            <div className='my-6 ml-2 flex items-center justify-between py-2 '>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Orders</h1>
            </div>
            <div className='transi bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
                <h2 className='mb-5 ml-2 text-xl font-medium text-white dark:text-black dark:opacity-80'>
                    Inventory items
                </h2>
                <div className='my-2 flex justify-between'>
                    <Search
                        placeholder='Search ID...'
                        size='large'
                        className='w-[18.75rem]'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Button type='primary' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                        Export
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredOrders.orders}
                    rowKey={(record) => record._id}
                    loading={!filteredOrders.orders}
                    pagination={{
                        total: data?.data?.data.totalDocs,
                        pageSize: Number(queryParams.limit),
                        current: Number(queryParams.page),
                        onChange: onPageChange,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </div>
        </div>
    );
};

export default ManageOrders;

import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import { IOrderParams } from '~/types/Order';
import { DataType, ordersListColums } from '../_helper';

const { Option } = Select;
const OrdersList = () => {
    // const { updateQueryParam, queryParams, pagination: paginationValue } = useFilterOrder();
    // const columns = ordersListColums(queryParams);

    // // @Query
    // const { data } = useGetAllOrders(queryParams, paginationValue);

    // @state
    const [filterType, setFilterType] = useState('orderCode');
    const [filterValue, setFilterValue] = useState('');

    // @event
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
        // updateQueryParam(filters as IOrderParams, pagination.current || 1);
    };

    // console.log(data);

    return (
        <div className='mx-6'>
            <Card className='overflow-hidden rounded-lg shadow-lg'>
                <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
                    <Space size='middle' className='flex-grow sm:flex-grow-0'>
                        <Select
                            defaultValue='orderCode'
                            style={{ width: 180 }}
                            className='text-sm'
                            suffixIcon={<FilterOutlined className='text-gray-400' />}
                            onChange={(value) => setFilterType(value)}
                        >
                            <Option value='orderCode'>Order ID</Option>
                            <Option value='customerName'>Customer name</Option>
                        </Select>
                        <Input
                            placeholder={filterType === 'orderCode' ? 'Enter order ID...' : 'Enter customer name..'}
                            style={{ width: 250 }}
                            className='text-sm'
                            prefix={<SearchOutlined className='text-gray-400' />}
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                    </Space>
                    <Space>
                        <Button type='primary' className='bg-blue-500 hover:bg-blue-600'>
                            Áp dụng
                        </Button>
                        <Button className='border-gray-300 text-gray-600 hover:bg-gray-100'>Đặt lại</Button>
                    </Space>
                </div>

                {/* <Table
                    columns={columns}
                    dataSource={data?.data.data.orders}
                    rowKey={(record) => record._id}
                    loading={!data}
                    onChange={onChange}
                    pagination={{
                        current: paginationValue.page,
                        pageSize: paginationValue.limit,
                        total: data?.data?.data.totalDocs,
                    }}
                /> */}
            </Card>
        </div>
    );
};

export default OrdersList;

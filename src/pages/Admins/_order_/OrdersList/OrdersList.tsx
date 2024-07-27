import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Space, Table, TableProps } from 'antd';
import { useState } from 'react';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import { DataType, ordersListColums } from '../_helper';
import useFilter from '~/hooks/_common/useFilter';
import { OrderStatus } from '~/constants/enum';
import { FormProps } from 'antd/lib';
import { Params } from '~/types/Api';
import _ from 'lodash';

const { Option } = Select;

const OrdersList = ({ status }: { status?: OrderStatus }) => {
    const columns = ordersListColums();
    const { query, updateQueryParam } = useFilter();

    // // @Query
    const { data } = useGetAllOrders({ ...query, currentOrderStatus: status || undefined });

    // @state
    const [filterType, setFilterType] = useState('orderCode');
    const [filterValue, setFilterValue] = useState('');

    // @event
    const onChange: TableProps<DataType>['onChange'] = (paginations) => {
        updateQueryParam({ ...query, page: paginations.current || 1 });
    };
    // @ submit form
    const onSubmit: FormProps['onFinish'] = (values: { name: string }) => {
        updateQueryParam({ ...query, search: values.name } as Params);
    };

    return (
        <div className='mx-6'>
            <Card className='overflow-hidden rounded-lg shadow-lg'>
                <div>
                    <Form className='mb-6 flex flex-wrap items-center justify-between gap-4' onFinish={onSubmit}>
                        <Space size='middle' className='flex-grow sm:flex-grow-0'>
                            <Form.Item name=''>
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
                            </Form.Item>
                            <Form.Item name='name'>
                                <Input
                                    placeholder={
                                        filterType === 'orderCode' ? 'Enter order ID...' : 'Enter customer name..'
                                    }
                                    style={{ width: 250 }}
                                    className='text-sm'
                                    prefix={<SearchOutlined className='text-gray-400' />}
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                />
                            </Form.Item>
                        </Space>
                        <Space>
                            <Button type='primary' htmlType='submit' className='bg-blue-500 hover:bg-blue-600'>
                                Apply
                            </Button>
                            <Button htmlType='reset' className='border-gray-300 text-gray-600 hover:bg-gray-100'>
                                Reset
                            </Button>
                        </Space>
                    </Form>
                </div>

                <Table
                    columns={columns}
                    dataSource={data?.data.data.orders}
                    rowKey={(record) => record._id}
                    loading={!data}
                    onChange={onChange}
                    pagination={{
                        current: Number(query.page) || 1,
                        pageSize: 10,
                        total: data?.data?.data.totalDocs,
                    }}
                />
            </Card>
        </div>
    );
};

export default OrdersList;

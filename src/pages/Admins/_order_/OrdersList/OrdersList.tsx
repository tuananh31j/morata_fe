import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Table, TableProps } from 'antd';
import Search from 'antd/es/input/Search';
import { DataType, ordersListColums } from '../_helper';
import useGetAllOrders from '~/hooks/orders/Queries/useGetAllOrders';
import useFilterOrder from '~/hooks/_common/useFilterOrder';
import { IOrderParams } from '~/types/Order';

const OrdersList = () => {
    const { updateQueryParam, queryParams, pagination: paginationValue } = useFilterOrder();
    const columns = ordersListColums(queryParams);

    // Query
    const { data } = useGetAllOrders(queryParams, paginationValue);

    // @event
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        updateQueryParam(filters as IOrderParams, pagination.current || 1);
    };

    return (
        <div className='mx-6'>
            <div className='my-6 ml-2 flex items-center justify-between py-2 '>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Orders</h1>
            </div>
            <div className='transi bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
                <div className='my-2 flex justify-between'>
                    <Search placeholder='Search ID...' size='large' className='w-[18.75rem]' />
                    <Button type='primary' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                        Export
                    </Button>
                </div>

                <Table
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
                />
            </div>
        </div>
    );
};

export default OrdersList;

import { Table, TableProps } from 'antd';
import { columns, DataType } from './_helper';
import useGetMyOrders from '~/hooks/orders/Queries/useGetMyOrders';

const OrderTable: React.FC = () => {
    const { data, isLoading } = useGetMyOrders();
    const ordersData = data?.data?.data.orders;
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>
            {!isLoading && data && (
                <Table
                    rowKey={(record) => record._id}
                    columns={columns}
                    dataSource={ordersData}
                    pagination={{
                        pageSize: 8,
                    }}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'full-header' }}
                />
            )}
        </>
    );
};

export default OrderTable;

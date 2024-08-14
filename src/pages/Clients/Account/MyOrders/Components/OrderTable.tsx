import { Input, Table, TableProps } from 'antd';
import { columns, DataType } from './_helper';
import useGetMyOrders from '~/hooks/orders/Queries/useGetMyOrders';
import useFilter from '~/hooks/_common/useFilter';
import { useState } from 'react';

const OrderTable: React.FC = () => {
    const { query, updateQueryParam } = useFilter();
    const { data, isLoading } = useGetMyOrders(query);
    const [filteredData, setFilteredData] = useState<DataType[] | null>(null);

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        updateQueryParam({ ...query, page: pagination.current || 1 });
    };

    const handleSearch = (value: string) => {
        if (value.trim() === '') {
            setFilteredData(null);
        } else {
            const searchResults = data?.data.data.orders.filter((order) => order._id === value);
            setFilteredData(searchResults || null);
        }
    };
    return (
        <>
            <Input.Search className='mb-5 w-1/4' placeholder='Search by ID' onSearch={handleSearch} />
            {!isLoading && data && (
                <Table
                    rowKey={(record) => record._id}
                    columns={columns}
                    dataSource={filteredData || data.data?.data?.orders}
                    pagination={{
                        pageSize: 8,
                        current: +query.page || 1,
                    }}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'full-header' }}
                />
            )}
        </>
    );
};

export default OrderTable;

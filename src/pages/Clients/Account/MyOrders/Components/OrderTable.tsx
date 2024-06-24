import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { columns, DataType } from './_helper';
import useGetMyOrders from '~/hooks/Queries/useGetMyOrders';

const OrderTable: React.FC = () => {
    const { data, isLoading, isError } = useGetMyOrders();
    const [myOrdersWithKey, setMyOrdersWithKey] = useState<DataType[]>();
    useEffect(() => {
        if (data && !isError) {
            const orders = data.data.data.map((item, index) => ({
                ...item,
                key: String(index),
            })) as DataType[];
            setMyOrdersWithKey(orders);
        }
    }, [data, isLoading, isError]);

    // const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {};

    return (
        <>
            {!isLoading && (
                <Table
                    columns={columns}
                    dataSource={myOrdersWithKey}
                    pagination={{
                        pageSize: 2,
                    }}
                    showSorterTooltip={{ target: 'full-header' }}
                />
            )}
        </>
    );
};

export default OrderTable;

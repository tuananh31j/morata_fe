/* eslint-disable no-nested-ternary */
import type { TableColumnsType } from 'antd';
import { Pagination, Space, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface ITableAdminProps<T> {
    dataSource?: T[];
    columns: TableColumnsType<T>;
    totalDocs?: number;
    onFilter: (filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => void;
    onSelectPaginateChange: (page: number) => void;
    currentPage: number;
}

const TableAdmin = <T extends object>({
    dataSource,
    columns,
    totalDocs,
    onFilter,
    onSelectPaginateChange,
    currentPage,
}: ITableAdminProps<T>) => {
    const onChange: TableProps<T>['onChange'] = (_, filters, sorter) => {
        onFilter(filters, sorter);
    };

    return (
        <>
            <Table<T>
                bordered={true}
                loading={!dataSource}
                onChange={onChange}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <Space className='m-5 flex w-full justify-end'>
                <Pagination onChange={onSelectPaginateChange} pageSize={10} total={totalDocs} current={currentPage} />
            </Space>
        </>
    );
};
export default TableAdmin;

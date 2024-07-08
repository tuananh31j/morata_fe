import { type TableColumnsType } from 'antd';

export interface DataType {
    rank: number;
    name: string;
    avt: string;
    totalOrders: number;
    purchases: string;
}

export const columns: TableColumnsType<DataType> = [
    {
        title: 'rank',
        dataIndex: 'rank',
    },
    {
        title: 'name',
        dataIndex: 'name',
    },
    {
        title: 'avt',
        dataIndex: 'avt',
    },
    {
        title: 'Total orders',
        dataIndex: 'totalOrders',
    },
    {
        title: 'purchases',
        dataIndex: 'purchases',
    },
];

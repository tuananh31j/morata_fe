import { Space, Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    orderID: string;
    status: string;
    date: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '#',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'ID',
        dataIndex: 'orderID',
        key: 'orderID',
        render: (text) => <a href='/'>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'dates',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size='middle'>
                {record.status === 'Pending' && <a href='/'>Approve</a>}
                {record.status === 'Confirmed' && <a href='/'>Dispatch</a>}
                <a href='/'>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        orderID: 'qwe',
        status: 'Pending',
        date: '1/1/2024',
    },
    {
        key: '2',
        orderID: 'asd',
        status: 'Confirmed',
        date: '1/1/2024',
    },
    {
        key: '3',
        orderID: 'zxc',
        status: 'On Delivery',
        date: '1/1/2024',
    },
];

const OrderTable = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default OrderTable;

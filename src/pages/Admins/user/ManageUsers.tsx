import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

type DataType = {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
};

const ManageProducts = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a href='/'>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <a href='/'>Invite {record.name}</a>
                    <a href='/'>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '4',
            name: 'Walter White',
            age: 50,
            address: '308 Belmont Avenue, Ontario, California 91764',
            tags: ['cool', 'teacher', 'blue sky'],
        },
    ];
    return (
        <div className='mx-6 bg-white'>
            Manage Products
            <div className='m-2'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default ManageProducts;

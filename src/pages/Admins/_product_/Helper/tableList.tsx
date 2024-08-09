import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, TableProps, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

export interface DataType {
    name: string;
    thumbnail: string;
    price: string;
    stock: string;
    category: string;
    action: string;
}

export const ProductsListColumns = (handleHiddenProduct: (id: string) => void): TableProps['columns'] => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <>
                    <h4>{text}</h4>
                    <p className='text-[10px]'>SKU: {record.sku}</p>
                    <p className='text-[10px]'>ID: {record._id}</p>
                </>
            ),
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url, record) => (
                <img src={url} key={record._id} className='h-10 w-10 object-cover' alt='thumbnail' />
            ),
            responsive: ['md'],
        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => {
                return (
                    <h4>
                        {record.variationIds[0]?.price} - {record.variationIds[record.variationIds.length - 1]?.price}
                    </h4>
                );
            },
        },
        {
            title: 'Stock',
            dataIndex: 'variationIds',
            key: 'Stock',
            /* eslint-disable */
            render: (variation) => <h4>{variation.reduce((acc: number, curr: any) => acc + curr.stock, 0)}</h4>,
            /* eslint-enable */
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

            render: (_, record) => {
                return <h4>{record.categoryId.name}</h4>;
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id}>
                    <Tooltip title='Update'>
                        <Link
                            to={`/admin/products/${record._id}/edit`}
                            className='text-blue-500 transition-colors duration-500 hover:text-blue-400'
                        >
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                    {/* <Tooltip title='Hidden'>
                        <DeleteOutlined
                            onClick={() => handleHiddenProduct(record._id)}
                            className='cursor-pointer rounded-full bg-rose-200 p-2 text-red transition-colors duration-500 hover:bg-rose-100'
                            style={{ fontSize: '1rem' }}
                        />
                    </Tooltip> */}
                </Space>
            ),
        },
        {
            title: 'Detail',
            key: 'detail',
            render: (_, record) => (
                <Space size='middle' key={record._id}>
                    <Tooltip title='Get detail'>
                        <Button
                            type='link'
                            href={`/admin/products/${record._id}/detail`}
                            icon={
                                <EllipsisOutlined
                                    className='hover:bg-gray-100 cursor-pointer rounded-full p-2  text-black transition-colors'
                                    style={{ fontSize: '1.25rem' }}
                                />
                            }
                        ></Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
};

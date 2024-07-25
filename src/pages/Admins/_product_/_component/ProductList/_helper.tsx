import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, TableProps, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '~/types/Category';

const tags: string[] = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];
type ICategoryCollection = {
    [key: string]: string;
};

export const ProductsListColumns = (
    showModal: (id: string) => void,
    categoryData?: ICategory[]
): TableProps['columns'] => {
    const [categories, setCategories] = useState<ICategoryCollection>({});

    useEffect(() => {
        (async () => {
            if (categoryData) {
                const categoryObject = categoryData?.reduce((prev: ICategoryCollection, curr: ICategory) => {
                    // add a key and value in original object
                    prev[curr._id] = curr.name;
                    return prev;
                }, {});
                setCategories(categoryObject);
            }
        })();
    }, [categoryData]);

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url, record) => <img src={url} key={record._id} height={80} width={80} alt='thumbnail' />,
            responsive: ['md'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            // sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            // sorter: (a, b) => a.stock - b.stock,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

            render: (_, cat) => {
                const color = tags[Math.floor(Math.random() * tags.length)];
                const getCategory = categories[`${cat.categoryId}`] || 'Unknown';
                return (
                    <>
                        <Tag color={color} key={cat.categoryId}>
                            {`${getCategory}`}
                        </Tag>
                    </>
                );
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id}>
                    <Tooltip title='Update'>
                        <Link to={`/admin/products/${record._id}/edit`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <DeleteOutlined
                            onClick={() => showModal(record._id)}
                            className='rounded-full bg-rose-200 p-2 text-red'
                            style={{ fontSize: '1rem' }}
                        />
                    </Tooltip>
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

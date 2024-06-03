import { EllipsisOutlined, WarningOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useState } from 'react';

type DataType = {
    id?: string;
    key: string;
    name: string;
    thumbnail: string;
    price: number;
    stock: number;
    category: string[];
};

const ManageProducts = () => {
    const [searchText, setSearch] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4>{text}</h4>,
            filteredValue: [searchText],
            onFilter: (value, record) => {
                const searchValue = (typeof value === 'string' && value.toLowerCase()) || '';
                return typeof value && record.name.toLowerCase().includes(searchValue);
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url) => <img src={url} height={80} width={80} alt='thumbnail' />,
            responsive: ['md'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a, b) => a.stock - b.stock,
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (_, { category }) => (
                <>
                    {category.map((cat) => {
                        let color = cat.length > 5 ? 'geekblue' : 'green';
                        if (cat === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={cat}>
                                {cat.toUpperCase()}
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
                    <Tooltip title='Update'>
                        <Button type='link'>Edit</Button>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <Button type='primary' danger onClick={showModal}>
                            Delete
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: 'Detail',
            key: 'detail',
            render: (_, record) => (
                <Space size='middle'>
                    <Tooltip title='Detail'>
                        <Button
                            type='link'
                            icon={
                                <EllipsisOutlined
                                    className='cursor-pointer rounded-full p-2  transition-colors hover:bg-gray-100'
                                    style={{ fontSize: '1.5rem' }}
                                />
                            }
                        ></Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['cool', 'teacher'],
        },
        {
            key: '4',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['cool', 'teacher', 'blue sky'],
        },
        {
            key: '5',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['cool', 'teacher', 'blue sky'],
        },
        {
            key: '6',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: ['cool', 'teacher', 'blue sky'],
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    useEffect(() => {
        const searchId = setTimeout(() => {
            setSearch(inputSearchValue);
        }, 800);
        return () => clearTimeout(searchId);
    }, [inputSearchValue]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setInputSearchValue(search);
    };

    return (
        <div className='mx-6 mt-[100px]'>
            <div className='transi m-2 rounded-2xl bg-gray-50 p-4 px-5 transition-all duration-500'>
                <h2 className='mb-5 ml-2 mt-4 font-medium text-[#344767]'>Manage Products</h2>
                <div className='flex justify-between'>
                    <Button type='primary' href='/admin/products/add' className='mx-2'>
                        Add new product
                    </Button>
                    <Search placeholder='Search name...' size='middle' className='w-56' onChange={handleSearch} />
                </div>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 4,
                    }}
                />
            </div>
            <Modal
                title={
                    <div>
                        <WarningOutlined className='text-yellow-500' style={{ fontSize: '1.5rem' }} />
                        <h4 className='ml-2 inline-block'>Confirm</h4>
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' type='default' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key='button' danger type='primary' onClick={handleOk}>
                        Delete
                    </Button>,
                ]}
            >
                <p>Are you sure want to delete this product?</p>
            </Modal>
        </div>
    );
};

export default ManageProducts;

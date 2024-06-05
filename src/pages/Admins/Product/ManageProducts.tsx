import {
    EllipsisOutlined,
    PlusOutlined,
    SearchOutlined,
    VerticalAlignBottomOutlined,
    WarningOutlined,
} from '@ant-design/icons';
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
    category: string;
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
            render: (_, cat) => {
                const color = 'geekblue';
                return (
                    <>
                        <Tag color={color} key={cat.key}>
                            {cat.category.toUpperCase()}
                        </Tag>
                    </>
                );
            },
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
                    <Tooltip title='Get detail'>
                        <Button
                            type='link'
                            href={`/admin/product/1/detail`}
                            icon={
                                <EllipsisOutlined
                                    className='cursor-pointer rounded-full p-2  transition-colors hover:bg-gray-100'
                                    style={{ fontSize: '1.6rem' }}
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
            category: 'developer',
        },
        {
            key: '2',
            name: 'Jim Green',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: 'developer',
        },
        {
            key: '3',
            name: 'Joe Black',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: 'blue sky',
        },
        {
            key: '4',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: 'blue sky',
        },
        {
            key: '5',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: 'blue sky',
        },
        {
            key: '6',
            name: 'Walter White',
            thumbnail: 'https://picsum.photos/300/300',
            price: 200,
            stock: 10,
            category: 'blue sky',
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
            <div className='my-6 ml-2 flex items-center justify-between py-2 '>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Products</h1>
                <Button size='large' icon={<PlusOutlined />} type='primary' href='/admin/products/add' className='mx-2'>
                    Add product
                </Button>
            </div>
            <div className='transi m-2 rounded-2xl bg-gray-50 p-4 px-5 transition-all duration-500 '>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767] dark:text-white dark:opacity-80'>
                    Inventory items
                </h2>
                <div className='my-2 flex justify-between'>
                    <Search
                        placeholder='Search name...'
                        size='large'
                        className='w-[18.75rem]'
                        onChange={handleSearch}
                    />
                    <Button type='primary' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                        Export
                    </Button>
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

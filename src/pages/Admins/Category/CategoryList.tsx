import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    PlusOutlined,
    VerticalAlignBottomOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetCategories from '~/hooks/Queries/useGetCategories';

type DataType = {
    _id?: string;
    key?: string;
    name: string;
    description: string;
};

const CategoryList = () => {
    const { data: categories, isLoading: categoriesLoading } = useGetCategories();
    const categoryList = categories?.data;

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
            title: 'Id',
            dataIndex: '_id',
            key: 'id',
            width: '15%',
        },
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
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title='Update'>
                        <Link to={`/category`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>

                    <Tooltip title='Delete'>
                        <DeleteOutlined
                            onClick={showModal}
                            className='rounded-full bg-red-100 p-2 text-red-500'
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
                <Space size='middle'>
                    <Tooltip title='Get detail'>
                        <Button
                            type='link'
                            href={`/admin/product/1/detail`}
                            icon={
                                <EllipsisOutlined
                                    className='cursor-pointer rounded-full p-2 text-black  transition-colors hover:bg-gray-100'
                                    style={{ fontSize: '1.25rem' }}
                                />
                            }
                        ></Button>
                    </Tooltip>
                </Space>
            ),
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
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Categories</h1>

                <Link to='create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Add category
                    </Button>
                </Link>
            </div>

            <div className='transi m-2 rounded-2xl bg-gray-50 p-4 px-5 transition-all duration-500 '>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767] '>Category List</h2>

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
                    size='large'
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={categoryList}
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
                <p>Are you sure want to delete this category?</p>
            </Modal>
        </div>
    );
};

export default CategoryList;

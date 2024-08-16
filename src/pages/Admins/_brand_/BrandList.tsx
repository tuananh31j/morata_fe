import { EditOutlined, PlusOutlined, VerticalAlignBottomOutlined, WarningOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import { IAttributesValue } from '~/types/Attributes';

type DataType = {
    _id?: string;
    key?: string;
    name: string;
    attributeIds: string[] | IAttributesValue[];
    attributeNames?: string[];
};

const CategoryList = () => {
    const { data: categories } = useGetCategories();
    const categoryList = categories?.data;

    // Add attributeNames to categoryList
    const categoryListWithAttributes = categoryList?.map((category) => ({
        ...category,
        key: category._id,
        attributeNames: category.attributeIds?.map((att) => att.name),
    }));

    const [searchText, setSearch] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '30%',
        },
        {
            title: 'Attributes',
            dataIndex: 'attributeNames',
            key: 'attributeNames',
            width: '70%',
            render: (_, { attributeNames }) => (
                <>
                    {attributeNames?.map((attributeName) => {
                        return (
                            <Tag color={'geekblue'} key={attributeName}>
                                {attributeName.toUpperCase()}
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
                <Space size={'middle'}>
                    <Tooltip title='Cập nhậy danh mục'>
                        <Link to={`${ADMIN_ROUTES.CATEGORIES_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {},
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
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Categories</h1>

                <Link to='create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Add category
                    </Button>
                </Link>
            </div>

            <div className='transi bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
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

                {categoryListWithAttributes ? (
                    <Table
                        size='large'
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={categoryListWithAttributes}
                        pagination={{
                            pageSize: 4,
                        }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
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
        </>
    );
};

export default CategoryList;

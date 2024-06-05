import { EllipsisOutlined, PlusOutlined, VerticalAlignBottomOutlined, WarningOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useState } from 'react';

type DataType = {
    id?: string;
    key: string;
    username: string;
    email: string;
    role: string;
    address: string;
    phoneNumber: string;
};

const ManageUsers = () => {
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
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <h4>{text}</h4>,
            filteredValue: [searchText],
            onFilter: (value, record) => {
                const searchValue = (typeof value === 'string' && value.toLowerCase()) || '';
                return typeof value && record.username.toLowerCase().includes(searchValue);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <span>{email}</span>,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                let color = 'geekblue';
                if (role === 'staff') {
                    color = 'green';
                } else if (role === 'admin') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} className='capitalize'>
                        {role}
                    </Tag>
                );
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) => <p>{address}</p>,
            responsive: ['lg'],
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Tooltip title='Delete'>
                        <Button type='primary' danger onClick={showModal}>
                            Delete
                        </Button>
                    </Tooltip>
                    <Tooltip title='Detail'>
                        <Button
                            type='link'
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
            username: 'Walter White',
            email: 'datntph24947@fpt.edu.vn',
            role: 'admin',
            phoneNumber: '0931239321',
            address: '308 Belmont Avenue, Ontario, California 91764',
        },
        {
            key: '2',
            username: 'Jim Green',
            email: 'datntph24947@fpt.edu.vn',
            role: 'staff',
            phoneNumber: '0931239321',
            address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
        },
        {
            key: '3',
            username: 'John Brown',
            email: 'datntph24947@fpt.edu.vn',
            role: 'user',
            phoneNumber: '0931239321',
            address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
        },
        {
            key: '4',
            username: 'John Brown',
            email: 'datntph24947@fpt.edu.vn',
            role: 'staff',
            phoneNumber: '0931239321',
            address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
        },
        {
            key: '5',
            username: 'Walter White',
            email: 'datntph24947@fpt.edu.vn',
            role: 'staff',
            phoneNumber: '0931239321',
            address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
        },
        {
            key: '6',
            username: 'Walter White',
            email: 'datntph24947@fpt.edu.vn',
            role: 'staff',
            phoneNumber: '0931239321',
            address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.username === 'Disabled User', // Column configuration not to be checked
            name: record.username,
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
            <div className='my-6 ml-2 flex items-center justify-between '>
                <h1 className='text-3xl font-semibold'>Manage Users</h1>
                <Button size='large' icon={<PlusOutlined />} type='primary' href='/admin/user/create' className='mx-2'>
                    Create user
                </Button>
            </div>
            <div className='transi m-2 rounded-2xl bg-gray-50 p-4 px-5 transition-all duration-500'>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767]'>Account</h2>
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

export default ManageUsers;

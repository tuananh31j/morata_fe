import {
    DeleteOutlined,
    EditOutlined,
    FilterOutlined,
    FrownTwoTone,
    PlusOutlined,
    VerticalAlignBottomOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Image, Modal, Select, Space, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllUsers from '~/hooks/users/Queries/useGetAllUsers';

type DataType = {
    key?: string;
    _id: string;
    username: string;
    email: string;
    isActive: boolean;
    avatar: string;
    phone: string;
    role: string;
    createdAt: string;
};

const ManageUsers = () => {
    const [searchText, setSearch] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useGetAllUsers();
    const users = data?.data?.users;
    console.log(data);
    console.log(users);

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
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    {avatar ? (
                        <Image src={avatar} width={100} height={100} />
                    ) : (
                        <Space className='flex items-center'>
                            No avatar <FrownTwoTone />
                        </Space>
                    )}
                </div>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <h4>{text}</h4>,

            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <span>{email}</span>,
        },
        {
            title: 'Contact',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'Staff',
                    value: 'staff',
                },
                {
                    text: 'User',
                    value: 'user',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.role.startsWith(value as string),
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Update'>
                        <Link to={`${ADMIN_ROUTES.USERS_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                    {/* <Tooltip title='Delete'>
                        <DeleteOutlined
                            onClick={showModal}
                            className='bg-red-100 text-red-500 rounded-full p-2'
                            style={{ fontSize: '1rem' }}
                        />
                    </Tooltip> */}
                </Space>
            ),
        },
    ];

    // const data: DataType[] = [
    //     {
    //         key: '1',
    //         username: 'Walter White',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'admin',
    //         phoneNumber: '0931239321',
    //         address: '308 Belmont Avenue, Ontario, California 91764',
    //     },
    //     {
    //         key: '2',
    //         username: 'Jim Green',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'staff',
    //         phoneNumber: '0931239321',
    //         address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
    //     },
    //     {
    //         key: '3',
    //         username: 'John Brown',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'user',
    //         phoneNumber: '0931239321',
    //         address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
    //     },
    //     {
    //         key: '4',
    //         username: 'John Brown',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'staff',
    //         phoneNumber: '0931239321',
    //         address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
    //     },
    //     {
    //         key: '5',
    //         username: 'Walter White',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'staff',
    //         phoneNumber: '0931239321',
    //         address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
    //     },
    //     {
    //         key: '6',
    //         username: 'Walter White',
    //         email: 'datntph24947@fpt.edu.vn',
    //         role: 'staff',
    //         phoneNumber: '0931239321',
    //         address: 'Trịnh Văn Bố, Nam Từ Liêm, Hà Nội',
    //     },
    // ];

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
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className='flex items-center justify-between '>
                <h1 className='text-3xl font-semibold text-white dark:opacity-80'>Manage Users</h1>
                <Link to='/admin/user/create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Create user
                    </Button>
                </Link>
            </div>
            <div className='transi bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500'>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767]'>Account</h2>
                <div className='my-2 flex justify-between'>
                    <Search
                        placeholder='Search name...'
                        size='large'
                        className='w-[18.75rem]'
                        onChange={handleSearch}
                    />
                    <div className='flex items-center gap-3'>
                        <Select
                            suffixIcon={<FilterOutlined />}
                            defaultValue='lucy'
                            placeholder={'Select fillters'}
                            onChange={handleChange}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                            className='w-[10rem]'
                        ></Select>
                        <Button type='primary' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                            Export
                        </Button>
                    </div>
                </div>

                <Table
                    rowKey={(record) => record._id}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={users}
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
        </>
    );
};

export default ManageUsers;

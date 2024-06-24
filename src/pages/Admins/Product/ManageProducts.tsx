import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    PlusOutlined,
    VerticalAlignBottomOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useDeleteProduct from '~/hooks/Mutations/Product/useDeleteProduct';
import useGetProducts from '~/hooks/Queries/Products/useGetProducts';
import useGetCategories from '~/hooks/Queries/useGetCategories';
import { ICategory } from '~/types/Category';
import { IProduct } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';

type ICategoryCollection = {
    [key: string]: string;
};

const ManageProducts = () => {
    const [searchText, setSearch] = useState<string>('');
    const [inputSearchValue, setInputSearchValue] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategoryCollection>({});
    const { data } = useGetProducts({});
    const productData = data?.data.docs;
    const { data: categoryData } = useGetCategories();
    const { mutate, isSuccess, isError } = useDeleteProduct();
    const productId = useRef<string>('');
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
    useEffect(() => {
        (async () => {
            if (categoryData) {
                const categoryObject = categoryData?.data?.reduce((prev: ICategoryCollection, curr: ICategory) => {
                    // add a key and value in original object
                    prev[curr._id] = curr.name;
                    return prev;
                }, {});
                setCategories(categoryObject);
            }
        })();
    }, [productData, categoryData]);

    const showModal = (id: string) => {
        setIsModalOpen(true);
        productId.current = id;
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        productId.current = '';
        setConfirmLoading(false);
    };
    const handleDeleteProduct = async () => {
        setConfirmLoading(true);
        mutate(productId.current);
    };

    const columns: TableProps<IProduct>['columns'] = [
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
        // {
        //     title: 'Status',
        //     key: 'status',
        //     dataIndex: 'status',
        //     sorter: (a, b) => a.status.localeCompare(b.status),
        //     render: (_, record) => {
        //         let color = 'green';
        //         if (record.status === 'out of stock') color = 'red';
        //         return (
        //             <>
        //                 <Tag color={color} key={record.key}>
        //                     {record.status.toUpperCase()}
        //                 </Tag>
        //             </>
        //         );
        //     },
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id}>
                    <Tooltip title='Update'>
                        <Link to={`/admin/products/edit`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <DeleteOutlined
                            onClick={() => showModal(record._id)}
                            className='bg-red-100 text-red-500 rounded-full p-2'
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: IProduct) => ({
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

    useEffect(() => {
        if (isSuccess) {
            setConfirmLoading(false);
            /* eslint-disable */
            setIsModalOpen(false);
            /* eslint-enable */
            showMessage('Product has been deleted successfully', 'success');
        }
        if (isError) {
            showMessage('Product has been deleted failure', 'error');
        }
    }, [isSuccess, isError]);

    return (
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Products</h1>
                <Link to='/admin/products/create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Add product
                    </Button>
                </Link>
            </div>
            <div className='transi bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767] dark:text-black '>Inventory items</h2>
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
                    rowKey={(record) => record._id}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={productData}
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
                    <Button
                        key='button'
                        danger
                        loading={confirmLoading}
                        type='primary'
                        onClick={() => {
                            handleDeleteProduct();
                        }}
                    >
                        Delete
                    </Button>,
                ]}
            >
                <p>Are you sure want to delete this product?</p>
            </Modal>
        </>
    );
};

export default ManageProducts;

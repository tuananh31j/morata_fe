import {
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    FilterOutlined,
    PlusOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import type { CheckboxProps, FormProps, MenuProps, RadioChangeEvent, TableProps } from 'antd';
import {
    Button,
    Checkbox,
    ConfigProvider,
    Dropdown,
    Form,
    InputNumber,
    Modal,
    Radio,
    Rate,
    Space,
    Table,
    Tag,
    Tooltip,
} from 'antd';
import Search from 'antd/es/input/Search';
import { log } from 'console';
import { debounce } from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useGetAllBrands from '~/hooks/brands/useGetAllBrands';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import useDeleteProduct from '~/hooks/products/Mutations/useDeleteProduct';
import useGetProducts from '~/hooks/products/Queries/useGetProducts';
import {
    IFilterOptions,
    IFilterParams,
    IFilterPayload,
    IFilterStorage,
    ILimitValue,
    ISort,
    MAX_PRICE,
    MIN_PRICE,
    MIN_RATING,
    resetAllFilters,
    setFilter,
    setFilterParams,
} from '~/store/slice/AdminfilterProduct';
import { RootState } from '~/store/store';
import { ICategory } from '~/types/Category';
import { IProductItem } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import { errorMessage } from '~/validation/Product';

type ICategoryCollection = {
    [key: string]: string;
};
type Iparams = {
    [key: string]: string | number | boolean | ILimitValue | ISort;
};

type PriceRangeType = {
    min?: number;
    max?: number;
};

const ManageProducts = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategoryCollection>({});
    const { data: categoryData } = useGetCategories();
    const { data: brandsData } = useGetAllBrands();
    const { mutate, isSuccess, isError } = useDeleteProduct();
    const productId = useRef<string>('');
    const dispatch = useDispatch();
    const [form] = Form.useForm<PriceRangeType>();
    const filterOptions: IFilterOptions = useSelector((state: RootState) => state.AdminTableFilterProduct.filters);
    // add params from redux to params object
    const params: Iparams = useSelector((state: RootState) => state.AdminTableFilterProduct.params);
    const filters: IFilterStorage = JSON.parse(localStorage.getItem('filters') || 'null');
    const filtersData = filters?.filters;

    const { data } = useGetProducts({ ...params });
    const productData = data?.data.products;
    const totalDocs = data?.data.totalDocs;
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
    const categoriesOptions = categoryData?.data?.map((category) => ({
        label: category.name,
        value: category._id,
    }));
    const brandsOptions = brandsData?.data?.map((category) => ({
        label: category.name,
        value: category._id,
    }));

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

    const handleSetFilter = (dataFilter: IFilterPayload) => {
        dispatch(setFilter(dataFilter));
    };
    const onChangeAvailable: CheckboxProps['onChange'] = (e) => {
        if (e.target.checked) {
            handleSetFilter({
                key: 'isAvailable',
                value: {
                    value: true,
                    checked: true,
                },
            });
        } else {
            handleSetFilter({
                key: 'isAvailable',
                value: {
                    value: false,
                    checked: false,
                },
            });
        }
    };

    const columns: TableProps<IProductItem>['columns'] = [
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
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProductItem[]) => {},
        getCheckboxProps: (record: IProductItem) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const onChange: TableProps<IProductItem>['onChange'] = (pagination) => {
        handleSetFilter({
            key: 'page',
            value: {
                value: pagination.current ?? 1,
            },
        });
    };
    // search with debounce
    /* eslint-disable */
    const debounceFn = useCallback(
        debounce(
            (search) =>
                handleSetFilter({
                    key: 'search',
                    value: {
                        value: search,
                    },
                }),
            1000
        ),
        []
    );
    /* eslint-enable */

    const handleChangeRating = (value: number) => {
        const maxRating = value;
        handleSetFilter({
            key: 'rating',
            value: {
                value: { min: MIN_RATING, max: maxRating },
            },
        });
    };

    // search change
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        debounceFn(search);
    };
    const onFinish: FormProps<PriceRangeType>['onFinish'] = (values: PriceRangeType) => {
        const { min, max } = values as { min: number; max: number };
        handleSetFilter({
            key: 'price',
            value: {
                value: { min, max },
            },
        });
    };

    const onChangeCategories = (e: RadioChangeEvent) => {
        const categoryIdValue = e.target.value;
        handleSetFilter({
            key: 'categoryId',
            value: {
                value: categoryIdValue,
                checked: true,
            },
        });
    };
    const onChangeBrands = (e: RadioChangeEvent) => {
        const brandIdValue = e.target.value;
        handleSetFilter({
            key: 'brandId',
            value: {
                value: brandIdValue,
                checked: true,
            },
        });
    };

    const items: MenuProps['items'] = [
        {
            key: 'Categories',
            label: (
                <div onClick={(e) => e?.stopPropagation()} className='px-2'>
                    <Radio.Group onChange={onChangeCategories} value={filtersData?.categoryId.value.value}>
                        <Space direction='horizontal' className='grid grid-cols-2'>
                            {categoriesOptions?.map((category) => {
                                return (
                                    <Radio key={category.value} value={category.value}>
                                        {category.label}
                                    </Radio>
                                );
                            })}
                        </Space>
                    </Radio.Group>
                </div>
            ),
        },
        {
            key: 'Brands',
            label: (
                <div onClick={(e) => e?.stopPropagation()} className='px-2'>
                    <Radio.Group onChange={onChangeBrands} value={filtersData?.brandId?.value.value}>
                        <Space direction='horizontal' className='grid grid-cols-2'>
                            {brandsOptions?.map((brand) => (
                                <Radio key={brand.value} value={brand.value}>
                                    {brand.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
            ),
        },
        {
            key: 'Available',
            label: (
                <div onClick={(e) => e?.stopPropagation()} className='px-2'>
                    <Checkbox
                        onChange={onChangeAvailable}
                        defaultChecked={filtersData?.isAvailable?.value?.checked ?? true}
                    >
                        Available
                    </Checkbox>
                </div>
            ),
        },
        {
            key: 'Price range',
            label: (
                <div onClick={(e) => e?.stopPropagation()} className='px-2'>
                    <span>Price range:</span>
                    <Form
                        name='price_range'
                        onFinish={onFinish}
                        autoComplete='off'
                        form={form}
                        layout='vertical'
                        className='grid grid-cols-1'
                    >
                        <Form.Item<PriceRangeType>
                            label='Min'
                            name='min'
                            initialValue={
                                filtersData?.price ? (filtersData?.price.value.value as ILimitValue)?.min : null
                            }
                            rules={[
                                {
                                    validator(_, min) {
                                        if (!min && min !== 0) {
                                            return errorMessage('Please input your price range!');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber min={MIN_PRICE} max={MAX_PRICE} placeholder='From' className='w-full' />
                        </Form.Item>
                        <Form.Item<PriceRangeType>
                            label='Max'
                            name='max'
                            initialValue={
                                filtersData?.price ? (filtersData?.price.value.value as ILimitValue)?.max : null
                            }
                            rules={[
                                {
                                    validator(_, max) {
                                        if (!max) {
                                            return errorMessage('Please input your price range!');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber min={MIN_PRICE} max={MAX_PRICE} placeholder='To' className='w-full' />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='w-full'>
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: 'Rating',
            label: (
                <div onClick={(e) => e?.stopPropagation()} className='px-2 pb-4'>
                    <span>Rating:</span>
                    <div className='mt-2'>
                        <Rate
                            allowClear={false}
                            value={(filtersData?.rating?.value?.value as ILimitValue)?.max ?? 5}
                            onChange={handleChangeRating}
                        />
                    </div>
                </div>
            ),
        },
        {
            key: 'Reset all',
            label: (
                <div className='text-right'>
                    <Button
                        type='primary'
                        className='px-6'
                        onClick={(e) => {
                            e?.stopPropagation();
                            dispatch(resetAllFilters());
                        }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        },
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

    /* eslint-disable */
    useEffect(() => {
        if (!filters) {
            for (const key in filterOptions) {
                const element = filterOptions[key as keyof IFilterOptions];
                if (element?.value !== undefined) {
                    dispatch(setFilterParams({ key: key as IFilterParams['key'], value: element?.value }));
                }
            }
        } else {
            for (const key in filtersData) {
                const element = filtersData[key as keyof IFilterOptions];
                const paramsValue = element?.value.value;
                dispatch(setFilterParams({ key: key as IFilterParams['key'], value: paramsValue }));
            }
        }
    }, [filterOptions]);

    useEffect(() => {
        return () => {
            dispatch(resetAllFilters());
        };
    }, []);
    /* eslint-enable */

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
                    <div>
                        <Search
                            placeholder='Search name...'
                            size='large'
                            className='w-[18.75rem]'
                            onChange={handleSearch}
                            defaultValue={(filtersData?.search?.value?.value as string) ?? ''}
                        />
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Dropdown: {
                                    paddingBlock: 10,
                                },
                            },
                            token: {
                                controlItemBgHover: '#fff',
                            },
                        }}
                    >
                        <Dropdown
                            menu={{ items }}
                            trigger={['click']}
                            dropdownRender={(menu) => (
                                <div className='filter__scollbar max-h-[250px] overflow-y-auto rounded-md bg-white'>
                                    <div className=' bg-white '>{menu}</div>
                                </div>
                            )}
                        >
                            <Button type='primary'>
                                <Space>
                                    Filters
                                    <FilterOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </ConfigProvider>
                </div>
                <Table
                    size='large'
                    rowKey={(record) => record._id}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    loading={!productData}
                    onChange={onChange}
                    dataSource={productData}
                    pagination={{
                        pageSize: 10,
                        total: totalDocs,
                        current: Number(filtersData?.page?.value?.value ?? 1),
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

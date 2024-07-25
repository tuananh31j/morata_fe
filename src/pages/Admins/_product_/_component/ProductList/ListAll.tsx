import { PlusOutlined } from '@ant-design/icons';
import type { FormProps, InputProps, TableProps } from 'antd';
import { Button, Form, Select, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDelete from '~/components/_common/Modal/ModalDelete';
import useFilterProduct from '~/hooks/_common/useFilterProduct';
import useDeleteProduct from '~/hooks/products/Mutations/useDeleteProduct';
import useGetProducts from '~/hooks/products/Queries/useGetProducts';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import { IProductItem, IProductParams } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import { ProductsListColumns } from './_helper';

const ListAll = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const { queryParams, pagination, updateQueryParam } = useFilterProduct();
    const [form] = Form.useForm<IProductParams>();
    const { mutate, isSuccess, isError } = useDeleteProduct();
    const productId = useRef<string>('');
    const categoriesAndBrandData = useGetCategoriesAndBrands();
    const dataIndex = {
        brands: 0,
        categories: 1,
    };
    const categories = categoriesAndBrandData?.[dataIndex.categories].data?.data;
    const brands = categoriesAndBrandData?.[dataIndex.brands].data?.data;

    const brandsSelectData = brands?.map((category) => ({
        label: category.name,
        value: category._id,
    }));
    const categoriesSelectData = categories?.map((category) => ({
        label: category.name,
        value: category._id,
    }));

    const { data } = useGetProducts(queryParams, pagination);
    const productData = data?.data.products;
    const totalDocs = data?.data.totalDocs;

    const showModal = (id: string) => {
        setIsModalOpen(true);
        productId.current = id;
    };

    const columns = ProductsListColumns(showModal, categories);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        productId.current = '';
        setConfirmLoading(false);
    };
    const handleDeleteProduct = () => {
        setConfirmLoading(true);
        mutate(productId.current);
    };

    const onChange: TableProps<IProductItem>['onChange'] = (paginations) => {
        console.log(queryParams);
        updateQueryParam(queryParams, paginations.current || 1);
    };

    // @ search change
    const handleSearch: InputProps['onPressEnter'] = (e) => {
        const search = e.currentTarget.value;
        updateQueryParam({ search, categoryId: '' }, pagination.page);
    };
    // @ submit form
    const onSubmit: FormProps['onFinish'] = (values: IProductParams) => {
        const { search, categoryId } = values;
        console.log(search, categoryId);
        updateQueryParam({ search, categoryId }, pagination.page);
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
            <div className='mt-5 flex items-center justify-end'>
                <Link to='/admin/products/create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Add product
                    </Button>
                </Link>
            </div>
            <div className='bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
                <Form className='my-3' form={form} onFinish={onSubmit}>
                    <div className='grid grid-cols-2 gap-4 xl:grid-cols-[3fr,3fr,3fr,2fr]'>
                        <Form.Item name='search'>
                            <Search placeholder='Search Product name, Product SKU' onPressEnter={handleSearch} />
                        </Form.Item>
                        <Form.Item name='categoryId'>
                            <Select placeholder='Search by Category' options={categoriesSelectData}></Select>
                        </Form.Item>
                        <Form.Item name='brandId'>
                            <Select placeholder='Search by Brand' options={brandsSelectData}></Select>
                        </Form.Item>
                        <div className='grid grid-cols-2 gap-4'>
                            <Button htmlType='submit' type='primary'>
                                Apply
                            </Button>
                            <Button
                                htmlType='reset'
                                type='default'
                                onClick={() => updateQueryParam({ search: '', categoryId: '' }, pagination.page)}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </Form>
                <Table
                    size='large'
                    rowKey={(record) => record._id}
                    columns={columns}
                    loading={!productData}
                    onChange={onChange}
                    dataSource={productData}
                    pagination={{
                        pageSize: 10,
                        total: totalDocs,
                        current: pagination.page,
                    }}
                />
            </div>
            <ModalDelete
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                confirmLoading={confirmLoading}
                handleDeleteProduct={handleDeleteProduct}
            />
        </>
    );
};

export default ListAll;

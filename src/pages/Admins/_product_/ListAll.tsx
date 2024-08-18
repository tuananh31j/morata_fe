/* eslint-disable @typescript-eslint/no-shadow */
import { PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Pagination, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import useGetProducts from '~/hooks/products/Queries/useGetProductsForAdmin';
import { IProductItem } from '~/types/Product';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import _ from 'lodash';
import { ProductsListColumns } from './Helper/tableList';
import { ColumnsType } from 'antd/es/table';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';

const ListAll = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps } = useTable();
    const [brands, categories] = useGetCategoriesAndBrands();
    const { data } = useGetProducts(query);

    const brandFilter = brands?.data?.data?.map((brand) => ({
        text: brand.name,
        value: brand._id,
    }));
    const categoryFilter = categories?.data?.data?.map((category) => ({
        text: category.name,
        value: category._id,
    }));

    const productData = data?.data.products;
    const totalDocs = data?.data.totalDocs;

    const columns = ProductsListColumns({
        brandFilter,
        categoryFilter,
        query,
        getColumnSearchProps,
    }) as ColumnsType<IProductItem>;

    const onChange: TableProps<IProductItem>['onChange'] = (_, filters, sorter, extra) => {
        onFilter(filters, sorter);
    };

    return (
        <WrapperPageAdmin
            title='Quản lý sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <Table
                bordered
                rowKey={(record) => record._id}
                columns={columns}
                onChange={onChange}
                dataSource={productData}
                pagination={false}
            />
            <Space className='m-5 flex w-full justify-end'>
                <Pagination
                    onChange={onSelectPaginateChange}
                    pageSize={10}
                    total={totalDocs}
                    current={Number(query.page || 1)}
                />
            </Space>
        </WrapperPageAdmin>
    );
};

export default ListAll;

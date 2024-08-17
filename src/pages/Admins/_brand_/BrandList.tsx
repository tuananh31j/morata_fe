import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import useGetAllBrands from '~/hooks/brands/useGetAllBrands';
import { IBrand } from '~/types/Brand';

type DataType = IBrand & {
    key: string;
};
const BrandList = () => {
    const { query, updateQueryParam } = useFilter();
    const limit = 10;
    const { data: brandsRes } = useGetAllBrands();
    const brands = brandsRes?.data;

    const brandsListWithAttributes = brands?.map((brand) => ({
        ...brand,
        key: brand._id,
    })) as DataType[];
    // @event
    const onChange: TableProps<DataType>['onChange'] = (paginations) => {
        updateQueryParam({ ...query, page: String(paginations.current || 1) });
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật thương hiệu'>
                        <Link to={`${ADMIN_ROUTES.BRAND_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Quản lý thương hiệu</h1>

                <Link to={ADMIN_ROUTES.BRAND_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới thương hiệu
                    </Button>
                </Link>
            </div>

            <div className='transi bg-gray-50 mt-5 rounded-2xl transition-all duration-500 '>
                {brandsListWithAttributes && (
                    <Table
                        size='large'
                        columns={columns}
                        dataSource={brandsListWithAttributes}
                        onChange={onChange}
                        pagination={{
                            current: Number(query.page || 1),
                            pageSize: limit,
                            total: brandsListWithAttributes.length,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default BrandList;

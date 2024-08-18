import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';
import { ICategory } from '~/types/Category';

const CategoryList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable();
    const { data: categories } = useGetCategories(query);
    const categoryList = categories?.data.categories;
    const totalDocs = categories?.data.totalDocs;

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '30%',
        },
        {
            title: 'Attributes',
            dataIndex: 'attributeNames',
            key: 'attributeNames',
            width: '70%',
            render: (_, record) => (
                <>
                    {record.attributeIds?.map((att) => {
                        return (
                            <Tag color={'geekblue'} className='my-2' key={att._id}>
                                {att.name.toUpperCase()}
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
                    <Tooltip title='Cập nhật danh mục'>
                        <Link to={`${ADMIN_ROUTES.CATEGORIES_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const onChange: TableProps<ICategory>['onChange'] = (_, filters, sort) => {
        onFilter(filters, sort);
    };

    return (
        <WrapperPageAdmin
            title='Quản lý danh mục'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới danh mục
                    </Button>
                </Link>
            }
        >
            <Table onChange={onChange} columns={columns} dataSource={categoryList} pagination={false} />
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

export default CategoryList;

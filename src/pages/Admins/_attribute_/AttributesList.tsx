import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { AttributeType } from '~/constants/enum';
import { ADMIN_ROUTES } from '~/constants/router';
import useFilter from '~/hooks/_common/useFilter';
import useGetAllAtributes from '~/hooks/attributes/Queries/useGetAllAttributes';
import { IAttribute } from '~/types/Product';

type DataType = IAttribute & {
    key: string;
};
const CategoryList = () => {
    const { query, updateQueryParam } = useFilter();
    const limit = 10;
    const { data: attributeRes } = useGetAllAtributes(query);
    const attributesList = attributeRes?.data.attributes;

    const categoryListWithAttributes = attributesList?.map((att) => ({
        ...att,
        key: att._id,
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
            title: 'Ràng buộc',
            render: (_, record) => (
                <>
                    {record.isVariant && <Tag color={'geekblue'}>Variant & Require</Tag>}{' '}
                    {record.isRequired && !record.isVariant && <Tag color={'red'}>Require</Tag>}
                    {!record.isRequired && !record.isVariant && <Tag color={'#7a7d86'}>Không bắt buộc</Tag>}
                </>
            ),
        },
        {
            title: 'Giá trị',
            dataIndex: 'type',
            key: 'value',
            render: (_, record) => (
                <>
                    {record.type === AttributeType.Options &&
                        record?.values?.map((att, i) => {
                            return (
                                <Tag color={'geekblue'} key={i}>
                                    {att}
                                </Tag>
                            );
                        })}
                    {record.type === AttributeType.Manual && <Tag color={'green'}>Nhập thủ công</Tag>}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật danh mục'>
                        <Link to={`${ADMIN_ROUTES.ATTRIBUTES_EDIT}/${record._id}`} className='text-blue-500'>
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
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Quản lý thuộc tính</h1>

                <Link to={ADMIN_ROUTES.ATTRIBUTES_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới thuộc tính
                    </Button>
                </Link>
            </div>

            <div className='transi bg-gray-50 mt-5 rounded-2xl transition-all duration-500 '>
                {attributesList && (
                    <Table
                        size='large'
                        columns={columns}
                        dataSource={categoryListWithAttributes}
                        onChange={onChange}
                        pagination={{
                            current: Number(query.page || 1),
                            pageSize: limit,
                            total: attributeRes.data.totalDocs,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default CategoryList;

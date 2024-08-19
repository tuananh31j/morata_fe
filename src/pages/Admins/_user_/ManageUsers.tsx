/* eslint-disable @typescript-eslint/no-shadow */
import { EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Image, Space, Tooltip } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import StaticImages from '~/assets';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import { ROLE } from '~/constants/enum';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllUsers from '~/hooks/users/Queries/useGetAllUsers';
import { IUser } from '~/utils/api/apiHelper';
import { cn } from '~/utils';
import useTable from '~/hooks/_common/useTable';
import TableAdmin from '../_common/TableAdmin';

const ManageUsers = () => {
    const { query, onSelectPaginateChange, onFilter, getColumnSearchProps } = useTable();
    const { data } = useGetAllUsers(query);
    const users = data?.data?.users;
    const totalDocs = data?.data?.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    <Image src={avatar || StaticImages.userImageDf} width={100} height={100} />
                </div>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            filteredValue: [query.role],
            filters: [
                { text: 'Quản trị', value: ROLE.ADMIN },
                { text: 'Người dùng', value: ROLE.USER },
            ],
            render: (role) => (
                <span className={cn({ ['text-red']: role === ROLE.ADMIN, ['text-green-500']: role === ROLE.USER })}>
                    {role === ROLE.ADMIN && 'Quản trị'} {role === ROLE.USER && 'Người dùng'}
                </span>
            ),
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Update'>
                        <Link to={`${ADMIN_ROUTES.USERS_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin title='Quản lý người dùng'>
            <TableAdmin<IUser>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={users}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ManageUsers;

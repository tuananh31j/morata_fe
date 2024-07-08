import { Table } from 'antd';
import { columns } from './_helper';
import WrapperList from '~/components/_common/WrapperList';

const TopUsers = ({ title }: { title: string }) => {
    const dataFake = [
        {
            rank: 1,
            name: 'Huan',
            avt: '',
            totalOrders: 3,
            purchases: '5,768',
        },
        {
            rank: 2,
            name: 'Quoac',
            avt: '',
            totalOrders: 2,
            purchases: '4,635',
        },
        {
            rank: 3,
            name: 'Dat',
            avt: '',
            totalOrders: 2,
            purchases: '4,290',
        },
        {
            rank: 4,
            name: 'Haha',
            avt: '',
            totalOrders: 1,
            purchases: '3,580',
        },
        {
            rank: 5,
            name: 'Ta',
            avt: '',
            totalOrders: 3,
            purchases: '6,768',
        },
    ];
    return (
        <WrapperList lineButtonBox title={title} className=''>
            <div className='mb-12'>
                <Table rowKey={(record) => record.rank} columns={columns} dataSource={dataFake} pagination={false} />
            </div>
        </WrapperList>
    );
};

export default TopUsers;

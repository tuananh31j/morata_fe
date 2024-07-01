import TableDisplay from '../_modules/Table';
import RowUser from './RowUser';

export type IUserTop5 = {
    rank: number;
    name: string;
    avt: string;
    order: number;
    purchases: number | string;
};

const usersData: IUserTop5[] = [
    {
        rank: 1,
        name: 'Apple',
        avt: '',
        order: 3,
        purchases: '5,768',
    },
    {
        rank: 2,
        name: 'Samsung',
        avt: '',
        order: 2,
        purchases: '4,635',
    },
    {
        rank: 3,
        name: 'MSI',
        avt: '',
        order: 2,
        purchases: '4,290',
    },
    {
        rank: 4,
        name: 'Lenovo',
        avt: '',
        order: 1,
        purchases: '3,580',
    },
    {
        rank: 5,
        name: 'HP',
        avt: '',
        order: 3,
        purchases: '6,768',
    },
];
const headListUser = ['rank', 'name', 'avt', 'order', 'purchases'];

const TopUsers = ({ title }: { title: string }) => {
    return (
        <TableDisplay title={title} headsList={headListUser}>
            {usersData.map((user, key) => (
                <RowUser isTop1={key === 0} user={user} key={key} />
            ))}
        </TableDisplay>
    );
};

export default TopUsers;

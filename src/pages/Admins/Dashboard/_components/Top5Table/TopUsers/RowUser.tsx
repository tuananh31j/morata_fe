import { FC } from 'react';
import ColItem from '../_modules/ColItem';
import WrapperRow from '../_modules/WrapperRow';
import StaticImages from '~/assets';

const UserTop1 = ({ isTop1, avt }: { avt: string; isTop1?: boolean }) => {
    return (
        <div className='avatar-list'>
            <div className='avatar avatar-large'>
                <img src={avt || StaticImages.userImageDf} alt='Usuário' className='avatar-image' />
                {isTop1 && <img src={StaticImages.frameUser} alt='Moldura' className='avatar-frame anim-spin' />}
            </div>
        </div>
    );
};

type IRowUser = {
    user: {
        rank: number;
        name: string;
        avt: string;
        order: number;
        purchases: number | string;
    };
    isTop1?: boolean;
};
const RowUser: FC<IRowUser> = ({ user, isTop1 }) => {
    return (
        <WrapperRow>
            <ColItem classic>Top {user.rank}</ColItem>
            <ColItem classic>{user.name}</ColItem>
            <ColItem classic>
                <UserTop1 avt={user.avt} isTop1={isTop1} />
            </ColItem>
            <ColItem classic>{user.order}</ColItem>
            <ColItem classic>${user.purchases}</ColItem>
        </WrapperRow>
    );
};
export default RowUser;

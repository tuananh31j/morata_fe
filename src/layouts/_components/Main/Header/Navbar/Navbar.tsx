import { IMenu } from '~/types/Category';
import MenuItem from './MenuItem';
import { Skeleton } from 'antd';

const Navbar = ({ data }: { data: IMenu[] }) => {
    return (
        <div className='flex items-center gap-5'>
            {data && data.map((item, i) => <MenuItem name={item.name} id={item._id} key={i} />)}
            {data.length === 0 && (
                <>
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                    <Skeleton.Button active={true} size={'large'} shape={'default'} />
                </>
            )}
        </div>
    );
};

export default Navbar;

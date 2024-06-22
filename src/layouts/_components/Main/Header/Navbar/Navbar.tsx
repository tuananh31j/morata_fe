import { ICategory } from '~/types/Category';
import MenuItem from './MenuItem';

const Navbar = ({ data }: { data: ICategory[] }) => {
    return (
        <div className='flex items-center gap-5'>
            {data && data.map((item, i) => <MenuItem name={item.name} id={item._id} key={i} />)}
        </div>
    );
};

export default Navbar;

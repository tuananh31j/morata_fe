import useGetCategories from '~/hooks/Queries/useGetCategories';
import MenuItem from './MenuItem';

const Navbar = () => {
    const { data } = useGetCategories();
    return (
        <div className='flex items-center gap-5'>
            {data && data.data && data.data.map((item, i) => <MenuItem name={item.name} id={item._id} key={i} />)}
        </div>
    );
};

export default Navbar;

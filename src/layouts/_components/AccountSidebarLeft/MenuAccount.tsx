import useLogout from '~/hooks/Mutations/Auth/useLogout';
import MenuItem from './MenuItem';

const menus = [
    { name: 'Personal information', path: 'profile' },
    { name: 'My orders', path: 'my-orders' },
    { name: 'My address', path: 'my-address' },
];

const MenuAccount = () => {
    const handleLogout = useLogout();
    return (
        <div className=' flex max-h-[100vh] flex-col justify-items-center'>
            <div className='m-4 flex flex-col justify-center gap-y-3'>
                {menus.map((item, i) => (
                    <MenuItem name={item.name} key={i} path={item.path} />
                ))}
                <button
                    onClick={handleLogout}
                    className='mt-5 border p-2 transition-transform duration-200 ease-in-out hover:border-[#16bcdc] active:-translate-y-3'
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default MenuAccount;

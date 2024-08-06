import useLogout from '~/hooks/auth/useLogout';
import MenuItem from './MenuItem';
import { ADMIN_ROUTES, MAIN_ROUTES } from '~/constants/router';

const menus = [
    { name: 'My Profile', path: MAIN_ROUTES.PROFILE },
    { name: 'My Orders', path: MAIN_ROUTES.MY_ORDERS },
    { name: 'My Address', path: MAIN_ROUTES.MY_ADDRESS },
];

const MenuAccount = ({ isAdmin }: { isAdmin: boolean }) => {
    const handleLogout = useLogout();
    return (
        <div className=' flex max-h-[100vh] flex-col justify-items-center'>
            <div className='m-4 flex flex-col justify-center gap-y-3'>
                {menus.map((item, i) => (
                    <MenuItem name={item.name} key={i} path={item.path} />
                ))}
                {isAdmin && <MenuItem name='Admin Dashboard' path={ADMIN_ROUTES.DASHBOARD} />}

                <button
                    onClick={handleLogout}
                    className='mt-5 border p-2 transition-transform duration-200 ease-in-out hover:border-[#16bcdc] active:-translate-y-3'
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default MenuAccount;

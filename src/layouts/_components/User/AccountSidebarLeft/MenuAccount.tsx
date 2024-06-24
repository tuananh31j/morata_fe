import useLogout from '~/hooks/Mutations/Auth/useLogout';
import MenuItem from './MenuItem';
import { MAIN_ROUTES } from '~/constants/router';

const menus = [
    { name: 'Personal information', path: MAIN_ROUTES.PROFILE },
    { name: 'My orders', path: MAIN_ROUTES.MY_ORDERS },
    { name: 'My address', path: MAIN_ROUTES.MY_ADDRESS },
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
                    Log out
                </button>
            </div>
        </div>
    );
};

export default MenuAccount;

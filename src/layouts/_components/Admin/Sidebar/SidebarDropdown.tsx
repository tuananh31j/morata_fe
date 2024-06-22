/* eslint-disable no-shadow */
import { Link, useLocation } from 'react-router-dom';
import { IMenuItem } from './menuGroups';

const SidebarDropdown = ({ item }: { item: Omit<IMenuItem, 'children' | 'icon'>[] }) => {
    const location = useLocation();
    const path = location.pathname.split('/').pop();

    return (
        <>
            <ul className='mb-5.5 mt-4 flex flex-col gap-2.5 pl-6'>
                {item.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.route}
                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                path === item.route || location.pathname === item.route ? 'text-white' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SidebarDropdown;

import useLocalStorage from '~/hooks/_common/useLocalStorage';
import { CloseOutlined } from '@ant-design/icons';
import { menuGroups } from './_options';
import SidebarItem from './SidebarItem';
import ClickOutside from '~/components/_common/ClickOutside';
import WelcomeBanner from '~/components/WelcomeBanner';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const [pageName, setPageName] = useLocalStorage('selectedMenu', 'dashboard');

    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className='flex items-center justify-between gap-2 px-6 '>
                    {/* <Link to='/'>
                        <img
                            className='w-full rounded-md border border-transparent'
                            height={32}
                            src={StaticImages.logo}
                            alt='Logo'
                        />
                    </Link> */}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls='sidebar'
                        className='absolute right-4 top-4 z-9999 lg:hidden'
                    >
                        <CloseOutlined className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary' />
                    </button>
                </div>
                <WelcomeBanner />
                {/* <!-- SIDEBAR HEADER --> */}

                <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className='mt-3 px-4 py-4 '>
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>{group.name}</h3>

                                <ul className='mb-6 flex flex-col gap-1.5'>
                                    {group.menuItems.map((menuItem, menuIndex) => (
                                        <SidebarItem
                                            key={menuIndex}
                                            item={menuItem}
                                            pageName={pageName}
                                            setPageName={setPageName}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;

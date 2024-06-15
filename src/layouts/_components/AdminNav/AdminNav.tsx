import { BellOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Input, MenuProps } from 'antd';

const AdminNavbar = () => {
    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: '2nd menu item',
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <>
            <nav className='duration-250 dark:bg-slate-850/8 fixed left-0 right-0 top-0 z-50 mx-6 mt-[0.313rem] flex flex-wrap items-center justify-between rounded-2xl border bg-[#DAE2FF] px-0 py-2 shadow-none ring-0 transition-all ease-in lg:flex-nowrap lg:justify-start xl:left-[21%]'>
                <div className='flex-wrap-inherit mx-auto flex w-full items-center justify-between  px-4 py-2'>
                    <nav>
                        <Breadcrumb items={[{ title: 'Pages' }, { title: 'Dashboard' }]} className='text-sm' />
                        <h6 className='mb-0 mt-1 text-base font-bold capitalize text-slate-600 '>Dashboard</h6>
                    </nav>
                    {/* css grow */}
                    <div className='mt-2 flex  items-center sm:mr-6 sm:mt-0 md:mr-0 lg:flex lg:basis-auto'>
                        <div className='flex items-center md:ml-auto md:pr-4'>
                            <form>
                                <div className=' flex items-center justify-center rounded-lg bg-white px-2'>
                                    <SearchOutlined />
                                    <Input
                                        placeholder='Type Here...'
                                        size='large'
                                        className=' border-none border-transparent bg-white text-sm text-gray-500 shadow-none outline-none '
                                    />
                                </div>
                            </form>
                        </div>
                        <ul className='md-max:w-full mb-0 ml-2 flex list-none flex-row justify-end pl-0 md:ml-0'>
                            <li className='flex items-center'>
                                <UserOutlined style={{ fontSize: '1.125rem' }} className='cursor-pointer' />
                            </li>
                            <li className='flex items-center pl-4'>
                                <div className='ease-nav-brand block p-0 text-sm transition-all'>
                                    <BellOutlined style={{ fontSize: '1.125rem' }} className='cursor-pointer' />
                                </div>
                            </li>

                            <li className='relative flex items-center px-4'>
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <div onClick={(e) => e.preventDefault()}>
                                        <SettingOutlined style={{ fontSize: '1.125rem' }} className='cursor-pointer' />
                                    </div>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminNavbar;

import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, DrawerProps, Dropdown, Menu, MenuProps, Space, message } from 'antd';
import { useState } from 'react';
import { CaretIcon, DiscountIcon, SearchIcon } from '~/components/_common/Icons';
import UserToolbar from './UserToolbar';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

// navbar-mobi
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key?: React.Key | null, children?: MenuItem[], type?: 'group'): MenuItem {
    return {
        key,
        children,
        label,
        type,
    } as MenuItem;
}
const itemss: MenuItem[] = [
    getItem('HOME', 'sub1', [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('SHOP', 'sub2', [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('PRODUCT', 'sub3', [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('PAGE', 'sub4', [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];
// end

const Header = () => {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    // categroy
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors'];

    // mobi
    const [open, setOpen] = useState(false);
    const [placement, _] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className='bg-blue-900 '>
            <div className='mx-3 lg:mx-4'>
                {/* thongtin-header-laptop */}
                <div className='hidden justify-between border-b border-[#3b50a3] py-3 lg:flex '>
                    <div className='justify-between gap-5 lg:flex'>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <button onClick={(e) => e.preventDefault()}>
                                        <Space style={{ color: 'white' }}>
                                            <img
                                                loading='lazy'
                                                alt='EN'
                                                className='mr-2 inline-block h-4 w-4'
                                                src='//demo-morata.myshopify.com/cdn/shop/t/3/assets/flag_en.png?v=14076981825125011091700037390'
                                            />
                                            English
                                            <div className='border-r border-[#3b50a3] pr-5'>
                                                <CaretIcon />
                                            </div>
                                        </Space>
                                    </button>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <button onClick={(e) => e.preventDefault()}>
                                        <Space style={{ color: 'white' }}>
                                            United States(USD $)
                                            <div className='border-r border-[#3b50a3] pr-5'>
                                                <CaretIcon />
                                            </div>
                                        </Space>
                                    </button>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <h3 className='inline-flex w-full justify-center  bg-blue-900 text-sm  font-medium text-white shadow-sm '>
                                Need Help? +001 123 456 789
                            </h3>
                        </div>
                    </div>
                    <div className='justify-between gap-5 lg:flex'>
                        <div className='lg: inline-block text-left'>
                            <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
                                About Us
                            </h3>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
                                Order Tracking
                            </h3>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <h3 className='inline-flex w-full justify-center   border-r border-[#3b50a3]  bg-blue-900 pr-5 text-sm font-medium text-white shadow-sm'>
                                Contact Us
                            </h3>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <h3 className='inline-flex w-full justify-center   bg-blue-900 text-sm  font-medium text-white shadow-sm '>
                                FAQs
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='flex grid-cols-[280px,0.9fr,380px] items-center justify-between gap-10 border-[#3b50a3]  bg-blue-900 pt-5 lg:grid lg:border-b lg:p-0 lg:py-5'>
                    {/* icon-menu-mobi */}
                    <div className='lg:hidden'>
                        <Space>
                            <MenuOutlined style={{ color: '#ffffff', fontSize: '24px' }} onClick={showDrawer} />
                        </Space>
                        <Drawer
                            placement={placement}
                            closable={false}
                            onClose={onClose}
                            open={open}
                            key={placement}
                            className='text-[13px]'
                        >
                            <div onClick={onClose} className='flex items-center justify-center gap-1 '>
                                <p className='font-bold'>
                                    CLOSE <CloseOutlined />
                                </p>
                            </div>
                            <p className='mt-12 flex justify-center font-bold'>WHAT ARE YOU LOOKING FOR?</p>
                            <div className='my-3 flex items-center rounded-full p-3 shadow-lg'>
                                <input
                                    type='text'
                                    placeholder='Search...'
                                    className='ml-2 flex-grow text-base outline-none'
                                />
                                <SearchIcon />
                            </div>
                            <div className='mt-8 flex items-center font-bold'>
                                <Link to='/auth/login' onClick={onClose} className='flex cursor-pointer'>
                                    <div>
                                        <UserOutlined className='mr-1 text-base' />
                                    </div>
                                    <div className=''>Login</div>
                                    <div className='mx-1'>/</div>
                                    <div className=''> Register</div>
                                </Link>
                            </div>
                            <div className='w-full -translate-x-2 '>
                                <Menu
                                    onClick={onClick}
                                    defaultOpenKeys={['sub1']}
                                    mode='inline'
                                    items={itemss}
                                    className='w-full'
                                />
                            </div>
                        </Drawer>
                    </div>

                    <div className='logo'>
                        <Link className='cursor-pointer' to={'/'}>
                            <img
                                loading='lazy'
                                src='//demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938'
                                alt=''
                                className='lg:w-[200px] '
                            />
                        </Link>
                    </div>
                    {/* ///seach-header-laptop */}
                    <form className='hidden lg:block'>
                        <div className='flex h-14 justify-center'>
                            <button
                                id='dropdown-button'
                                data-dropdown-toggle='dropdown'
                                className='z-10 inline-flex flex-shrink-0 items-center rounded-l-sm  bg-white pr-3   text-center text-sm font-medium '
                                type='button'
                            >
                                <div>
                                    <Dropdown menu={{ items, onClick }}>
                                        <button onClick={(e) => e.preventDefault()}>
                                            <Space style={{ color: 'black' }}>
                                                <h3 className='ml-4 mr-14'>All Categories</h3>
                                                <div className='border-r border-[#3b50a3] pr-5'>
                                                    <CaretIcon />
                                                </div>
                                            </Space>
                                        </button>
                                    </Dropdown>
                                </div>
                            </button>
                            <div className='relative flex w-full'>
                                <div className='relative h-10 w-full '>
                                    <input
                                        type='email'
                                        className='peer h-14 w-full  bg-white  outline outline-0 transition-all '
                                        placeholder='Search for products ...'
                                    />
                                </div>
                                <button
                                    disabled
                                    className='!absolute right-1 top-1 mr-1 select-none rounded bg-[#16bcdc] px-3 py-2'
                                    type='button'
                                >
                                    <SearchIcon className='m-1 h-5 w-5 text-white' />
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* ///icon-header-laptop */}
                    <UserToolbar />
                </div>
                {/* ---seach-mobile--- */}
                <div className='relative my-5 pb-10  lg:hidden'>
                    <div className='relative h-10 w-full'>
                        <input
                            type='email'
                            className='peer h-14 w-full  bg-white  p-4   outline outline-0 transition-all '
                            placeholder='Search for products ...'
                        />
                        <button
                            disabled
                            className='absolute right-2 top-2 select-none rounded bg-[#16bcdc] p-[10px]'
                            type='button'
                        >
                            <SearchIcon className='h-5 w-5 text-white' />
                        </button>
                    </div>
                </div>
                <div className='hidden h-20 justify-between bg-blue-900 py-5 lg:flex'>
                    {/* Header MENU bottom */}
                    <div className='flex items-center'>
                        {/* <div
                            className='flex items-center gap-3 border-r border-white pr-28 font-semibold'
                            onClick={toggleVisibility}
                        >
                            <MenuOutlined style={{ color: '#ffffff', fontSize: '16px' }} className='hidden lg:block' />
                            <button className='text-lg text-white'>Shop By Department</button>
                            {isVisible && (
                                <ul className='absolute z-20 w-[305px] translate-y-28 border border-gray-200 bg-white shadow-lg transition-all duration-1000'>
                                    {categories.map((category, index) => (
                                        <li key={index} className='px-4 py-2 hover:bg-gray-100'>
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div> */}

                        {/* Header MENU bottom items */}
                        <Navbar />
                    </div>
                    {/* <div className='flex items-center gap-5'>
                        <DiscountIcon />
                        <p className='text-white'>Sale $20 Off Your First Order.</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Header;

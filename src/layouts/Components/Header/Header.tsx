import {
    CloseOutlined,
    RightOutlined,
    HeartOutlined,
    MenuOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Drawer, DrawerProps, Dropdown, Menu, MenuProps, Space, message } from 'antd';
import { useState } from 'react';

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
//end


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
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className=' bg-blue-900'>
            <div className='mx-auto px-4 lg:container'>
                {/* thongtin-header-laptop */}
                <div className='hidden justify-between border-b border-[#3b50a3] py-3 lg:flex'>
                    <div className='justify-between gap-5 lg:flex'>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space style={{ color: 'white' }}>
                                            <img
                                                alt='EN'
                                                className='mr-2 inline-block h-4 w-4'
                                                src='//demo-morata.myshopify.com/cdn/shop/t/3/assets/flag_en.png?v=14076981825125011091700037390'
                                            />
                                            English
                                            <div className='border-r border-[#3b50a3] pr-5'>
                                                <svg
                                                    className='h-5 w-5'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    aria-hidden='true'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                        clipRule='evenodd'
                                                    />
                                                </svg>
                                            </div>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space style={{ color: 'white' }}>
                                            United States(USD $)
                                            <div className='border-r border-[#3b50a3] pr-5'>
                                                <svg
                                                    className='h-5 w-5'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    aria-hidden='true'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                        clipRule='evenodd'
                                                    />
                                                </svg>
                                            </div>
                                        </Space>
                                    </a>
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
                <div className='flex grid-cols-[280px,0.9fr,380px] items-center justify-between gap-10 border-[#3b50a3]  bg-blue-900 px-5 pt-5 lg:grid lg:border-b lg:p-0 lg:py-5'>
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
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </div>
                            <div className='mt-8 flex items-center font-bold'>
                                <div>
                                    <UserOutlined className='mr-1 text-base' />
                                </div>
                                <div className=''>Login</div>
                                <div className='mx-1'>/</div>
                                <div className=''> Register</div>
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
                        <img
                            src='//demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938'
                            alt=''
                            className='lg:w-[200px] '
                        />
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
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space style={{ color: 'black' }}>
                                                <h3 className='ml-4 mr-14'>All Categories</h3>
                                                <div className='border-r border-[#3b50a3] pr-5'>
                                                    <svg
                                                        className='h-5 w-5'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        viewBox='0 0 20 20'
                                                        fill='currentColor'
                                                        aria-hidden='true'
                                                    >
                                                        <path
                                                            fillRule='evenodd'
                                                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                            clipRule='evenodd'
                                                        />
                                                    </svg>
                                                </div>
                                            </Space>
                                        </a>
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
                                    <svg
                                        className=' m-1 h-5 w-5 text-white'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 20 20'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* ///icon-header-laptop */}
                    <div className='justify-between gap-2 lg:flex'>
                        <div className='hidden justify-between gap-2 lg:flex '>
                            <UserOutlined style={{ color: '#ffffff', fontSize: '40px' }} />
                            <div>
                                <span className='block text-gray-400 font-medium'>Login</span>
                                <span className='block text-white'>Account</span>
                            </div>
                        </div>
                        <div className='hidden justify-between gap-2 lg:flex '>
                            <HeartOutlined style={{ color: '#ffffff', fontSize: '40px' }} />
                            <div>
                                <span className='block  text-gray-400 font-medium'>Login</span>
                                <span className='block text-white'>Account</span>
                            </div>
                        </div>
                        <div className='block justify-between gap-2 lg:flex'>
                            <ShoppingCartOutlined style={{ color: '#ffffff', fontSize: '44px' }} />
                            <div className='hidden lg:block'>
                                <span className='block  text-gray-400 font-medium'>Login</span>
                                <span className='block text-white'>Account</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ---seach-mobile--- */}
                <div className='relative p-5 pb-10 lg:hidden'>
                    <div className='relative h-10 w-full'>
                        <input
                            type='email'
                            className='peer h-14 w-full  bg-white  p-4   outline outline-0 transition-all '
                            placeholder='Search for products ...'
                        />
                    </div>
                    <button
                        disabled
                        className='!absolute right-1 top-1 mr-5 mt-5 select-none rounded bg-[#16bcdc] px-3 py-3'
                        type='button'
                    >
                        <svg
                            className=' h-5 w-5 text-white'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 20'
                        >
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                            />
                        </svg>
                    </button>
                </div>
                <div className='hidden h-20 justify-between bg-blue-900 py-5 lg:flex'>
                    {/* Header MENU bottom */}
                    <div className='flex items-center'>
                      {/* Header MENU category */}
                    <div className='flex items-center gap-3 border-r border-white pr-28 font-semibold' onClick={toggleVisibility}>
                        <MenuOutlined style={{ color: '#ffffff', fontSize: '16px' }} className='hidden lg:block' />
                        <a className='text-lg text-white'>Shop By Department</a>
                        {/* đổ list catgory */}
                        {isVisible && (
                            <ul className='absolute  bg-white border border-gray-200 transition-all duration-1000 shadow-lg w-[305px] translate-y-28'>
                            {categories.map((category, index) => (
                                <li key={index} className='px-4 py-2 hover:bg-gray-100'>{category}</li>
                            ))}
                            </ul>
                        )}
                    </div>
    
                        {/* Header MENU bottom items */}
                        <div className='flex items-center gap-5 pl-5'>
                            {/* Header MENU item */}
                            <li className='group list-none font-semibold'>
                                <div className='flex items-center'>
                                    <a className=' text-white  text-[16px]  pr-2 hover:text-[#16bcdc]   group-hover:border-white '>PRODUCTS</a>
                                    <div className=' text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {/* MENU Products CONTENT */}
                                <div className='invisible absolute mt-14 grid w-[1300px] -translate-x-56 grid-cols-4 bg-white p-5 opacity-0 duration-500 group-hover:visible group-hover:mt-0 group-hover:opacity-100'>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block font-semibold text-black text-xl mb-5'>Product category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block font-semibold text-black text-xl mb-5'>Product category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block font-semibold text-black text-xl mb-5'>Product category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                    <div className='relative'>
                                        <img
                                            src='https://demo-morata.myshopify.com/cdn/shop/products/products_4_7.jpg?v=1697644644&width=3840'
                                            alt='Product Image'
                                            className='h-auto w-full object-cover'
                                        />
                                        <div className='absolute bottom-0 left-0 w-full p-4 text-center text-lg'>
                                            <button className='w-full rounded-md bg-white p-2 font-semibold text-black no-underline hover:underline'>
                                                Laptop & Ipad
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* END Products MENU CONTENT */}
                            </li>
                            {/* Header MENU item */}
                            <li className='group list-none font-semibold'>
                                <div className='flex items-center'>
                                    <a className=' text-white  text-[16px]  pr-2 hover:text-[#16bcdc]  group-hover:border-white '>SHOP</a>
                                    <div className=' text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {/* MENU Products CONTENT */}
                                <div className='invisible absolute mt-14 grid w-[1300px] -translate-x-96 grid-cols-4 gap-5 bg-white p-5 opacity-0 duration-700 group-hover:visible group-hover:mt-0 group-hover:opacity-100'>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block font-semibold text-black text-xl mb-5'>Product category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block font-semibold text-black text-xl mb-5'>Product category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                    <div className='relative'>
                                        <img
                                            src='//demo-morata.myshopify.com/cdn/shop/products/products_2_4.jpg?v=1697644616&width=3840'
                                            alt='Product Image'
                                            className='h-auto w-full object-cover'
                                        />
                                        <div className='absolute bottom-0 left-0 w-full p-4 text-center text-lg'>
                                            <button className='w-full rounded-md bg-white p-2 font-semibold text-black no-underline hover:underline'>
                                                Laptop & Ipad
                                            </button>
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <img
                                            src='https://demo-morata.myshopify.com/cdn/shop/products/products_4_7.jpg?v=1697644644&width=3840'
                                            alt='Product Image'
                                            className='h-auto w-full object-cover'
                                        />
                                        <div className='absolute bottom-0 left-0 w-full p-4 text-center text-lg'>
                                            <button className='w-full rounded-md bg-white p-2 font-semibold text-black no-underline hover:underline'>
                                                Laptop & Ipad
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* END Products MENU CONTENT */}
                            </li>
                            {/* Header MENU item */}
                            <li className='group list-none font-semibold'>
                                <div className='flex items-center'>
                                    <a className=' text-white  text-[16px]  pr-2 hover:text-[#16bcdc]  group-hover:border-white '>BLOG</a>
                                    <div className=' text-white'>
                                        <svg
                                            className='h-5 w-5'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {/* MENU Products CONTENT */}
                                <div className=' invisible  absolute mt-14 w-[250px] bg-white px-5 pb-8 pt-3 opacity-0 transition-all duration-700 group-hover:visible group-hover:mt-0 group-hover:opacity-100'>
                                    <ul className='p-2'>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li className='flex items-center'>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer w-full'>Sub category</a>
                                            <div className=' text-black  text-[16px]  pr-2 hover:text-[#16bcdc]'>
                                                <div>
                                                    <RightOutlined style={{ fontSize: '12px' }} />
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                        <li>
                                            <a className='block p-2 text-gray-500 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out hover:ml-3 cursor-pointer'>Sub category</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* END Products MENU CONTENT */}
                            </li>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M3.08737 14.2867L1.48898 12.6883C0.837006 12.0363 0.837006 10.9637 1.48898 10.3117L3.08737 8.71331C3.36078 8.4399 3.58161 7.90359 3.58161 7.52502V5.26411C3.58161 4.33872 4.33875 3.58161 5.26414 3.58161H7.52502C7.90359 3.58161 8.4399 3.36081 8.71331 3.0874L10.3117 1.48898C10.9637 0.837006 12.0363 0.837006 12.6883 1.48898L14.2867 3.0874C14.5601 3.36081 15.0964 3.58161 15.4749 3.58161H17.7359C18.6612 3.58161 19.4184 4.33872 19.4184 5.26411V7.52502C19.4184 7.90359 19.6392 8.4399 19.9126 8.71331L21.511 10.3117C22.163 10.9637 22.163 12.0363 21.511 12.6883L19.9126 14.2867C19.6392 14.5601 19.4184 15.0964 19.4184 15.475V17.7358C19.4184 18.6612 18.6612 19.4184 17.7359 19.4184H15.4749C15.0964 19.4184 14.5601 19.6392 14.2867 19.9126L12.6883 21.511C12.0363 22.163 10.9637 22.163 10.3117 21.511L8.71331 19.9126C8.4399 19.6392 7.90359 19.4184 7.52502 19.4184H5.26414C4.33875 19.4184 3.58161 18.6612 3.58161 17.7358V15.475C3.58161 15.0859 3.36078 14.5496 3.08737 14.2867Z'
                                fill='#16bcdc'
                            ></path>
                            <path
                                d='M3.08737 14.2867L1.48898 12.6883C0.837006 12.0363 0.837006 10.9637 1.48898 10.3117L3.08737 8.71331C3.36078 8.4399 3.58161 7.90359 3.58161 7.52502V5.26411C3.58161 4.33872 4.33875 3.58161 5.26414 3.58161H7.52502C7.90359 3.58161 8.4399 3.36081 8.71331 3.0874L10.3117 1.48898C10.9637 0.837006 12.0363 0.837006 12.6883 1.48898L14.2867 3.0874C14.5601 3.36081 15.0964 3.58161 15.4749 3.58161H17.7359C18.6612 3.58161 19.4184 4.33872 19.4184 5.26411V7.52502C19.4184 7.90359 19.6392 8.4399 19.9126 8.71331L21.511 10.3117C22.163 10.9637 22.163 12.0363 21.511 12.6883L19.9126 14.2867C19.6392 14.5601 19.4184 15.0964 19.4184 15.475V17.7358C19.4184 18.6612 18.6612 19.4184 17.7359 19.4184H15.4749C15.0964 19.4184 14.5601 19.6392 14.2867 19.9126L12.6883 21.511C12.0363 22.163 10.9637 22.163 10.3117 21.511L8.71331 19.9126C8.4399 19.6392 7.90359 19.4184 7.52502 19.4184H5.26414C4.33875 19.4184 3.58161 18.6612 3.58161 17.7358V15.475C3.58161 15.0859 3.36078 14.5496 3.08737 14.2867Z'
                                fill='#16bcdc'
                                stroke='#16bcdc'
                                stroke-width='1.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></path>
                            <path
                                d='M8 15.0909L15.0909 8'
                                stroke='white'
                                stroke-width='1.5'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></path>
                            <path
                                d='M14.4937 14.5H14.5043'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></path>
                            <path
                                d='M8.58442 8.59091H8.59503'
                                stroke='white'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            ></path>
                        </svg>
                        <p className='text-white'>Sale $20 Off Your First Order.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

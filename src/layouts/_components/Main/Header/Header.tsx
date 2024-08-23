import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, DrawerProps, Dropdown, Menu, MenuProps, Space } from 'antd';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SearchCard from '~/components/ProductCard/SearchCard';
import { CaretIcon, SearchIcon } from '~/components/_common/Icons';
import SearchSkeleton from '~/components/_common/skeleton/SearchSkeleton';
import { useSearchProductQuery } from '~/hooks/products/Queries/useSearchProducts';
import { setCategoryId, setFocusSearch, setSearchValue } from '~/store/slice/headerSlice';
import { RootState, useAppDispatch } from '~/store/store';
import Navbar from './Navbar';
import UserToolbar from './UserToolbar';
import { MAIN_ROUTES } from '~/constants/router';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
// navbar-mobi
interface SearchProductParams {
    search: string;
    categoryId?: string;
}
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
    const searchValue = useSelector((state: RootState) => state.headerReducer.searchValue);
    const forcusSearch = useSelector((state: RootState) => state.headerReducer.forcusSearch);
    const categoryId = useSelector((state: RootState) => state.headerReducer.categoryId);
    const disPatch = useAppDispatch();
    const location = useLocation();
    const debounceSearch = debounce((value) => {
        disPatch(setSearchValue(value.length !== 0 ? value : ''));
        disPatch(setFocusSearch(true));
    }, 500);
    const handleLeaveInput = debounce((value) => {
        disPatch(setFocusSearch(false));
    }, 100);

    // categroy
    // const [isVisible, setIsVisible] = useState(false);
    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);
    // };
    // const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports & Outdoors'];

    // mobi
    const [open, setOpen] = useState(false);
    const [placement, _] = useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const [{ data: brands }, { data: categories }] = useGetCategoriesAndBrands();
    const categoryList = categories?.data;
    const additionalCategories = [{ label: 'Tất cả danh mục', key: '' }];
    const items: MenuProps['items'] = categoryList
        ? [
              ...additionalCategories,
              ...categoryList.map((item) => ({
                  label: item.name,
                  key: item._id,
              })),
          ]
        : [];
    const queryParameters: SearchProductParams = {
        search: searchValue.length ? searchValue : '',
        categoryId: categoryId.id || undefined,
    };
    const { data: searchResult, isLoading, refetch } = useSearchProductQuery(queryParameters as SearchProductParams);

    const onClick: MenuProps['onClick'] = (key) => {
        const category = categoryList?.find((item) => item._id === key.key);
        const categoryName = category ? category.name : '';
        if (key.key === '') {
            disPatch(setFocusSearch(false));
            disPatch(setCategoryId({ id: '', name: 'Tất cả danh mục' }));
        } else if (key.key !== '') {
            disPatch(setFocusSearch(true));
            disPatch(setCategoryId({ id: key.key, name: categoryName }));
        }
    };
    const searchRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                disPatch(setFocusSearch(false));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [disPatch]);
    useEffect(() => {
        if (categoryId.id) {
            refetch();
        }
    }, [categoryId.id, refetch]);
    useEffect(() => {
        disPatch(setFocusSearch(false));
    }, [location]);
    return (
        <header className='bg-blue-900 '>
            <div className='mx-3 p-1 pt-4 lg:mx-4'>
                {/* thongtin-header-laptop */}
                {/* <div className='hidden justify-between border-b border-[#3b50a3] py-3 lg:flex '>
                    <div className='justify-between gap-5 lg:flex'>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <span onClick={(e) => e.preventDefault()}>
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
                                    </span>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='lg: inline-block text-left'>
                            <div>
                                <Dropdown menu={{ items, onClick }}>
                                    <span onClick={(e) => e.preventDefault()}>
                                        <Space style={{ color: 'white' }}>
                                            United States(USD $)
                                            <div className='border-r border-[#3b50a3] pr-5'>
                                                <CaretIcon />
                                            </div>
                                        </Space>
                                    </span>
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
                </div> */}
                <div className='flex grid-cols-[280px,0.9fr,420px] items-center justify-between gap-10 border-[#3b50a3]  bg-blue-900 pt-5 lg:grid lg:border-b lg:p-0 lg:py-5'>
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
                                    Đóng <CloseOutlined />
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
                                <Link to={MAIN_ROUTES.LOGIN} onClick={onClose} className='flex cursor-pointer'>
                                    <div>
                                        <UserOutlined className='mr-1 text-base' />
                                    </div>
                                    <div className=''>Đăng nhập</div>
                                    <div className='mx-1'>/</div>
                                    <div className=''>Đăng ký</div>
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
                    <form className='hidden bg-white lg:block' ref={searchRef}>
                        <div className='relative flex h-14 justify-center '>
                            <button
                                id='dropdown-button'
                                data-dropdown-toggle='dropdown'
                                className='z-10 inline-flex flex-shrink-0 items-center rounded-l-sm  bg-white pr-3   text-center text-sm font-medium '
                                type='button'
                            >
                                <div>
                                    <Dropdown menu={{ items, onClick }}>
                                        <span onClick={(e) => e.preventDefault()}>
                                            <Space style={{ color: 'black' }}>
                                                <h3 className='ml-4 mr-14'>{categoryId.name}</h3>
                                                <div className='border-r border-[#3b50a3] pr-5'>
                                                    <CaretIcon />
                                                </div>
                                            </Space>
                                        </span>
                                    </Dropdown>
                                </div>
                            </button>
                            <div className='flex  w-full items-center'>
                                <div className='relative flex w-full'>
                                    <input
                                        onFocus={(e) => {
                                            if (e.target.value.length > 0) {
                                                disPatch(setFocusSearch(true));
                                            }
                                        }}
                                        onChange={(e) => debounceSearch(e.target.value)}
                                        type='text'
                                        className='searchBox peer h-14 w-full  bg-white  outline outline-0 transition-all '
                                        placeholder='Tìm kiếm sản phẩm ...'
                                    />
                                    {searchValue.length > 1 && (
                                        <CloseOutlined
                                            onClick={(e) => {
                                                const closeButton = e.target as HTMLElement;
                                                const inputElement = closeButton
                                                    .closest('.relative')
                                                    ?.querySelector('input');
                                                if (inputElement) {
                                                    inputElement.value = '';
                                                }
                                                disPatch(setSearchValue(''));
                                            }}
                                            className='mr-4 transform cursor-pointer text-base transition duration-500 hover:rotate-180'
                                        />
                                    )}
                                </div>
                                <button
                                    className='mr-1 h-[90%] select-none rounded bg-[#16bcdc] px-3 py-2'
                                    type='button'
                                >
                                    <SearchIcon className='m-1 h-5 w-5 text-white' />
                                </button>
                                {forcusSearch && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: 'inherit' }}
                                        className='w- absolute right-0 top-[100%]  z-50  rounded-b-lg border-b-[5px]  border-[#1e3a8a] bg-white'
                                    >
                                        <div className='my-2 flex items-center justify-between px-4'>
                                            <span className='text-sm font-medium'>Kết quả tìm kiếm</span>
                                            <CloseOutlined
                                                onClick={handleLeaveInput}
                                                className='transform cursor-pointer text-base transition duration-500 hover:rotate-180'
                                            />
                                        </div>
                                        <div className='max-h-[33vh] overflow-scroll overflow-x-hidden'>
                                            {searchResult?.data.products.map((item, index) => (
                                                <SearchCard key={index} product={item} />
                                            ))}
                                            {isLoading && (
                                                <>
                                                    <SearchSkeleton />
                                                </>
                                            )}
                                            {!searchResult?.data.products.length && !isLoading && (
                                                <div className='flex h-[20vh] w-full items-center justify-center'>
                                                    <h3 className='font-medium'>
                                                        Không tìm thấy sản phẩm với từ khóa:{' '}
                                                        <b className='text-cyan-500'>{searchValue}</b>
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </form>

                    {/* ///icon-header-laptop */}
                    <UserToolbar />
                </div>
                {/* ---seach-mobile--- */}
                <div className='relative my-5 pb-10  lg:hidden'>
                    <div className='relative h-10 w-full'>
                        <div>
                            <input
                                onFocus={(e) => {
                                    if (e.target.value.length > 0) {
                                        disPatch(setFocusSearch(true));
                                    }
                                }}
                                onBlur={handleLeaveInput}
                                onChange={(e) => debounceSearch(e.target.value)}
                                type='email'
                                className='searchBox peer relative h-14 w-full bg-white  pl-4  outline outline-0 transition-all '
                                placeholder='Tìm kiếm sản phẩm ...'
                            />
                            {searchValue.length > 1 && (
                                <CloseOutlined
                                    onClick={(e) => {
                                        const closeButton = e.target as HTMLElement;
                                        const inputElement = closeButton.closest('.relative')?.querySelector('input');
                                        if (inputElement) {
                                            inputElement.value = '';
                                        }
                                        disPatch(setSearchValue(''));
                                    }}
                                    className='absolute right-12 top-[50%] mr-4 transform cursor-pointer text-base transition duration-500 hover:rotate-180'
                                />
                            )}
                        </div>

                        <button
                            disabled
                            className='absolute right-2 top-2 select-none rounded bg-[#16bcdc] p-[10px]'
                            type='button'
                        >
                            <SearchIcon className='h-5 w-5 text-white' />
                        </button>
                        {forcusSearch && (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: 'inherit' }}
                                className='w- absolute right-0 top-[120%]  z-50  rounded-b-lg border-b-[5px]  border-[#1e3a8a] bg-white'
                            >
                                <div className='my-2 flex items-center justify-between px-4'>
                                    <span className='text-sm font-medium'>Kết quả tìm kiếm</span>
                                    <CloseOutlined
                                        onClick={handleLeaveInput}
                                        className='transform cursor-pointer text-base transition duration-500 hover:rotate-180'
                                    />
                                </div>
                                <div className='max-h-[33vh] overflow-scroll overflow-x-hidden'>
                                    {/* {searchResult?.data.products.map((item, index) => (
                                        <SearchCard key={index} product={item} />
                                    ))} */}
                                    {isLoading && (
                                        <>
                                            <SearchSkeleton />
                                        </>
                                    )}
                                    {!searchResult?.data.products.length && !isLoading && (
                                        <div className='flex h-[20vh] w-full items-center justify-center'>
                                            <h3 className='font-medium'>
                                                Không tìm thấy sản phẩm với từ khóa:{' '}
                                                <b className='text-cyan-500'>{searchValue}</b>
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
                <div className='hidden h-20 justify-between bg-blue-900 py-5 lg:block'>
                    {/* Header MENU bottom */}
                    <Navbar categories={categories ? categories.data : []} brands={brands ? brands.data : []} />
                </div>
            </div>
        </header>
    );
};

export default Header;

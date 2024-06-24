import {
    AppstoreOutlined,
    AreaChartOutlined,
    ProductOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <>
            <aside className='ease-nav-brand fixed inset-y-0 z-50 my-4 block w-full max-w-64 -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-xl transition-transform duration-200 xl:left-0 xl:ml-6 xl:translate-x-0 dark:bg-[#111c44] dark:shadow-none'>
                <div className='h-[4.75rem]'>
                    <i className='fas fa-times absolute right-0 top-0 cursor-pointer p-4 text-slate-400 opacity-50 xl:hidden dark:text-white'></i>
                    <Link
                        className='m-0 block whitespace-nowrap px-8 py-6 text-sm text-slate-700 dark:text-white'
                        to='/admin'
                    >
                        {/* <img
                          src='./assets/img/logo-ct-dark.png'
                          className='ease-nav-brand inline h-full max-h-8 max-w-full transition-all duration-200 dark:hidden'
                          alt='main_logo'
                      />
                      <img
                          src='./assets/img/logo-ct.png'
                          className='ease-nav-brand hidden h-full max-h-8 max-w-full transition-all duration-200 dark:inline'
                          alt='main_logo'
                      /> */}
                        <h3 className='ease-nav-brand ml-1 font-semibold transition-all duration-200 dark:opacity-80'>
                            Morata Dashboard
                        </h3>
                    </Link>
                </div>

                <hr className='mt-0 h-[0.025rem] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent' />

                <div className='block h-[300px] max-h-screen w-auto grow basis-full items-center overflow-auto pb-[200px]'>
                    <ul className='mb-0 flex flex-col pl-0'>
                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/admin/dashboard'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <AppstoreOutlined className='text-[#5E72E4]' style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/admin/products/list'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <ProductOutlined className='text-[#FFC107]' style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>
                                    Manage products
                                </span>
                            </Link>
                        </li>
                        {/* <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <ShoppingCartOutlined className='text-[#2DCE89]' style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>
                                    Manage cart
                                </span>
                            </Link>
                        </li> */}

                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <ShoppingOutlined className='text-[#2DCE89]' style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>
                                    Manage orders
                                </span>
                            </Link>
                        </li>
                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/admin/user'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <UserOutlined style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>
                                    Manage users
                                </span>
                            </Link>
                        </li>
                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm font-semibold text-slate-700 transition-colors hover:bg-[#EAEDFC] dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/'
                            >
                                <div className='mr-1 flex  items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <AreaChartOutlined className='text-[#FD7E14]' style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>Stats</span>
                            </Link>
                        </li>

                        <li className='mb-2 mt-4 w-full'>
                            <h6 className='ml-2 pl-6 text-xs font-bold uppercase leading-tight opacity-60 dark:text-white'>
                                Account pages
                            </h6>
                        </li>
                        <li className='mt-[0.125rem] w-full'>
                            <Link
                                className='ease-nav-brand mx-2 my-0 flex items-center whitespace-nowrap rounded-lg px-4 py-[0.625rem] text-sm transition-colors hover:bg-[#EAEDFC]  dark:text-white dark:opacity-80 dark:hover:bg-[#192555]'
                                to='/'
                            >
                                <div className='mr-1 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-[0.625rem]'>
                                    <UserOutlined style={{ fontSize: '1.125rem' }} />
                                </div>
                                <span className='ease pointer-events-none ml-1 opacity-100 duration-300'>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;

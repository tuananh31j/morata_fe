import { NavLink, Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <>
            <div className=' mx-auto mb-[105px] flex  max-w-[1668px] '>
                <div className='flex h-[616px] w-full items-center justify-center rounded-[15px] bg-white shadow-lg'>
                    <div className='hidden w-full select-none flex-col items-center px-[5%] xl:flex'>
                        <div className='relative'>
                            <img src='https://pngimg.com/d/laptop_PNG101814.png' loading='lazy' width={550} alt='' />
                            <img
                                className=' absolute left-[32%] top-[28%] px-2 py-5 '
                                src='https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938'
                                loading='lazy'
                                alt=''
                            />
                        </div>
                        <h3 className='text-[28px] font-semibold text-[#1e3a8a] xl:text-2xl'>
                            Unleash Your Potential With Our Powerful Laptops
                        </h3>
                    </div>
                    <div className='h-full w-full rounded-[15px] bg-white'>
                        <div className='flex justify-between  px-5 py-5'>
                            <NavLink
                                to='login'
                                className={({ isActive }) => {
                                    const classActive = isActive ? 'border-cyan-500' : 'border-[#7777]';
                                    return `w-full border-b-4 pb-[15px] font-medium duration-500 ${classActive}`;
                                }}
                            >
                                LOGIN
                            </NavLink>
                            <NavLink
                                to='register'
                                className={({ isActive }) => {
                                    const classActive = isActive ? 'border-cyan-500' : 'border-[#7777]';
                                    return `w-full border-b-4 pb-[15px] font-medium duration-500 ${classActive}`;
                                }}
                            >
                                REGISTER
                            </NavLink>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;

import { NavLink, Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <>
            <div className='mx-auto mb-[85px] mt-[25px] flex  max-w-[1668px] '>
                <div className='flex min-h-[616px] w-full items-center justify-center rounded-[15px] bg-white shadow-lg'>
                    <div className='hidden w-full select-none flex-col items-center  md:flex'>
                        <div className='relative'>
                            <img src='https://pngimg.com/d/laptop_PNG101814.png' loading='lazy' width={550} alt='' />
                            <img
                                className=' absolute left-[30%] top-[30%] w-[180px] lg:w-[200px] xl:w-[250px]'
                                src='https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938'
                                loading='lazy'
                                alt=''
                            />
                        </div>
                        <h3 className=' font-semibold text-[#1e3a8a] xl:text-xl'>
                            Delicious, nutritious, cheap, good quality
                        </h3>
                    </div>
                    <div className=' h-full w-full rounded-[15px] bg-white sm:w-[70%] lg:mr-[55px] xl:w-[50%]'>
                        <div className='flex justify-between px-5 pt-5'>
                            <NavLink
                                to='login'
                                className={({ isActive }) => {
                                    const classActive = isActive ? 'border-[#1e3a8a]' : 'border-[#fff]';
                                    return `flex w-full justify-center border-b-4 pb-[15px] font-medium duration-500 ${classActive}`;
                                }}
                            >
                                Sign In
                            </NavLink>
                            <NavLink
                                to='register'
                                className={({ isActive }) => {
                                    const classActive = isActive ? 'border-[#1e3a8a]' : 'border-[#fff]';
                                    return `flex w-full justify-center border-b-4 pb-[15px] font-medium duration-500 ${classActive}`;
                                }}
                            >
                                Sign Up
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

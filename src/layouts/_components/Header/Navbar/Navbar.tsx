import MenuItem from './MenuItem';

const Navbar = () => {
    return (
        <div className='flex items-center gap-5 pl-5'>
            <MenuItem />
            <MenuItem />
            <MenuItem />
            {/* <li className='group list-none font-semibold'>
                <div className='flex items-center'>
                    <a className=' pr-2  text-[16px]  text-white hover:text-[#16bcdc]  group-hover:border-white '>
                        BLOG
                    </a>
                    <div className=' text-white'>
                        <CaretIcon />
                    </div>
                </div>
                <div className=' invisible  absolute mt-14 w-[250px] bg-white px-5 pb-8 pt-3 opacity-0 transition-all duration-700 group-hover:visible group-hover:mt-0 group-hover:opacity-100'>
                    <ul className='p-2'>
                        <li>
                            <a className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'>
                                Sub category
                            </a>
                        </li>
                        <li className='flex items-center'>
                            <a className='block w-full cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'>
                                Sub category
                            </a>
                            <div className=' pr-2  text-[16px]  text-black hover:text-[#16bcdc]'>
                                <div>
                                    <RightOutlined style={{ fontSize: '12px' }} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <a className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'>
                                Sub category
                            </a>
                        </li>
                        <li>
                            <a className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'>
                                Sub category
                            </a>
                        </li>
                    </ul>
                </div>
            </li> */}
        </div>
    );
};

export default Navbar;

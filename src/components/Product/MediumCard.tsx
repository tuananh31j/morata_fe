import mainImage from '../../assets/images/products_5_1.webp';
import secondImage from '../../assets/images/products_5_2.webp';
import { Link } from 'react-router-dom';
import RatingDisplay from '../RatingDisplay';
import ProductActions from '../ProductActions';
import { useState } from 'react';
const MediumCard = () => {
    const [isActiveProductActions, setIsActiveProductActions] = useState<boolean>(false);
    const handleSetDateActive = () => {
        setIsActiveProductActions(!isActiveProductActions);
    };
    return (
        <div className='relative rounded-2xl bg-white p-6 md:p-5'>
            <div className='sm:grid sm:grid-cols-2'>
                <div
                    className='group relative'
                    data-active={isActiveProductActions ? 'card' : ''}
                    onMouseEnter={handleSetDateActive}
                    onMouseLeave={handleSetDateActive}
                >
                    <Link to={`/`} className='block w-full overflow-hidden'>
                        <img
                            src={secondImage}
                            alt=''
                            className='absolute bottom-0 left-0 right-0 top-0 w-full scale-100 select-none transition-transform duration-500 ease-linear hover:scale-105 md:w-56'
                        />
                        <img
                            src={mainImage}
                            alt=''
                            className='relative z-10  w-full select-none opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                        />
                    </Link>
                    <ProductActions />
                </div>
                <div className='mt-3'>
                    <h4 className='line-clamp-2 cursor-default text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                        Apple iPhone 11 Pro 256GB Space Gray {'-'} Unlocked
                    </h4>
                    <div className='my-2 mb-3 flex flex-wrap items-end gap-1 sm:mb-2'>
                        <RatingDisplay rating={4} reviews={2} />
                    </div>
                    <div className='mb-3 flex gap-x-2'>
                        <span className='text-base font-semibold leading-5 text-red-600'>$21000</span>
                        <del className=' text-base font-semibold leading-5 text-gray-400'>$23000</del>
                    </div>
                    <ul className='mb-5'>
                        <li>
                            <a
                                href='#'
                                className="relative line-clamp-1 select-none pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                            >
                                Screen Size 10.9 inch
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                            >
                                Operating System iOS 14.0
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']"
                            >
                                Product Length 9.74 inch
                            </a>
                        </li>
                    </ul>
                    <div className='h-2 w-full rounded-lg bg-gray-200'>
                        <div className={`h-full w-[80%] rounded-lg bg-[#cc1414]`}></div>
                    </div>
                    <div className='text-sx mb-6 leading-8'>
                        Sold:
                        <span className='mx-1 font-semibold'>85/100</span>
                        products
                    </div>
                    <button className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className='absolute left-[20px] top-[20px] z-10 inline-block select-none rounded-sm bg-lime-600 px-4 text-sm leading-6 text-white'>
                -5%
            </div>
        </div>
    );
};

export default MediumCard;

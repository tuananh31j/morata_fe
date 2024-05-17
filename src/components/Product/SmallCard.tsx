import mainImage from '../../assets/images/products_5_1.webp';
import secondImage from '../../assets/images/products_5_2.webp';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RatingDisplay from '../RatingDisplay';
import ProductActions from '../ProductActions';

const SmallCard = () => {
    const [isActiveProductActions, setIsActiveProductActions] = useState<boolean>(false);
    const handleSetDateActive = () => {
        setIsActiveProductActions(!isActiveProductActions);
    };
    return (
        <div className='rounded-xl bg-white p-5'>
            <div className='group relative justify-between gap-5 rounded'>
                {/* Image */}
                <div
                    className='group relative w-full'
                    data-active={isActiveProductActions ? 'card' : ''}
                    onMouseEnter={handleSetDateActive}
                    onMouseLeave={handleSetDateActive}
                >
                    <Link to={`/`} className='block w-full overflow-hidden'>
                        <img
                            loading='lazy'
                            src={secondImage}
                            alt=''
                            className='absolute bottom-0 left-0 right-0 top-0 w-full scale-100 transition-transform duration-500 ease-linear hover:scale-105 md:w-56'
                        />
                        <img
                            loading='lazy'
                            src={mainImage}
                            alt=''
                            className='relative z-10 w-full opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                        />
                    </Link>
                    <ProductActions />
                </div>

                {/* Name */}
                <div className='mt-[15px]'>
                    <h4 className='line-clamp-2 cursor-default text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                        Apple iPhone 11 Pro 256GB Space Gray – Unlocked
                    </h4>

                    {/* Review */}
                    <RatingDisplay rating={4.5} reviews={2} />

                    {/* Price */}
                    <div className='mb-3 mt-[10px]'>
                        <span className='text-base font-semibold leading-5 text-[#222]'>$56.00</span>
                    </div>

                    {/* Add to cart btn */}
                    <button className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'>
                        Add to Cart
                    </button>
                </div>

                {/* Discount */}
                <div className='absolute left-0 top-0 inline-block select-none rounded-sm bg-[#16bcdc] px-3 text-sm text-white'>
                    New
                </div>
            </div>
        </div>
    );
};

export default SmallCard;

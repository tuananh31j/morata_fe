import mainImage from '../../assets/images/products_5_1.webp';
import secondImage from '../../assets/images/products_5_2.webp';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RatingDisplay from '../RatingDisplay';

const SmallCard = () => {
    const [isScale, setIsScale] = useState<boolean>(false);

    const handleScale = (status: string) => {
        status === 'open' ? setIsScale(true) : setIsScale(false);
    };

    return (
        <div className='rounded-xl bg-white p-5'>
            <div className='relative justify-between gap-5 rounded'>
                {/* Image */}
                <Link to={`/`} className='relative block w-full'>
                    <img
                        src={secondImage}
                        alt=''
                        className={`bottom-0 left-0 right-0 top-0 block w-full scale-105 transition-transform duration-500 ease-linear ${!isScale ? 'hover:duration-500 hover:ease-linear' : ''}`}
                    />
                    <img
                        src={mainImage}
                        alt=''
                        className='absolute bottom-0 left-0 right-0 top-0 w-full opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear'
                        onMouseOver={() => handleScale('open')}
                        onMouseLeave={() => handleScale('close')}
                    />
                </Link>

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

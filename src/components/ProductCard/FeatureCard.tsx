import mainImage from '../../assets/images/products_5_1.webp';
import secondImage from '../../assets/images/products_5_2.webp';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RatingDisplay from '../_common/RatingDisplay';

const FeatureCard = () => {
    const [isScale, setIsScale] = useState<boolean>(false);

    const handleScale = (status: string) => {
        if (status === 'open') {
            setIsScale(true);
        } else {
            setIsScale(false);
        }
    };

    return (
        <div className='rounded-xl bg-white p-5'>
            <div className='relative flex justify-between gap-5 rounded'>
                <Link to={`/productdetail`} className='relative block w-full max-w-24'>
                    <img
                        loading='lazy'
                        src={secondImage}
                        alt=''
                        className={`absolute bottom-0 left-0 right-0 top-0 scale-105 transition-transform duration-500 ease-linear ${!isScale ? 'hover:duration-500 hover:ease-linear' : ''}`}
                    />
                    <img
                        loading='lazy'
                        src={mainImage}
                        alt=''
                        className='absolute bottom-0 left-0 right-0 top-0 opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear'
                        onFocus={() => handleScale('open')}
                        onMouseOver={() => handleScale('open')}
                        onMouseLeave={() => handleScale('close')}
                    />
                </Link>
                <div>
                    <h4 className='line-clamp-2 cursor-default text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                        Apple iPhone 11 Pro 256GB Space Gray – Unlocked
                    </h4>
                    <RatingDisplay rating={3} />
                    <div className='mb-3 flex gap-x-2'>
                        <span className='text-base font-semibold leading-5 text-red-600'>$21000</span>
                        <del className=' text-base font-semibold leading-5 text-gray-500'>$23000</del>
                    </div>
                </div>
                <div className='absolute left-0 top-0 inline-block select-none rounded-sm bg-lime-600 px-3 text-sm text-white'>
                    -5%
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;

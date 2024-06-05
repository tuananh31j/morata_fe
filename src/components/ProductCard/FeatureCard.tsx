import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypeProduct } from '~/types/product';
import RatingDisplay from '../_common/RatingDisplay';
import { Currency } from '~/utils';
import clsx from 'clsx';

const FeatureCard = ({ product }: PropTypeProduct) => {
    const [isScale, setIsScale] = useState<boolean>(false);
    const newPrice = product.price * (1 + product.discountPercentage / 100);
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
                <Link to={`/products/${product._id}`} className='relative block w-full max-w-24'>
                    <img
                        loading='lazy'
                        src={product.images[1]}
                        alt=''
                        className={`absolute bottom-0 left-0 right-0 top-0 scale-105 transition-transform duration-500 ease-linear ${!isScale ? 'hover:duration-500 hover:ease-linear' : ''}`}
                    />
                    <img
                        loading='lazy'
                        src={product.thumbnail}
                        alt=''
                        className='absolute bottom-0 left-0 right-0 top-0 opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear'
                        onFocus={() => handleScale('open')}
                        onMouseOver={() => handleScale('open')}
                        onMouseLeave={() => handleScale('close')}
                    />
                </Link>
                <div>
                    <Link className='cursor-pointer' to={`/products/${product._id}`}>
                        <h4 className='line-clamp-2 text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h4>
                        <RatingDisplay rating={product.rating} reviews={product.reviewIds.length} />
                        <div className='mb-3 flex gap-x-2'>
                            <span
                                className={clsx('text-base font-semibold leading-5', {
                                    'text-red-600': product.discountPercentage,
                                })}
                            >
                                {Currency?.format(product.price)}
                            </span>
                            {product.discountPercentage > 0 && (
                                <del className=' text-[12px] font-semibold leading-5 text-gray-500'>
                                    {Currency.format(newPrice)}
                                </del>
                            )}
                        </div>
                    </Link>
                </div>
                {product.discountPercentage > 0 && (
                    <div className='absolute left-0 top-0 inline-block select-none rounded-sm bg-lime-600 px-3 text-sm text-white'>
                        -5%
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;

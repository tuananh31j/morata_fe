import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '~/components/_common/ProgressBar';
import { PropTypeProduct } from '~/types/product';
import { Currency } from '~/utils';
import ProductActions from '../_common/ProductActions';
import RatingDisplay from '../_common/RatingDisplay';

const MediumCard = ({ product }: PropTypeProduct) => {
    const newPrice = product.price * (1 + product.discountPercentage / 100);
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
                    <Link to={`/products/${product._id}`} className='block w-full overflow-hidden'>
                        <img
                            loading='lazy'
                            src={product.images[1]}
                            alt=''
                            className='absolute bottom-0 left-0 right-0 top-0 w-full scale-100 select-none transition-transform duration-500 ease-linear hover:scale-105 md:w-56'
                        />
                        <img
                            loading='lazy'
                            src={product.thumbnail}
                            alt=''
                            className='relative z-10  w-full select-none opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                        />
                    </Link>
                    <ProductActions />
                </div>
                <div className='mt-3'>
                    <Link to={`/products/${product._id}`}>
                        <h4 className='line-clamp-2  text-ellipsis text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h4>
                        <div className='my-2 mb-3 flex flex-wrap items-end gap-1 sm:mb-2'>
                            <RatingDisplay rating={4} reviews={2} />
                        </div>
                        <div className='mb-3 flex gap-x-2'>
                            <span
                                className={clsx('text-base font-semibold leading-5', {
                                    'text-red-600': product.discountPercentage > 0,
                                })}
                            >
                                {Currency.format(product.price)}
                            </span>
                            {product?.discountPercentage > 0 && (
                                <del className=' text-base font-semibold leading-5 text-gray-400'>
                                    {Currency.format(newPrice)}
                                </del>
                            )}
                        </div>
                        <ul className='mb-5'>
                            <li>
                                <span className="relative line-clamp-1 select-none pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']">
                                    Screen Size 10.9 inch
                                </span>
                            </li>
                            <li>
                                <span className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']">
                                    Operating System iOS 14.0
                                </span>
                            </li>
                            <li>
                                <span className="relative line-clamp-1 select-none  text-ellipsis pl-3 text-sm text-gray-600 after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:bg-gray-400 after:content-['']">
                                    Product Length 9.74 inch
                                </span>
                            </li>
                        </ul>
                        <ProgressBar stock={product.stock} />
                        <div className='text-sx mb-6 leading-8'>
                            Sold:
                            <span className='mx-1 font-semibold'>{product.stock}/100</span>
                            products
                        </div>
                    </Link>
                    <button className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'>
                        Add to Cart
                    </button>
                </div>
            </div>
            {product.discountPercentage > 0 && (
                <div className='absolute left-[20px] top-[20px] z-10 inline-block select-none rounded-sm bg-lime-600 px-4 text-sm leading-6 text-white'>
                    -{product.discountPercentage}%
                </div>
            )}
        </div>
    );
};

export default MediumCard;

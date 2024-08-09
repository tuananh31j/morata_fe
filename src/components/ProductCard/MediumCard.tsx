import { Spin } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProgressBar from '~/components/_common/ProgressBar';
import { MAIN_ROUTES } from '~/constants/router';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { RootState } from '~/store/store';
import { IProductItemNew } from '~/types/Product';
import { Currency } from '~/utils';
import ProductActions from '../_common/ProductActions';
import RatingDisplay from '../_common/RatingDisplay';

const MediumCard = ({ product }: { product: IProductItemNew }) => {
    const discountPercentage = 10;
    const { mutate, isPending } = useMutationCart();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const handleAddCart = () => {
        mutate({
            productVariation: product.variationIds[0]._id,
            quantity: 1,
            userId: user ? user._id : '',
        });
    };
    const newPrice = product.variationIds?.[0].price * (1 + discountPercentage / 100);
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
                    <Link to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`} className='block w-full overflow-hidden'>
                        {isActiveProductActions && (
                            <img
                                loading='lazy'
                                src={product.images[1]}
                                alt=''
                                className='absolute bottom-0 left-0 right-0 top-0 w-full scale-100 select-none object-cover transition-transform duration-500 ease-linear hover:scale-105 md:w-56'
                            />
                        )}

                        <img
                            loading='lazy'
                            src={product.thumbnail}
                            alt=''
                            className='relative z-10 w-full select-none object-cover opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                        />
                    </Link>
                    <ProductActions id={product._id} />
                </div>
                <div className='mt-3 flex h-full flex-col'>
                    <Link to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}>
                        <h1 className='line-clamp-2 h-16 flex-shrink-0 text-ellipsis text-title-md font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h1>
                        <div className='my-2 mb-3 flex flex-wrap items-end gap-1 sm:mb-2'>
                            <RatingDisplay rating={product.rating} reviews={product.reviewCount || 0} />
                        </div>
                        <div className='mb-3 flex gap-x-2'>
                            <span
                                className={clsx('text-base font-semibold leading-5', {
                                    'text-red-600': discountPercentage > 0,
                                })}
                            >
                                {Currency.format(product.variationIds[0].price)}
                            </span>
                            {discountPercentage > 0 && (
                                <del className='text-gray-400 text-base font-semibold leading-5 '>
                                    {Currency.format(newPrice)}
                                </del>
                            )}
                        </div>
                        <ul className='mb-5'>
                            <li>
                                <span className="text-gray-600 after:bg-gray-400 relative line-clamp-1 select-none pl-3 text-sm after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:content-['']">
                                    Screen Size 10.9 inch
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-600 after:bg-gray-400 relative  line-clamp-1 select-none text-ellipsis pl-3 text-sm after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:content-['']">
                                    Operating System iOS 14.0
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-600 after:bg-gray-400 relative  line-clamp-1 select-none text-ellipsis pl-3 text-sm after:absolute after:left-0 after:top-2/4 after:block after:h-[0.188rem] after:w-[0.188rem] after:select-none after:rounded-full after:content-['']">
                                    Product Length 9.74 inch
                                </span>
                            </li>
                        </ul>
                        <ProgressBar stock={product.variationIds?.[0].stock} />
                        <div className='text-sx mb-6 leading-8'>
                            Sold:
                            <span className='mx-1 font-semibold'>{product.variationIds?.[0].stock}/100</span>
                            products
                        </div>
                    </Link>
                    <button
                        onClick={handleAddCart}
                        className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                    >
                        {isPending && <Spin />}
                        {!isPending && 'Add to cart'}
                    </button>
                </div>
            </div>
            {discountPercentage > 0 && (
                <div className='absolute left-[20px] top-[20px] z-10 inline-block select-none rounded-sm bg-lime-600 px-4 text-sm leading-6 text-white'>
                    -{discountPercentage}%
                </div>
            )}
        </div>
    );
};

export default MediumCard;

import clsx from 'clsx';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMutationCart } from '~/hooks/Mutations/cart/useAddCart';
import { RootState } from '~/store/store';
import { PropTypeProduct } from '~/types/product';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';
import ProductActions from '../_common/ProductActions';
import RatingDisplay from '../_common/RatingDisplay';
import Animation from '../_common/Animation';

const SmallCard = ({ product }: PropTypeProduct) => {
    const { mutate } = useMutationCart();
    const navigate = useNavigate();
    // console.log('from smallcard', product);
    const newPrice = product.price * (1 + product.discountPercentage / 100);
    const [isActiveProductActions, setIsActiveProductActions] = useState<boolean>(false);
    const handleSetDateActive = () => {
        setIsActiveProductActions(!isActiveProductActions);
    };
    const userId = useSelector((state: RootState) => state.authReducer.user);
    const handleAddToCart = (productId: string) => {
        if (userId) {
            const data = {
                userId: userId?._id,
                productId,
                quantity: 1,
            };
            mutate(data);
        } else {
            navigate('/auth/login');
            showMessage('You need to login first!', 'warning');
        }
    };
    const debounceAddToCart = debounce((id: string) => handleAddToCart(id), 500);
    return (
        <Animation>
            <div className='rounded-xl bg-white p-5'>
                <div className='group relative justify-between gap-5 rounded'>
                    {/* Image */}
                    <div
                        className='group relative w-full'
                        data-active={isActiveProductActions ? 'card' : ''}
                        onMouseEnter={handleSetDateActive}
                        onMouseLeave={handleSetDateActive}
                    >
                        <Link
                            to={`/products/${product._id}?categoryId=${product.categoryId}`}
                            className='flex w-full justify-center overflow-hidden'
                        >
                            <img
                                loading='lazy'
                                src={product.images[0]}
                                alt=''
                                className='absolute  w-full scale-100 transition-transform duration-500 ease-linear hover:scale-105 md:w-56'
                            />
                            <img
                                loading='lazy'
                                src={product.thumbnail}
                                alt=''
                                className='relative z-10 w-full opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                            />
                        </Link>
                        <ProductActions />
                    </div>

                    {/* Name */}
                    <div className='mt-[15px] cursor-pointer'>
                        <Link to={`/products/${product._id}?categoryId=${product.categoryId}`}>
                            <h4 className=' cursor-pointer truncate text-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                                {product.name}
                            </h4>

                            {/* Review */}
                            <RatingDisplay rating={product.rating} reviews={product.reviewIds.length} />

                            {/* Price */}
                            <div className='mb-3 mt-[10px] flex items-center gap-4'>
                                <span
                                    className={clsx('text-base font-semibold leading-5 text-[#222]', {
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
                        </Link>
                        {/* Add to cart btn */}
                        <button
                            onClick={() => debounceAddToCart(product._id)}
                            className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Discount */}
                    {product.discountPercentage > 0 ? (
                        <div className='absolute left-0 top-0  z-10 inline-block select-none rounded-sm bg-lime-600 px-2 text-sm leading-6 text-white'>
                            -{product.discountPercentage}%
                        </div>
                    ) : (
                        <div className='absolute left-0 top-0 z-[50] inline-block select-none rounded-sm bg-[#16bcdc] px-2 text-sm text-white'>
                            New
                        </div>
                    )}
                </div>
            </div>
        </Animation>
    );
};

export default SmallCard;

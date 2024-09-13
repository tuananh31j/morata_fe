import { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDisplay from '../_common/RatingDisplay';
import { Currency } from '~/utils';
import { IProductItemNew } from '~/types/Product';
import { MAIN_ROUTES } from '~/constants/router';

type PropTypeProduct = { product: IProductItemNew };
const FeatureCard = ({ product }: PropTypeProduct) => {
    const [isScale, setIsScale] = useState<boolean>(false);
    const handleScale = (status: string) => {
        if (status === 'open') {
            setIsScale(true);
        } else {
            setIsScale(false);
        }
    };

    return (
        <div className='rounded-xl bg-white p-8'>
            <div className='relative grid grid-cols-12 justify-between rounded'>
                <Link
                    to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}
                    className='relative col-span-5 hidden w-full max-w-20 md:block'
                >
                    <img
                        loading='lazy'
                        src={product.images[1]}
                        alt=''
                        className={`oobject-contain absolute bottom-0 left-0 right-0 top-0 scale-105 bg-white p-2 transition-transform duration-500 ease-linear ${!isScale ? ' hover:duration-500 hover:ease-linear ' : ''}`}
                    />
                    <img
                        loading='lazy'
                        src={product.thumbnail}
                        alt=''
                        className='absolute bottom-0 left-0 right-0 top-0 bg-white object-contain opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear'
                        onFocus={() => handleScale('open')}
                        onMouseOver={() => handleScale('open')}
                        onMouseLeave={() => handleScale('close')}
                    />
                </Link>

                <div className='col-span-7'>
                    <Link className='cursor-pointer' to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}>
                        <h4 className='line-clamp-2 text-ellipsis font-satoshi text-title-xsm font-semibold text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h4>

                        <RatingDisplay rating={product.rating} reviews={product.reviewCount} />

                        <div className='mb-3 flex gap-x-2'>
                            <span className={'text-[14px] font-semibold leading-5'}>
                                {Currency?.format(product.priceFilter)}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className='absolute left-0 top-0 z-[50] inline-block select-none rounded-sm bg-[#16bcdc] px-2 text-sm text-white'>
                    Chính Hãng
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;

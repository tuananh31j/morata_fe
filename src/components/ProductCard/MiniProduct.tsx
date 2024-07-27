import { FC } from 'react';
import { ICartItemsResponse } from '~/types/cart/CartResponse';
import { Currency } from '~/utils';

const MiniProduct: FC<ICartItemsResponse> = ({ quantity, productVariation }) => {
    return (
        <div className='flex items-center gap-[14px]'>
            <div className='relative rounded-[2px]  border-[1px] '>
                <img src={productVariation?.image} alt='' width={80} />
                <span
                    style={{ backgroundColor: 'rgba(0,0,0, 0.58)' }}
                    className='absolute -right-3 -top-3 z-10 rounded-full px-[9px] py-[2px] text-[12px] font-semibold text-white'
                >
                    {quantity}
                </span>
            </div>
            <div className='w-full'>
                <span className='text-[14px]'>{productVariation?.productId.name}</span>
            </div>
            <div>
                <span className='text-[14px]'>{Currency.format(productVariation?.price)}</span>
            </div>
        </div>
    );
};

export default MiniProduct;

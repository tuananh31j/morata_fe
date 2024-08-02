import { Link } from 'react-router-dom';
import Animation from '~/components/_common/Animation';
import { IProductItem } from '~/types/Product';
import { generateLink } from './_helper';

const SearchCard = ({ product }: { product: IProductItem }) => {
    return (
        <Animation>
            <div className='mb-4'>
                <Link
                    to={generateLink({ productId: product._id, categoryId: product.categoryId._id })}
                    className='flex items-center  gap-5  px-5'
                >
                    <div className='group relative border-2'>
                        <img src={product.thumbnail} width={80} alt='' />
                    </div>
                    <div>
                        <h3 className='text-base font-medium'>{product.name}</h3>
                    </div>
                </Link>
            </div>
        </Animation>
    );
};

export default SearchCard;

import { Link } from 'react-router-dom';
import Animation from '~/components/_common/Animation';
import { IProductItemNew } from '~/types/Product';

const SearchCard = ({ product }: { product: IProductItemNew }) => {
    return (
        <Animation>
            <div className='mb-4'>
                <Link to={`/products/${product._id}`} className='flex items-center  gap-5  px-5'>
                    <div className='group relative border-2'>
                        <img className='object-contain' src={product.thumbnail} width={80} alt='' />
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

import { Link } from 'react-router-dom';
import Animation from '~/components/_common/Animation';
import { MAIN_ROUTES } from '~/constants/router';
import { IProductItem } from '~/types/Product';

const SearchCard = ({ product }: { product: IProductItem }) => {
    return (
        <Animation>
            <div className='mb-4'>
                <Link to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`} className='flex items-center  gap-5  px-5'>
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

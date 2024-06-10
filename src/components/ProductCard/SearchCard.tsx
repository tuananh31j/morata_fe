import { Link } from 'react-router-dom';
import Animation from '~/components/_common/Animation';
import { IProduct } from '~/types/Product';

const SearchCard = ({ product }: { product: IProduct }) => {
    return (
        <Animation>
            <div className=''>
                <Link to={`/products/${product._id}`} className='flex items-center  gap-5 border-y-[1px] px-5'>
                    <div className='group relative '>
                        <img src={product.thumbnail} width={100} alt='' />
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

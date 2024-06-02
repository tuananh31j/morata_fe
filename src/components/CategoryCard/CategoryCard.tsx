import { Link } from 'react-router-dom';
import { ICategoryPopular } from '~/types/Category';

type CategoryPopularProps = {
    category: ICategoryPopular;
};
const SmallCategoryCard = ({ category }: CategoryPopularProps) => {
    return (
        <>
            <Link to={`/products?cate=${category.categoryId}`} className=' relative mt-2 block rounded-[20px]'>
                <div className='w-full overflow-hidden rounded-2xl border border-transparent'>
                    <img
                        loading='lazy'
                        src={category.image}
                        alt=''
                        className='h-full w-full object-cover transition-transform duration-700 ease-linear hover:scale-110 hover:duration-700 hover:ease-linear'
                    />
                </div>
                <div className='pointer-events-none absolute left-5 top-[25%] text-white sm:left-3 sm:top-4 md:left-5 md:top-5 lg:left-7 lg:top-9'>
                    <h4 className='text-xs  font-medium capitalize lg:text-base'>{category.categoryName}</h4>
                    <span className=' text-xs opacity-70 lg:text-sm '>({category.totalProducts} Products )</span>
                </div>
            </Link>
        </>
    );
};

export default SmallCategoryCard;

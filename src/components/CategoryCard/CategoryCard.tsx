import { Link } from 'react-router-dom';
import catImage from '../../assets/images/cate_1_1.avif';
const SmallCategoryCard = () => {
    return (
        <>
            <Link to={`/`} className=' relative mt-2 block h-full w-full rounded-[20px]'>
                <div className='w-[90%] overflow-hidden rounded-2xl border border-transparent'>
                    <img
                        src={catImage}
                        alt=''
                        className='h-full w-full object-cover hover:scale-110 hover:duration-700 hover:ease-linear transition-transform duration-700 ease-linear'
                    />
                </div>
                <div className='pointer-events-none absolute left-5 top-[25%] sm:top-4 sm:left-3 md:left-5 md:top-5 lg:left-7 lg:top-9 text-white'>
                    <h4 className='text-xs  lg:text-base font-medium capitalize'>Decor & Furniture</h4>
                    <span className=' text-xs lg:text-sm opacity-70 '>(11 Products )</span>
                </div>
            </Link>
        </>
    );
};

export default SmallCategoryCard;

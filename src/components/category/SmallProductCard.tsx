import { Link } from 'react-router-dom';
import catImage from '../../assets/images/cate_1_1.avif';
const SmallCategoryCard = () => {
    return (
        <>
            <Link to={`/`} className=' relative mt-2 block w-[236px] overflow-hidden rounded-[20px]'>
                <div className='w-full transition-transform duration-700 ease-linear hover:scale-110 hover:duration-700 hover:ease-linear'>
                    <img src={catImage} alt='' className='h-full w-full object-cover' />
                </div>
                <div className='pointer-events-none absolute left-7 top-9 text-white'>
                    <h4 className='text-base font-medium capitalize'>Decor & Furniture</h4>
                    <span className='text-sm opacity-70 '>(11 Products )</span>
                </div>
            </Link>
        </>
    );
};

export default SmallCategoryCard;

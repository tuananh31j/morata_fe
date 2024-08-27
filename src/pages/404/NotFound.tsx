import { Link } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle('404');

    return (
        <div className='flex  h-[100vh] flex-col items-center justify-center'>
            <div className=' flex justify-center'>
                <img
                    className='w-[80%]'
                    loading='lazy'
                    src='https://demo-morata.myshopify.com/cdn/shop/files/404_720x.png?v=1704425830'
                    alt=''
                />
            </div>
            <div className=' mt-[15px] flex flex-col items-center gap-5'>
                <h1 className='text-center text-[28px] font-bold leading-[40px] xl:text-4xl'>Opps! Page not found.</h1>
                <p className='text-center text-[12px] text-[#777777] xl:text-base'>
                    Sorry for the inconvenience. Go to our homepage or check out our latest collections.
                </p>
                <div className='flex justify-center'>
                    <Link
                        to={'/'}
                        className='flex h-[48px] w-[210px] cursor-pointer items-center justify-center rounded-[25px] bg-[#222222] font-bold text-white duration-300 hover:bg-[#16bcdc]'
                    >
                        BACK TO HOMEPAGE
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default NotFound;

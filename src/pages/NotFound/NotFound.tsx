import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className='flex h-[100vh] w-[100vw] flex-col items-center justify-center'>
            <div className='mb-[30px]'>
                <img src='https://demo-morata.myshopify.com/cdn/shop/files/404_720x.png?v=1704425830' alt='' />
            </div>
            <div className=' mt-[35px] flex flex-col items-center gap-[50px]'>
                <h1 className='text-center text-[28px] font-bold leading-[40px] xl:text-[48px]'>
                    Opps! Page not found.
                </h1>
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

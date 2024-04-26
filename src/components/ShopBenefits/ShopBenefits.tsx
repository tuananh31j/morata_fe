import { DeliveryIcon, HandIcon, HelpCenterIcon, PaymentIcon } from '../Icons';

const ShopBenefits = () => {
    return (
        <div className='my-10 grid grid-cols-2 items-center justify-center gap-10 lg:grid-cols-4  lg:gap-4 '>
            <div className='flex items-center justify-center gap-3 text-center'>
                <DeliveryIcon className='h-14 text-blue-500 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold lg:text-lg'>Free Delivery</h4>
                    <p className='mt-1 text-sm font-light'>For all orders over $120</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <PaymentIcon className='h-14 text-blue-500 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold lg:text-lg'>Safe Payment</h4>
                    <p className='mt-1 text-sm font-light'>100% secure payment</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HelpCenterIcon className='h-14 text-blue-500 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold lg:text-lg'>24/7 Help Center</h4>
                    <p className='mt-1 text-sm font-light'>Dedicated 24/7 support</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HandIcon className='h-14 text-blue-500 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold lg:text-lg'>Shop With Confidence</h4>
                    <p className='mt-1 text-sm font-light'>If goods have problems</p>
                </div>
            </div>
        </div>
    );
};

export default ShopBenefits;

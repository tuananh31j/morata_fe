import { DeliveryIcon, HandIcon, HelpCenterIcon, PaymentIcon } from '../_common/Icons';

const ShopBenefits = () => {
    return (
        <div className='my-20 grid grid-cols-2 items-center justify-center gap-10 lg:grid-cols-4  lg:gap-4 '>
            <div className='flex items-center justify-center gap-3 text-center'>
                <DeliveryIcon className='h-14 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className=' text-md font-semibold text-[#212224] lg:text-lg'>Vận chuyển miễn phí</h4>
                    <p className='mt-1 text-sm font-light text-[#16bcdc]'>Cho tất cả các đơn thanh toán online</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <PaymentIcon className='h-14 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold text-[#212224] lg:text-lg'>Giao dịch bảo mật</h4>
                    <p className='mt-1 text-sm font-light text-[#16bcdc]'>An toàn 100%</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HelpCenterIcon className='h-14 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold text-[#212224] lg:text-lg'>Hỗ trợ khách hàng</h4>
                    <p className='mt-1 text-sm font-light text-[#16bcdc]'>Hỗ trợ 24/7</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-3 text-center'>
                <HandIcon className='h-14 duration-75 hover:animate-pulse' />
                <div className='hidden text-start lg:inline-block'>
                    <h4 className='text-md font-semibold text-[#212224] lg:text-lg'>Bảo đảm chất lượng</h4>
                    <p className='mt-1 text-sm font-light text-[#16bcdc]'>Đổi hàng bị lỗi</p>
                </div>
            </div>
        </div>
    );
};

export default ShopBenefits;

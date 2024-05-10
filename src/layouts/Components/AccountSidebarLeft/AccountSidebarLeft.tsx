import StaticImages from '~/assets';
import MenuAccount from './MenuAccount';
const AccountSidebarLeft = () => {
    return (
        <>
            <div className='hidden flex-col bg-white md:flex md:w-[26vw]'>
                <div className=''>
                    <h1 className='py-3 text-center text-2xl font-semibold uppercase text-[#16bcdc]'>Tài khoản</h1>
                </div>
                <div className='mb-10 flex items-center justify-center gap-5'>
                    <div className='w-[16%]'>
                        <img src={StaticImages.userDefault} loading='lazy' alt='' />
                    </div>
                    <div>
                        <p className='text-[16px] capitalize'>Nguyễn Tuấn Anh</p>
                        <p className='text-[14px] font-thin'>05464564523</p>
                    </div>
                </div>
                <MenuAccount />
            </div>
        </>
    );
};

export default AccountSidebarLeft;

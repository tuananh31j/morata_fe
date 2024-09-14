export const CheckEmail = () => {
    const handleNavigate = () => {
        window.location.href = 'https://mail.google.com/mail';
    };
    return (
        <div className='mt-8'>
            <div className='flex flex-col items-center justify-center p-6'>
                <div className='flex w-full max-w-lg flex-col items-center rounded-lg bg-white p-6 shadow-lg'>
                    <img
                        className='mb-4 h-auto w-32 rounded-md bg-[#1e3a8a] p-3'
                        src='https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938'
                        loading='lazy'
                        alt='Morata Logo'
                    />
                    <div className='mb-4 flex justify-center'>
                        <svg
                            className='h-16 w-16 fill-green-500'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                        >
                            <path d='M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z' />
                        </svg>
                    </div>
                    <h3 className='text-gray-800 mb-2 text-center text-xl font-semibold'>
                        Kiểm tra hòm thư Email của bạn
                    </h3>
                    <p className='text-gray-600 mb-4 text-center'>Cảm ơn bạn đã chọn Morata</p>
                    <button
                        onClick={handleNavigate}
                        className='rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-cyan-600'
                    >
                        Kiểm tra Email
                    </button>
                </div>
            </div>
        </div>
    );
};

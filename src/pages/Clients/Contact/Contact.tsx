import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const Contact = () => {
    useDocumentTitle('Liên hệ');

    return (
        <>
            <div className='mb-10 mt-5 grid grid-cols-1 place-content-center  gap-10 md:grid-cols-2  '>
                <div>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold italic text-slate-700'>Đang cập nhật!</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;

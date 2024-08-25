const DescriptionContent = ({ description }: { description: string }) => {
    return (
        <div className='product-desc-content  text-base text-[#777777]'>
            {description.length > 0 ? (
                <p>{description}</p>
            ) : (
                <div className='flex min-h-[30vh] w-full items-center justify-center'>
                    <p className=' text-center text-black'>Sản phẩm hiện chưa có mô tả</p>
                </div>
            )}
        </div>
    );
};

export default DescriptionContent;

const HeadItem = ({ title }: { title: string }) => {
    return (
        <div className='p-2.5 xl:p-5'>
            <h5 className='text-sm font-medium uppercase xsm:text-base'>{title}</h5>
        </div>
    );
};

export default HeadItem;

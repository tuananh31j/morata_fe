import { Skeleton } from 'antd';

const SearchSkeleton = () => {
    return (
        <>
            <div className='flex w-full items-center gap-5 p-5'>
                <Skeleton.Image active={true} className='h-[50px] w-[100px]' />
                <Skeleton active={true} className='mt-[15px] w-full' paragraph={{ rows: 0 }} />
            </div>
        </>
    );
};

export default SearchSkeleton;

import { Skeleton } from 'antd';

const MediumSkeleton = () => {
    return (
        <>
            <div className='flex h-[342px] w-[728px] items-center gap-5 p-5'>
                <Skeleton.Image active={true} className='h-[300px] w-[300px]' />
                <Skeleton active={true} className='mt-[15px] w-[50%]' paragraph={{ rows: 5 }} />
            </div>
        </>
    );
};

export default MediumSkeleton;

import { Skeleton } from 'antd';

const CategoryPoPularSkeleton = () => {
    return (
        <>
            <div className='flex h-[140px] w-[272px] items-center  p-5'>
                <Skeleton.Image active={true} className='h-[140px] w-[272px]' />
            </div>
        </>
    );
};

export default CategoryPoPularSkeleton;

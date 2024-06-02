import { Skeleton } from 'antd';

export default function UserToolBarSkeleton() {
    return (
        <>
            <div className='flex items-center gap-2'>
                <Skeleton.Avatar active={true} size={'large'} shape={'circle'} />
                <div>
                    <Skeleton.Button active={true} size={'small'} shape={'default'} />
                    <Skeleton.Button active={true} size={'small'} shape={'default'} />
                </div>
            </div>
        </>
    );
}

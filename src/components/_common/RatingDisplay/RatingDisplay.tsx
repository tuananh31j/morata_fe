import { Rate } from 'antd';

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews?: number }) => {
    return (
        <div className='mt-[10px] flex items-center gap-1'>
            <Rate className='text-[12px] text-[#FFB800]' allowHalf disabled={!!reviews} defaultValue={rating} />
            <span className='text-[12px] text-gray-500 dark:text-white dark:opacity-80'>({reviews})</span>
        </div>
    );
};

export default RatingDisplay;

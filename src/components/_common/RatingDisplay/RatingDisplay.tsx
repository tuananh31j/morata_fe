import { Rate } from 'antd';

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews?: number }) => {
    return (
        <div className='mt-[10px] flex items-center gap-1'>
            <Rate className='text-[12px] text-[#FFB800]' allowHalf disabled={true} defaultValue={rating} />
            {reviews && <span className='text-gray-500 text-[12px]'>({reviews})</span>}
        </div>
    );
};

export default RatingDisplay;

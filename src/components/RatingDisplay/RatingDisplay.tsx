import { Rate } from 'antd';

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews?: number }) => {
    return (
        <div className='mt-[10px] flex flex-wrap'>
            <Rate className='text-sm text-[#FFB800]' disabled={!!reviews} allowHalf defaultValue={rating} />
            <span className='text-sm text-gray-500'>({reviews} reviews)</span>
        </div>
    );
};

export default RatingDisplay;

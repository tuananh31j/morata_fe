import { Rate } from 'antd';

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews?: number }) => {
    return (
        <>
            <Rate className='text-sm text-[#FFB800]' disabled={!!reviews} defaultValue={rating} />
            <span className='ml-1 text-sm text-gray-500'>({reviews} review)</span>
        </>
    );
};

export default RatingDisplay;

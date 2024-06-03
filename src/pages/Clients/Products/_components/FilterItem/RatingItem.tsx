import FilterItem from './FilterItem';
import { FC } from 'react';
import RatingDisplay from '~/components/_common/RatingDisplay';

type IBrandFilterProps = {
    handleFilterRating: (ratingFilter: { min: number; max: number }) => void;
};

const RateFilter: FC<IBrandFilterProps> = ({ handleFilterRating }) => {
    return (
        <FilterItem filterName='Rate'>
            <span onClick={() => handleFilterRating({ min: 1, max: 1 })}>
                <RatingDisplay rating={1} />
            </span>
            <span onClick={() => handleFilterRating({ min: 2, max: 2 })}>
                <RatingDisplay rating={2} />
            </span>
            <span onClick={() => handleFilterRating({ min: 3, max: 3 })}>
                <RatingDisplay rating={3} />
            </span>
            <span onClick={() => handleFilterRating({ min: 4, max: 4 })}>
                <RatingDisplay rating={4} />
            </span>
            <span onClick={() => handleFilterRating({ min: 5, max: 5 })}>
                <RatingDisplay rating={5} />
            </span>
        </FilterItem>
    );
};

export default RateFilter;

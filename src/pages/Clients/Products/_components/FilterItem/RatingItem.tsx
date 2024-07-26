import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import useFilters from '~/hooks/_common/useFilters';
import RatingDisplay from '~/components/_common/RatingDisplay';

const FilterRating = ({ filterName }: { filterName: string }) => {
    const { updateFilterAttribute, queryParams } = useFilters();

    const onChange = (e: RadioChangeEvent) => {
        updateFilterAttribute('rating', e.target.value);
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group onChange={onChange} value={queryParams.rating || ''}>
                <Space direction='vertical'>
                    <Radio value={JSON.stringify({ min: 1, max: 1 })}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={1} rating={1} />
                        </span>
                    </Radio>
                    <Radio value={JSON.stringify({ min: 2, max: 2 })}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={2} rating={2} />
                        </span>
                    </Radio>
                    <Radio value={JSON.stringify({ min: 3, max: 3 })}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={3} rating={3} />
                        </span>
                    </Radio>
                    <Radio value={JSON.stringify({ min: 4, max: 4 })}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={4} rating={4} />
                        </span>
                    </Radio>
                    <Radio value={JSON.stringify({ min: 5, max: 5 })}>
                        <RatingDisplay reviews={5} rating={5} />
                    </Radio>
                </Space>
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterRating;

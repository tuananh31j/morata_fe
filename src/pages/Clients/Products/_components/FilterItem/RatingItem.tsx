import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import RatingDisplay from '~/components/_common/RatingDisplay';
import useFilter from '~/hooks/_common/useFilter';

const FilterRating = ({ filterName }: { filterName: string }) => {
    const { query, updateQueryParam } = useFilter();

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['rating[gte]']: e.target.value.min, ['rating[lte]']: e.target.value.max });
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group
                onChange={onChange}
                value={{ min: Number(query['rating[gte]']) || 0, max: Number(query['rating[lte]'] || 0) } || ''}
            >
                <Space direction='vertical'>
                    <Radio value={{ min: 1, max: 1 }}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={1} rating={1} />
                        </span>
                    </Radio>
                    <Radio value={{ min: 2, max: 2 }}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={2} rating={2} />
                        </span>
                    </Radio>
                    <Radio value={{ min: 3, max: 3 }}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={3} rating={3} />
                        </span>
                    </Radio>
                    <Radio value={{ min: 4, max: 4 }}>
                        <span className='cursor-pointer'>
                            <RatingDisplay reviews={4} rating={4} />
                        </span>
                    </Radio>
                    <Radio value={{ min: 5, max: 5 }}>
                        <RatingDisplay reviews={5} rating={5} />
                    </Radio>
                </Space>
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterRating;

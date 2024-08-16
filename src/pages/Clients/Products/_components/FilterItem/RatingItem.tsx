import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import RatingDisplay from '~/components/_common/RatingDisplay';
import useFilter from '~/hooks/_common/useFilter';

const FilterRating = ({ filterName }: { filterName: string }) => {
    const { query, updateQueryParam } = useFilter();

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, ['rating[gte]']: String(e.target.value), page: 1 });
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group onChange={onChange} value={Number(query['rating[gte]']) || ''}>
                <Space direction='vertical'>
                    <Radio value={1}>
                        <span className='cursor-pointer'>
                            <RatingDisplay rating={1} />
                        </span>
                    </Radio>
                    <Radio value={2}>
                        <span className='cursor-pointer'>
                            <RatingDisplay rating={2} />
                        </span>
                    </Radio>
                    <Radio value={3}>
                        <span className='cursor-pointer'>
                            <RatingDisplay rating={3} />
                        </span>
                    </Radio>
                    <Radio value={4}>
                        <span className='cursor-pointer'>
                            <RatingDisplay rating={4} />
                        </span>
                    </Radio>
                    <Radio value={5}>
                        <RatingDisplay rating={5} />
                    </Radio>
                </Space>
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterRating;

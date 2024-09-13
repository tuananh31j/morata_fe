import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Rate, Space } from 'antd';
import useFilter from '~/hooks/_common/useFilter';
import { cn } from '~/utils';

const FilterRating = ({ filterName }: { filterName: string }) => {
    const { query, updateQueryParam } = useFilter();

    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({
            ...query,
            ['rating[gte]']: String(e.target.value),
            ['rating[lt]']: String(e.target.value + 1),
            page: 1,
        });
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group onChange={onChange} value={Number(query['rating[gte]']) || ''}>
                <Space direction='vertical'>
                    <Radio value={1}>
                        <span className='cursor-pointer'>
                            <div className={cn('mt-[10px] flex items-center gap-1')}>
                                <Rate
                                    className='text-[12px] text-[#FFB800]'
                                    allowHalf
                                    disabled={true}
                                    defaultValue={1}
                                />
                                <span className='text-gray-500 text-[12px]'>{`(1)`}</span>
                            </div>
                        </span>
                    </Radio>
                    <Radio value={2}>
                        <span className='cursor-pointer'>
                            <div className={cn('mt-[10px] flex items-center gap-1')}>
                                <Rate
                                    className='text-[12px] text-[#FFB800]'
                                    allowHalf
                                    disabled={true}
                                    defaultValue={2}
                                />
                                <span className='text-gray-500 text-[12px]'>{`(2)`}</span>
                            </div>
                        </span>
                    </Radio>
                    <Radio value={3}>
                        <span className='cursor-pointer'>
                            <div className={cn('mt-[10px] flex items-center gap-1')}>
                                <Rate
                                    className='text-[12px] text-[#FFB800]'
                                    allowHalf
                                    disabled={true}
                                    defaultValue={3}
                                />
                                <span className='text-gray-500 text-[12px]'>{`(3)`}</span>
                            </div>
                        </span>
                    </Radio>
                    <Radio value={4}>
                        <span className='cursor-pointer'>
                            <div className={cn('mt-[10px] flex items-center gap-1')}>
                                <Rate
                                    className='text-[12px] text-[#FFB800]'
                                    allowHalf
                                    disabled={true}
                                    defaultValue={4}
                                />
                                <span className='text-gray-500 text-[12px]'>{`(4)`}</span>
                            </div>
                        </span>
                    </Radio>
                    <Radio value={5}>
                        <span className='cursor-pointer'>
                            <div className={cn('mt-[10px] flex items-center gap-1')}>
                                <Rate
                                    className='text-[12px] text-[#FFB800]'
                                    allowHalf
                                    disabled={true}
                                    defaultValue={5}
                                />
                                <span className='text-gray-500 text-[12px]'>{`(5)`}</span>
                            </div>
                        </span>
                    </Radio>
                </Space>
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterRating;

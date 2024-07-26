import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent } from 'antd';
import { IParams } from '~/types/Api';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import useFilter from '~/hooks/_common/useFilter';

const FilterBox = ({
    filterName,
    filterParams,
    data,
}: {
    filterName: string;
    filterParams: keyof Omit<IParams, 'page' | 'sort'>;
    data: ICategory[] | IBrand[];
}) => {
    const { query, updateQueryParam } = useFilter();
    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, [filterParams]: e.target.value.toString() });
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group
                buttonStyle='solid'
                className='flex flex-wrap gap-x-2 gap-y-6'
                onChange={onChange}
                value={query[filterParams] || ''}
            >
                {data.map((item) => (
                    <Radio.Button className='rounded-none border' key={item._id} value={item._id}>
                        {item.name}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterBox;

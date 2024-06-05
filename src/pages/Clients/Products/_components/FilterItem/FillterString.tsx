import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { IParams } from '~/types/Api';
import useFilters from '~/hooks/_common/useFilters';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';

const FilterString = ({
    filterName,
    filterParams,
    data,
}: {
    filterName: string;
    filterParams: keyof Omit<IParams, 'page' | 'sort'>;
    data: ICategory[] | IBrand[];
}) => {
    const { updateFilterAttribute, queryParams } = useFilters();
    const onChange = (e: RadioChangeEvent) => {
        updateFilterAttribute(filterParams, String(e.target.value));
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group onChange={onChange} value={queryParams[filterParams]}>
                <Space direction='vertical'>
                    {data.map((item) => (
                        <Radio key={item._id} value={item._id}>
                            {item.name}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </FilterWrap>
    );
};

export default FilterString;

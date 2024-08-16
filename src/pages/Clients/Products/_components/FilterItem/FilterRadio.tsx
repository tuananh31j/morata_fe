import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { IParams } from '~/types/Api';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import useFilter from '~/hooks/_common/useFilter';

const FilterRadio = ({
    filterName,
    filterParams,
    data,
}: {
    filterName: string;
    filterParams: keyof Pick<IParams, 'limit' | 'price' | 'brandId' | 'categoryId' | 'rating' | 'page' | 'sort'>;
    data: ICategory[] | IBrand[];
}) => {
    const { query, updateQueryParam } = useFilter();
    const onChange = (e: RadioChangeEvent) => {
        updateQueryParam({ ...query, [filterParams]: e.target.value.toString(), page: 1 });
    };
    return (
        <FilterWrap filterName={filterName}>
            <Radio.Group onChange={onChange} value={query[filterParams]}>
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

export default FilterRadio;

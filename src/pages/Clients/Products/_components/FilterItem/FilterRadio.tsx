import FilterWrap from './FilterWrap';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { IMenu } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import useFilter from '~/hooks/_common/useFilter';

const FilterRadio = ({
    filterName,
    filterParams,
    data,
}: {
    filterName: string;
    filterParams: string;
    data: IMenu[] | IBrand[];
}) => {
    const { query, updateQueryParam } = useFilter();
    const onChange = (e: RadioChangeEvent) => {
        const resetQuery = Object.keys(query).reduce((acc, key) => {
            return { ...acc, [key]: '' };
        }, {});
        updateQueryParam({ ...resetQuery, [filterParams]: e.target.value.toString(), page: String(1) });
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

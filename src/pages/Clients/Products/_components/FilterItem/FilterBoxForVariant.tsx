import FilterWrap from './FilterWrap';
import { Checkbox } from 'antd';
import useFilter from '~/hooks/_common/useFilter';
import { CheckboxProps } from 'antd/lib';

const FilterBoxForVariant = ({
    filterName,
    filterParams,
    data,
    prevKey,
    suffixKey,
}: {
    filterName: string;
    filterParams: string;
    data: string[];
    prevKey?: string;
    suffixKey?: string;
}) => {
    const filterKey = prevKey ? `${prevKey}${filterParams}` : filterParams;
    const { query, updateQueryParam } = useFilter();
    const opitons = query[filterKey] ? query[filterKey].split(',') : [];
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(e.target.value, e.target.checked);
        const old = query[filterKey] ? query[filterKey].split(',') : [];
        let newBrand: string[] = [];
        if (e.target.checked) {
            const copyBRandQuery = old.filter((item: string) => item !== e.target.value);
            newBrand = [...copyBRandQuery, e.target.value];
        } else {
            newBrand = old.filter((item: string) => item !== e.target.value);
        }
        if (suffixKey) {
            newBrand = [suffixKey, ...newBrand];
        }
        updateQueryParam({ ...query, [filterKey]: newBrand.join(',') });
    };

    return (
        <FilterWrap filterName={filterName}>
            <Checkbox.Group className='flex flex-wrap gap-x-2 gap-y-6' value={opitons}>
                {data.map((item, i) => (
                    <Checkbox onChange={onChange} key={i} value={item}>
                        {item}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </FilterWrap>
    );
};

export default FilterBoxForVariant;

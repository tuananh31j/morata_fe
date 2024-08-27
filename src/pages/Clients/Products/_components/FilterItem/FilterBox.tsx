import FilterWrap from './FilterWrap';
import { Checkbox } from 'antd';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import useFilter from '~/hooks/_common/useFilter';
import { CheckboxProps } from 'antd/lib';
import { cn } from '~/utils';

const FilterBox = ({
    filterName,
    filterParams,
    data,
}: {
    filterName: string;
    filterParams: string;
    data: ICategory[] | IBrand[];
}) => {
    const { query, updateQueryParam } = useFilter();
    const opitons = query[filterParams] ? query[filterParams].split(',') : [];
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(e.target.value, e.target.checked);
        const old = query[filterParams] ? query[filterParams].split(',') : [];
        let newBrand: string[] = [];
        if (e.target.checked) {
            const copyBRandQuery = old.filter((item: string) => item !== e.target.value);
            newBrand = [...copyBRandQuery, e.target.value];
        } else {
            newBrand = old.filter((item: string) => item !== e.target.value);
        }
        updateQueryParam({ ...query, [filterParams]: newBrand.join(','), page: 1 });
    };

    return (
        <FilterWrap filterName={filterName}>
            <Checkbox.Group className='flex flex-wrap gap-x-2 gap-y-6' value={opitons}>
                {data.map((item) => (
                    <Checkbox
                        onChange={onChange}
                        className={cn('hidden-checkbox rounded-none border-2 border-black border-opacity-10', {
                            [`rounded-md border-blue-700 border-opacity-100 shadow-2xl shadow-blue-600`]:
                                opitons.includes(item._id),
                        })}
                        key={item._id}
                        value={item._id}
                    >
                        {item.name}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </FilterWrap>
    );
};

export default FilterBox;

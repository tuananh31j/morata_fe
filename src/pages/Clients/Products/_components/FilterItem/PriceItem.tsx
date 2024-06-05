import FilterItem from './FilterWrap';
import { useMemo, useState } from 'react';
import { InputNumber, Slider } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import _, { debounce, parseInt } from 'lodash';
import useFilters from '~/hooks/_common/useFilters';

const PriceFilterItem = () => {
    const [isDispatch, setIsDispatch] = useState<boolean>(false);
    const { updateFilterAttribute, queryParams } = useFilters();
    const queryObj = queryParams.price
        ? _.map(Object.values(JSON.parse(queryParams.price)), (str) => parseInt(str as string))
        : [0, 1000];
    const debouncedUpdateFilterAttribute = useMemo(
        () =>
            debounce((value) => updateFilterAttribute('price', JSON.stringify({ min: value[0], max: value[1] })), 2000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDispatch]
    );
    const handleSliderChange = (value: number[]) => {
        debouncedUpdateFilterAttribute(value);
    };
    return (
        <FilterItem filterName='Price'>
            <div>
                <Slider min={0} max={1000} range defaultValue={queryObj} onChangeComplete={handleSliderChange} />
                <div className='flex items-center justify-center gap-3'>
                    <InputNumber
                        className='flex-1'
                        value={Number(queryObj[0])}
                        onBlur={() => setIsDispatch(!isDispatch)}
                        onChange={(value) => handleSliderChange([value!, Number(queryObj[1])])}
                    />
                    <MinusOutlined />

                    <InputNumber
                        className='flex-1'
                        value={Number(queryObj[1])}
                        onBlur={() => setIsDispatch(!isDispatch)}
                        onChange={(value) => handleSliderChange([Number(queryObj[0]), value!])}
                    />
                </div>
            </div>
        </FilterItem>
    );
};

export default PriceFilterItem;

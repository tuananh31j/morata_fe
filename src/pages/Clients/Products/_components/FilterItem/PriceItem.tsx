import FilterItem from './FilterItem';
import { FC, useState } from 'react';
import { InputNumber, Slider } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

type IPriceFilterProps = {
    handleFilterPrice: (priceFilter: { min: number; max: number }) => void;
};

const PriceFilterItem: FC<IPriceFilterProps> = ({ handleFilterPrice }) => {
    const [sliderValue, setSliderValue] = useState([0, 20000]);

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
        handleFilterPrice({ min: value[0], max: value[1] });
    };
    return (
        <FilterItem filterName='Price'>
            <div>
                <Slider min={0} max={1000} range defaultValue={sliderValue} onChange={handleSliderChange} />
                <div className='flex items-center justify-center gap-3'>
                    <InputNumber
                        className='flex-1'
                        value={sliderValue[0]}
                        onChange={(value) => handleSliderChange([value!, sliderValue[1]])}
                    />
                    <MinusOutlined />

                    <InputNumber
                        className='flex-1'
                        value={sliderValue[1]}
                        onChange={(value) => handleSliderChange([sliderValue[0], value!])}
                    />
                </div>
            </div>
        </FilterItem>
    );
};

export default PriceFilterItem;

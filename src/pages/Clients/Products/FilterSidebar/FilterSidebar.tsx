import useResponsive from '~/hooks/_common/useResponsive';
import { InputNumber, Slider } from 'antd';
import { useState } from 'react';
import { MinusOutlined } from '@ant-design/icons';
import FilterItem from '~/pages/Clients/Products/_components/FilterItem';
import FilterDrawer from '~/pages/Clients/Products/_components/FilterDrawer';

const randomColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'teal',
    'cyan',
    'magenta',
    'brown',
    'black',
];
const companyNames = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Microsoft', 'Asus'];

const FilterSidebar = () => {
    const { isMobile, isTablet } = useResponsive();

    const [sliderValue, setSliderValue] = useState([20, 50]);

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value);
    };

    return (
        <div className='rounded-md border border-transparent bg-white p-4'>
            {isMobile && <FilterDrawer />}
            {isTablet && (
                <div className='relative hidden h-full md:block'>
                    <FilterItem filterType='Brand' boxType data={companyNames} />
                    <FilterItem colorType filterType='Color' data={randomColors} />
                    <FilterItem filterType='Price'>
                        <div>
                            <Slider range defaultValue={sliderValue} onChange={handleSliderChange} />
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
                    <FilterItem filterType='Screen' data={[1, 1, 1, 1, 1, 1, 1, 2]} />
                    <button className='my-4 w-full rounded-md border border-[#1e3a8a] bg-[#1e3a8a] p-3 hover:text-white'>
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;

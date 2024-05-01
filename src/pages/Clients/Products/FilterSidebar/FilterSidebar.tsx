import useResponsive from '~/hooks/useResponsive';
import FilterDrawer from '../Components/FilterDrawer';
import FilterItem from '../Components/FilterItem';
import { InputNumber, Slider } from 'antd';
import { useState } from 'react';
import { MinusOutlined } from '@ant-design/icons';

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

                    {/* <div className='bg-white'>
                        <p className='m-3 text-[14px] font-bold'>Khoảng giá</p>
                        <div className='m-3 flex  items-center justify-between gap-2'>
                            <InputNumber className='' min={1} max={10} defaultValue={3} />
                            <InputNumber className='' min={1} max={10} defaultValue={3} />
                        </div>
                        <div className='  m-3  flex  items-center justify-between  gap-3'>
                            <button className='flex-1 rounded-md border border-gray-600 p-3 hover:bg-slate-400 hover:text-white'>
                                Reset
                            </button>
                            <button className='bg__hover flex-1 rounded-md border border-blue-600 p-3 hover:text-white'>
                                Apply
                            </button>
                        </div>
                    </div> */}
                    <button className='bg__hover my-4 w-full rounded-md border border-[#1e3a8a] p-3 hover:text-white'>
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;

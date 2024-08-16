import FilterItem from './FilterWrap';
import { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Slider } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import useFilter from '~/hooks/_common/useFilter';
import { FormProps } from 'antd/lib/form';

type FieldType = {
    larger?: number;
    smaller?: number;
};
const PriceFilterItem = () => {
    const defaultMin = 0;
    const defaultMax = 10000000;
    const { query, updateQueryParam } = useFilter();
    const [value, setValue] = useState<number[]>([defaultMin, 9999999]);

    const onChnageInputMin = (valueMin: number | null) => {
        if (valueMin !== null) {
            setValue([valueMin, value[1]]);
        }
    };
    const onChnageInputMax = (valueMax: number | null) => {
        console.log(valueMax, 'onChnageInputMax');
        if (valueMax !== null) {
            setValue([value[0], valueMax]);
        }
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        updateQueryParam({ ...query, ['rawprice[gte]']: value[0], ['rawprice[lte]']: value[1] });
    };

    useEffect(() => {
        const minValue = query['rawprice[gte]'] ? Number(query['rawprice[gte]']) : defaultMin;
        const maxValue = query['rawprice[lte]'] ? Number(query['rawprice[lte]']) : defaultMax;
        setValue([minValue, maxValue]);
    }, [query]);

    return (
        <FilterItem filterName='Giá'>
            <Form onFinish={onFinish}>
                <Slider
                    min={defaultMin}
                    max={defaultMax}
                    range={{ draggableTrack: true }}
                    value={value}
                    onChange={setValue}
                />
                <div className='flex items-center justify-between'>
                    <Form.Item>
                        <InputNumber value={value[0]} onChange={onChnageInputMin} placeholder='Giá tiền tối thiểu' />
                    </Form.Item>
                    <div className=''>
                        <MinusOutlined />
                    </div>
                    <Form.Item>
                        <InputNumber value={value[1]} onChange={onChnageInputMax} placeholder='Giá tiền tối đa' />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button className='w-full' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </FilterItem>
    );
};

export default PriceFilterItem;

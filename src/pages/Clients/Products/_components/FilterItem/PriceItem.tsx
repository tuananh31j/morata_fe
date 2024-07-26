import FilterItem from './FilterWrap';
import { useMemo, useState } from 'react';
import { Form, InputNumber, Slider } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import _, { debounce, parseInt } from 'lodash';
import useFilter from '~/hooks/_common/useFilter';
import { FormProps } from 'antd/lib/form';

type FieldType = {
    larger?: number;
    smaller?: number;
};
const PriceFilterItem = () => {
    const [isDispatch, setIsDispatch] = useState<boolean>(false);
    // const { query, updateQueryParam } = useFilter();

    const handleSubmit = (value: number[]) => {
        console.log(value);
        // updateQueryParam({ ...query, ['price[gte]']: value[0], ['price[lte]']: value[1] });
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (
        <FilterItem filterName='Price'>
            <Form onFinish={onFinish}>
                <div className='flex items-center justify-center gap-3'>
                    <Form.Item>
                        {' '}
                        <InputNumber className='flex-1' onBlur={() => setIsDispatch(!isDispatch)} />
                        <MinusOutlined />
                    </Form.Item>
                    <Form.Item>
                        <InputNumber className='flex-1' onBlur={() => setIsDispatch(!isDispatch)} />
                    </Form.Item>
                </div>
            </Form>
        </FilterItem>
    );
};

export default PriceFilterItem;

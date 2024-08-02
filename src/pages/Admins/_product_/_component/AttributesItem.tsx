import { Form, Input, Select } from 'antd';
import { IAttributesValue } from '~/types/Attributes';

const AttributesItem = ({
    attribute,
    defaultValue,
}: {
    attribute: IAttributesValue;
    defaultValue?: {
        key: string;
        name: string;
        value: string;
        _id: string;
    }[];
}) => {
    return (
        <Form.Item
            name={['attributes', attribute.attributeKey]}
            label={attribute.name}
            required={attribute.isRequired}
            className='text-lg font-medium text-[#08090F]'
            rules={[
                {
                    required: attribute.isRequired,
                    message: 'Please input your attribute!',
                },
            ]}
        >
            {attribute.type === 'options' && (
                <Select placeholder='Please select'>
                    {attribute.values.map((value, index) => (
                        <Select.Option value={value} key={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            )}
            {attribute.type === 'manual' && <Input placeholder='Please input' />}
        </Form.Item>
    );
};

export default AttributesItem;

import { Form, Input, Select } from 'antd';
import { AttributeType } from '~/constants/enum';
import { IAttributesValue } from '~/types/Attributes';
import { validateNoUnderscore } from '~/validation/Products/validators';

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
            className='capitalize'
            name={['attributes', attribute.attributeKey]}
            label={attribute.name}
            required={attribute.isRequired}
            // initialValue={initialValue} // Set default value
            rules={[
                {
                    required: attribute.isRequired,
                    message: `Thuộc tính bắt buộc, vui lòng nhập giá trị của ${attribute.name}!`,
                },
                {
                    validator: validateNoUnderscore,
                },
            ]}
        >
            {/* <Input placeholder={`Hãy nhập ${attribute.name}`} /> */}
            {attribute.type === AttributeType.Options && (
                <Select placeholder='Please select'>
                    {attribute.values.map((value, index) => (
                        <Select.Option value={value} key={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            )}
            {attribute.type === AttributeType.Multiple && (
                <Select mode='multiple' placeholder='Please select'>
                    {attribute.values.map((value, index) => (
                        <Select.Option value={value} key={index}>
                            {value}
                        </Select.Option>
                    ))}
                </Select>
            )}
            {attribute.type === 'manual' && <Input placeholder={`Hãy nhập ${attribute.name}`} />}
        </Form.Item>
    );
};

export default AttributesItem;

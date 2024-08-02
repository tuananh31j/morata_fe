import { Form, Input, Select } from 'antd';
import { IAttributesValue } from '~/types/Attributes';

type IDefaultValue = {
    _id: string;
    key: string;
    value: string;
};

const AttributesItem = ({
    attribute,
    defaultValue,
}: {
    attribute: IAttributesValue;
    defaultValue?: IDefaultValue[];
}) => {
    const initialValue = defaultValue?.find((item) => item.key === attribute.attributeKey)?.value;
    return (
        <Form.Item
            name={['attributes', attribute.attributeKey]}
            label={attribute.name}
            required={attribute.isRequired}
            initialValue={initialValue} // Set default value
            rules={[
                {
                    required: attribute.isRequired,
                    message: 'Please input your attribute!',
                },
            ]}
        >
            {attribute.type === 'options' && (
                <Select placeholder='Please select'>
                    {attribute.values.map((value: string, index: number) => (
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

import { MinusCircleOutlined, PlusOutlined, PlusSquareOutlined, QuestionOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Popover, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AttributeType } from '~/constants/enum';
import useMessage from '~/hooks/_common/useMessage';
import useUpdateAttribute from '~/hooks/attributes/Mutations/useUpdateAttribute';
import useGetDetailsAttribute from '~/hooks/attributes/Queries/useGetDetailsAttribute';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

const CreateAttribute = () => {
    const { id } = useParams();
    const [form] = Form.useForm<IAttributeFormData>();
    const { data: attributeDetailsRes } = useGetDetailsAttribute(id as string);
    const { mutate: updateAttribute, isPending, isSuccess, isError } = useUpdateAttribute();
    const { handleMessage, contextHolder } = useMessage();

    const [typeSelected, setTypeSelected] = useState<AttributeType>();

    const handleChange = (value: AttributeType) => {
        setTypeSelected(value);
    };

    const onFinish: FormProps<IAttributeFormData>['onFinish'] = (values) => {
        if (id) {
            updateAttribute({ _id: id, ...values });
        }
    };
    useEffect(() => {
        if (attributeDetailsRes) {
            form.setFieldsValue(attributeDetailsRes.data as IAttributeFormData);
            setTypeSelected(attributeDetailsRes.data.type);
        }
    }, [attributeDetailsRes, id]);

    useEffect(() => {
        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
        if (isError) {
            showMessage('Attribute creation failed!', 'error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPending, isSuccess, isError]);

    return (
        <>
            {contextHolder}
            <div className='rounded-lg bg-white'>
                <div className='m-auto'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        initialValues={{ isRequired: false, isVariant: false }}
                    >
                        <div>
                            <div className='p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Create a new attribute</h3>
                                <Form.Item<IAttributeFormData> label='Name' name='_id' className='hidden'>
                                    <Input />
                                </Form.Item>
                                <div className='flex gap-1'>
                                    <Form.Item<IAttributeFormData>
                                        label='Name'
                                        name='name'
                                        className='w-1/2 font-medium text-[#08090F]'
                                        rules={[{ required: true, message: 'Please enter attribute name!' }]}
                                    >
                                        <Input size='large' />
                                    </Form.Item>

                                    <Form.Item<IAttributeFormData>
                                        label='Type'
                                        name='type'
                                        className='w-1/2 font-medium text-[#08090F]'
                                        rules={[{ required: true, message: 'Please choose a type!' }]}
                                    >
                                        <Select
                                            className='h-[39.6px]'
                                            placeholder='Select a type'
                                            onChange={handleChange}
                                            options={[
                                                { value: AttributeType.Manual, label: <span>Manual</span> },
                                                {
                                                    value: AttributeType.Options,
                                                    label: (
                                                        <span className='flex items-center justify-between'>
                                                            <span>Options</span>
                                                            <Popover
                                                                content='Create options for attributes. Streamlines the addition of new items with precision and ease, while enhancing the customer experience by simplifying product selection.'
                                                                title='Recommended'
                                                            >
                                                                <Button
                                                                    icon={<QuestionOutlined />}
                                                                    size='small'
                                                                    type='text'
                                                                />
                                                            </Popover>
                                                        </span>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item<IAttributeFormData>
                                    name='isVariant'
                                    valuePropName='checked'
                                    className='w-1/2 font-medium text-[#08090F]'
                                >
                                    <Checkbox>
                                        Is this an attribute for the variant
                                        <Popover
                                            content='This question asks if the given attribute is specific to a product variant.'
                                            title='Explanation of the Question'
                                        >
                                            <Button icon={<QuestionOutlined />} size='small' type='text' />
                                        </Popover>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item<IAttributeFormData>
                                    name='isRequired'
                                    valuePropName='checked'
                                    className='w-1/2 font-medium text-[#08090F]'
                                >
                                    <Checkbox>
                                        Require
                                        <Popover
                                            content='This question is asking whether the attribute in question is mandatory'
                                            title='Explanation of the Question'
                                        >
                                            <Button icon={<QuestionOutlined />} size='small' type='text' />
                                        </Popover>
                                    </Checkbox>
                                </Form.Item>

                                {typeSelected === AttributeType.Options && (
                                    <Form.List
                                        name='values'
                                        rules={[
                                            {
                                                validator: async (_, names) => {
                                                    if (!names || names.length < 1) {
                                                        return Promise.reject(
                                                            new Error(
                                                                'Please input at least one value or switch type to manual!'
                                                            )
                                                        );
                                                    }

                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map((field, index) => (
                                                    <Form.Item
                                                        label={
                                                            index === 0 ? (
                                                                <span className='text-sm font-semibold'>
                                                                    Enter new value
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message:
                                                                        'Please input value name or delete this field.',
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input placeholder='Enter value' style={{ width: '50%' }} />
                                                        </Form.Item>

                                                        {fields.length > 0 ? (
                                                            <MinusCircleOutlined
                                                                className='dynamic-delete-button ml-2'
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        ) : null}
                                                    </Form.Item>
                                                ))}

                                                <Form.Item>
                                                    <Button
                                                        type='dashed'
                                                        onClick={() => add()}
                                                        // style={{ width: '50%' }}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add field
                                                    </Button>

                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                )}
                                <Form.Item className='flex justify-end'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<PlusSquareOutlined />}
                                        className='mr-3 px-5'
                                        size='large'
                                        loading={isPending}
                                        disabled={isPending}
                                    >
                                        Add Attribute
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateAttribute;

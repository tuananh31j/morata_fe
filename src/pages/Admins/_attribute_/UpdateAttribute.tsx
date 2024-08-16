import { DeleteOutlined, PlusCircleOutlined, PlusSquareOutlined, QuestionOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Popover, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMessage from '~/hooks/_common/useMessage';
import useUpdateAttribute from '~/hooks/attributes/Mutations/useUpdateAttribute';
import useGetDetailsAttribute from '~/hooks/attributes/Queries/useGetDetailsAttribute';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

const UpdateAttribute = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // @Form
    const [form] = Form.useForm<IAttributeFormData>();
    const { mutate: createAttribute, isPending, isSuccess, isError } = useUpdateAttribute();
    const { data: attributeDetailsRes } = useGetDetailsAttribute(id as string);
    const { handleMessage, contextHolder } = useMessage();
    // const [attributeOptions, setAttributeOptions] = useState<{ label: string; value: string; values: string[] }[]>([]);

    const [inputFields, setInputFields] = useState([{ id: Date.now(), value: '' }]);

    const handleAddField = () => {
        // Check if the first input field is filled
        if (inputFields[0].value.trim() === '') {
            handleMessage({ type: 'error', content: 'Please enter at least one value!' });
            return;
        }
        setInputFields([...inputFields, { id: Date.now(), value: '' }]);
    };

    const handleRemoveField = (fieldId: number) => {
        setInputFields(inputFields.filter((field) => field.id !== fieldId));
    };

    const [typeSelected, setTypeSelected] = useState<string>('');

    const handleChange = (value: string) => {
        setTypeSelected(value);
    };

    const onFinish: FormProps<IAttributeFormData>['onFinish'] = (values) => {
        // Filter out empty values
        console.log(values, 'values');
        const inputValues = inputFields.map((field) => field.value).filter((value) => value.trim() !== '');
        const payload = { ...values, values: inputValues };

        createAttribute(payload);
    };
    useEffect(() => {
        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }

        if (isSuccess) {
            showMessage('Attribute created successfully!', 'success');
            navigate('/admin/categories/create', { replace: true });
        }

        if (isError) {
            showMessage('Attribute creation failed!', 'error');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPending, isSuccess, isError]);

    useEffect(() => {
        if (attributeDetailsRes && id) {
            console.log(attributeDetailsRes);

            form.setFieldsValue({
                ...attributeDetailsRes.data,
                values: attributeDetailsRes.data.values.map(String),
            });
        }
    }, [attributeDetailsRes, id, form]);

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        initialValues={{ isRequired: false, isVariant: false }}
                    >
                        <div>
                            <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Create a new attribute</h3>

                                <div className='flex gap-1'>
                                    <Form.Item<IAttributeFormData> name='_id' className='hidden'>
                                        <Input size='large' />
                                    </Form.Item>
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
                                                { value: 'manual', label: <span>Manual</span> },
                                                {
                                                    value: 'options',
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
                                {typeSelected === 'options' && (
                                    <>
                                        {inputFields.map((field, index) => (
                                            <Form.Item
                                                key={field.id}
                                                name='values'
                                                label='Add New Value'
                                                className='mb-3 font-medium text-[#08090F]'
                                                rules={[
                                                    { required: true, message: 'Please enter at least one value!' },
                                                ]}
                                            >
                                                <div className='flex w-full justify-between'>
                                                    <Input
                                                        className='w-[93%]'
                                                        placeholder='Enter value'
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            const newFields = [...inputFields];
                                                            newFields[index].value = e.target.value;
                                                            setInputFields(newFields);
                                                        }}
                                                    />
                                                    <Button
                                                        danger
                                                        className='flex items-center'
                                                        onClick={() => handleRemoveField(field.id)}
                                                    >
                                                        <DeleteOutlined />
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        ))}

                                        <Button type='primary' icon={<PlusCircleOutlined />} onClick={handleAddField}>
                                            Add value
                                        </Button>
                                    </>
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

export default UpdateAttribute;

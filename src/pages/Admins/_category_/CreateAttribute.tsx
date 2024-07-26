import { DeleteOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from '~/hooks/_common/useMessage';
import { useMutationCreateAttribute } from '~/hooks/attributes/Mutations/useCreateAttribute';
import { IAttributeFormData } from '~/types/Category';

const CreateAttribute = () => {
    const navigate = useNavigate();
    const { mutate: createAttribute, isPending } = useMutationCreateAttribute();
    const { handleMessage, contextHolder } = useMessage();

    const [inputFields, setInputFields] = useState([{ id: Date.now(), value: '' }]);

    const handleAddField = () => {
        // Check if the first input field is filled
        if (inputFields[0].value.trim() === '') {
            handleMessage({ type: 'error', content: 'Please enter at least one value!' });
            return;
        }
        setInputFields([...inputFields, { id: Date.now(), value: '' }]);
    };

    const handleRemoveField = (id: number) => {
        setInputFields(inputFields.filter((field) => field.id !== id));
    };

    const [typeSelected, setTypeSelected] = useState<string>('');

    const handleChange = (value: string) => {
        setTypeSelected(value);
    };

    const onFinish: FormProps<IAttributeFormData>['onFinish'] = (values) => {
        // Filter out empty values
        const inputValues = inputFields.map((field) => field.value).filter((value) => value.trim() !== '');
        const payload = { ...values, values: inputValues };

        createAttribute(payload);
        navigate('/admin/categories/create', { replace: true, state: { newAttribute: payload } });

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
    };

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <div>
                            <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Create a new attribute</h3>

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
                                                { value: 'manual', label: <span>Manual</span> },
                                                { value: 'options', label: <span>Options</span> },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>

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

                                {/* {inputFields.map((field, index) => (
                                    <Form.Item
                                        key={field.id}
                                        name='values'
                                        label='Add New Value'
                                        className='mb-3 font-medium text-[#08090F]'
                                        rules={[{ required: true, message: 'Please enter at least one value!' }]}
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
                                </Button> */}

                                <Form.Item className='flex justify-end'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<PlusSquareOutlined />}
                                        className='mr-3 px-5'
                                        size='large'
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

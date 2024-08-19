import { MinusCircleOutlined, PlusOutlined, PlusSquareOutlined, QuestionOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Popover, Select } from 'antd';
import { useEffect, useState } from 'react';
import useMessage from '~/hooks/_common/useMessage';
import { useMutationCreateAttribute } from '~/hooks/attributes/Mutations/useCreateAttribute';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { ADMIN_ROUTES } from '~/constants/router';
import { Link } from 'react-router-dom';

const CreateAttribute = () => {
    const { mutate: createAttribute, isPending, isSuccess, isError } = useMutationCreateAttribute();
    const { handleMessage, contextHolder } = useMessage();

    const [typeSelected, setTypeSelected] = useState<string>('');

    const handleChange = (value: string) => {
        setTypeSelected(value);
    };

    const onFinish: FormProps<IAttributeFormData>['onFinish'] = (values) => {
        createAttribute(values);
    };

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
            <WrapperPageAdmin
                title='Tạo mới thuộc tính'
                option={
                    <Link to={ADMIN_ROUTES.ATTRIBUTES} className='underline'>
                        Quay lại
                    </Link>
                }
            >
                <Form layout='vertical' onFinish={onFinish} initialValues={{ isRequired: false, isVariant: false }}>
                    <div>
                        <div>
                            <div className='flex gap-4'>
                                <Form.Item<IAttributeFormData>
                                    label='Tên thuộc tính'
                                    name='name'
                                    className='w-1/2 font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Vui lòng nhập tên cho thuộc tính!' }]}
                                >
                                    <Input placeholder='Nhập tên cho thuộc tính...' size='large' />
                                </Form.Item>

                                <Form.Item<IAttributeFormData>
                                    label='Loại thuộc tính'
                                    name='type'
                                    className='w-1/2 font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Vui lòng chọn kiểu cho thuộc tính!' }]}
                                >
                                    <Select
                                        className='h-[39.6px]'
                                        placeholder='Chọn loại thuộc tính'
                                        onChange={handleChange}
                                        options={[
                                            { value: 'manual', label: <span>Kiểu nhập tay</span> },
                                            {
                                                value: 'options',
                                                label: (
                                                    <span className='flex items-center justify-between'>
                                                        <span>Kiểu lựa chọn</span>
                                                        <Popover
                                                            zIndex={999999}
                                                            content='Loại thuộc tính này sẽ yêu cầu nhập giá trị dưới dạng lựa chọn cho sản phẩm của bạn'
                                                            title='Khuyên dùng'
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
                                    Thuộc tính này là dành cho biến thể sản phẩm
                                    <Popover
                                        content='Khi tạo mới biến thể của sản phẩm sẽ yêu cầu nhập giá trị cho thuộc tính này'
                                        title='Giải thích câu hỏi'
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
                                    Bắt buộc
                                    <Popover
                                        content='Khi tạo mới sản phẩm sẽ yêu cầu nhập giá trị cho thuộc tính này'
                                        title='Giải thích câu hỏi'
                                    >
                                        <Button icon={<QuestionOutlined />} size='small' type='text' />
                                    </Popover>
                                </Checkbox>
                            </Form.Item>

                            {typeSelected === 'options' && (
                                // <>
                                //     {inputFields.map((field, index) => (
                                //         <Form.Item
                                //             key={field.id}
                                //             name='values'
                                //             label='Add New Value'
                                //             className='mb-3 font-medium text-[#08090F]'
                                //             rules={[
                                //                 { required: true, message: 'Please enter at least one value!' },
                                //             ]}
                                //         >
                                //             <div className='flex w-full justify-between'>
                                //                 <Input
                                //                     className='w-[93%]'
                                //                     placeholder='Enter value'
                                //                     value={field.value}
                                //                     onChange={(e) => {
                                //                         const newFields = [...inputFields];
                                //                         newFields[index].value = e.target.value;
                                //                         setInputFields(newFields);
                                //                     }}
                                //                 />
                                //                 <Button
                                //                     danger
                                //                     className='flex items-center'
                                //                     onClick={() => handleRemoveField(field.id)}
                                //                 >
                                //                     <DeleteOutlined />
                                //                 </Button>
                                //             </div>
                                //         </Form.Item>
                                //     ))}

                                //     <Button type='primary' icon={<PlusCircleOutlined />} onClick={handleAddField}>
                                //         Add value
                                //     </Button>
                                // </>

                                <>
                                    <Form.List
                                        name='values'
                                        rules={[
                                            {
                                                validator: async (_, names) => {
                                                    if (!names || names.length < 1) {
                                                        return Promise.reject(new Error('Yêu cầu nhập giá trị!'));
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
                                                        required
                                                        label={
                                                            index === 0 ? (
                                                                <span className='text-sm font-semibold'>Giá trị</span>
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
                                                                    message: 'Yêu cầu nhập giá trị!',
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input
                                                                placeholder='Nhập giá trị thuộc tính'
                                                                style={{ width: '50%' }}
                                                            />
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
                                                        Thêm giá trị
                                                    </Button>

                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
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
                                    Thêm mới
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </WrapperPageAdmin>
        </>
    );
};

export default CreateAttribute;

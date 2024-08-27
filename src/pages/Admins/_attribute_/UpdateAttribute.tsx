import { MinusCircleOutlined, PlusOutlined, PlusSquareOutlined, QuestionOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Popover, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AttributeType } from '~/constants/enum';
import useUpdateAttribute from '~/hooks/attributes/Mutations/useUpdateAttribute';
import useGetDetailsAttribute from '~/hooks/attributes/Queries/useGetDetailsAttribute';
import { IAttributeFormData } from '~/types/Category';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { ADMIN_ROUTES } from '~/constants/router';

const CreateAttribute = () => {
    const { id } = useParams();
    const [form] = Form.useForm<IAttributeFormData>();
    const { data: attributeDetailsRes } = useGetDetailsAttribute(id as string);
    const { mutate: updateAttribute, isPending } = useUpdateAttribute();

    const [typeSelected, setTypeSelected] = useState<AttributeType>();

    const handleChange = (value: AttributeType) => {
        setTypeSelected(value);
    };

    const onFinish: FormProps<IAttributeFormData>['onFinish'] = (values) => {
        if (values.type === AttributeType.Multiple) values.isVariant = false;
        if (values.isFilter) values.type = AttributeType.Options;
        if (id) {
            updateAttribute({ _id: id, ...values });
        }
    };
    useEffect(() => {
        if (attributeDetailsRes) {
            form.setFieldsValue(attributeDetailsRes.data as IAttributeFormData);
            setTypeSelected(attributeDetailsRes.data.type);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeDetailsRes, id]);

    return (
        <>
            <WrapperPageAdmin
                title='Cập nhật thuộc tính'
                option={
                    <Link to={ADMIN_ROUTES.ATTRIBUTES} className='underline'>
                        Quay lại
                    </Link>
                }
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={{ isRequired: false, isVariant: false }}
                >
                    <div>
                        <div>
                            <Form.Item<IAttributeFormData> label='Name' name='_id' className='hidden'>
                                <Input />
                            </Form.Item>
                            <div className='flex gap-1'>
                                <Form.Item<IAttributeFormData>
                                    label='Tên thuôc tính'
                                    name='name'
                                    className='w-1/2 font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Yêu cầu bắt buộc!' }]}
                                >
                                    <Input placeholder='Nhập tên thuộc tính...' size='large' />
                                </Form.Item>

                                <Form.Item<IAttributeFormData>
                                    label='Loại thuộc tính'
                                    name='type'
                                    className='w-1/2 font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Vui lòng chọn kiểu cho thuộc tính!' }]}
                                >
                                    <Select
                                        className='h-[39.6px]'
                                        placeholder='chọn loại thuộc tính'
                                        onChange={handleChange}
                                        options={[
                                            { value: AttributeType.Manual, label: <span>Kiểu nhập tay</span> },
                                            { value: AttributeType.Multiple, label: <span>Kiểu lựa chọn nhiều</span> },
                                            {
                                                value: AttributeType.Options,
                                                label: (
                                                    <span className='flex items-center justify-between'>
                                                        <span>Kiểu lựa chọn</span>
                                                        <Popover
                                                            content='Loại thuộc tính này sẽ yêu cầu nhập giá trị dưới dạng lựa chọn khi tạo mới sản phẩm'
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
                            <Form.Item<IAttributeFormData>
                                name='isVariant'
                                valuePropName='checked'
                                className='w-1/2 font-medium text-[#08090F]'
                            >
                                {typeSelected !== AttributeType.Multiple && (
                                    <Checkbox>
                                        Thuộc tính này là dành cho biến thể sản phẩm
                                        <Popover
                                            content='Khi tạo mới biến thể của sản phẩm sẽ yêu cầu nhập giá trị cho thuộc tính này'
                                            title='Giải thích câu hỏi'
                                        >
                                            <Button icon={<QuestionOutlined />} size='small' type='text' />
                                        </Popover>
                                    </Checkbox>
                                )}
                            </Form.Item>
                            <Form.Item<IAttributeFormData>
                                name='isFilter'
                                valuePropName='checked'
                                className='w-1/2 font-medium text-[#08090F]'
                            >
                                {typeSelected === AttributeType.Options && (
                                    <Checkbox>
                                        Áp dụng cho bộ lọc
                                        <Popover
                                            content='Giúp người dùng lọc sản phẩm dễ dàng hơn nhưng với điều kiện là thuộc tính phải thuộc kiểu lựa chọn'
                                            title='Giải thích câu hỏi'
                                        >
                                            <Button icon={<QuestionOutlined />} size='small' type='text' />
                                        </Popover>
                                    </Checkbox>
                                )}
                            </Form.Item>

                            {(typeSelected === AttributeType.Options || typeSelected === AttributeType.Multiple) && (
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
                                    Cập nhật
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

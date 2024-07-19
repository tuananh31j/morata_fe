import { DeleteOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Form, FormProps, GetProp, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useMessage from '~/hooks/_common/useMessage';
import { useGetAllAtributesNew } from '~/hooks/attributes/Queries/useGetAllAttributes';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();
    const { data } = useGetAllAtributesNew();
    const attributes = data?.data;

    const [attributeOptions, setAttributeOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedAttributeIds, setSelectedAttributeIds] = useState<string[]>([]); // New state for selected attribute IDs

    useEffect(() => {
        if (attributes) {
            const options = attributes.map((attr: { _id: string; name: string }) => ({
                label: attr.name,
                value: attr._id,
            }));
            setAttributeOptions(options);
        }
    }, [attributes]);

    const { handleMessage, contextHolder } = useMessage();

    // const categorySchema = z.object({
    //     name: z.string({ message: 'Name is required!' }),
    //     type: z.string({ message: 'Type is required!' }),
    //     attributeIds: z.array(z.string()).min(1, { message: 'At least one attribute must be selected!' }),
    // });

    // const {
    //     handleSubmit,
    //     control,
    //     formState: { errors },
    //     // watch,
    // } = useForm<ICategoryFormData>({
    //     // resolver: zodResolver(categorySchema),
    // });

    // const onSubmit: SubmitHandler<ICategoryFormData> = async (body) => {
    //     const formData = { ...body, attributeIds: selectedAttributeIds }; // Include selected attribute IDs
    //     console.log('onsubmit:', formData);
    //     console.log('from submit:', attributeIds);
    //     createCategory(body);
    //     navigate('/admin/category', { replace: true });

    //     if (isPending) {
    //         handleMessage({ type: 'loading', content: '...Creating!' });
    //     }
    // };

    // const checkboxChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    //     console.log('from onchange:', checkedValues);
    // };

    // const selectChange = (value: string) => {
    //     console.log(`selected ${value}`);
    // };

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        console.log('Success:', values);

        createCategory(values);
        navigate('/admin/categories', { replace: true });

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-xl font-medium text-primary'>Create a new category</h3>

                            <Form.Item<ICategoryFormData>
                                label='Name'
                                name='name'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please enter category name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* <Form.Item<ICategoryFormData>
                                label='Type'
                                name='type'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please choose a type!' }]}
                            >
                                <Select
                                    className='w-1/2'
                                    placeholder='Select a type'
                                    onChange={selectChange}
                                    options={[
                                        { value: 'Manual', label: <span>Manual</span> },
                                        { value: 'Options', label: <span>Options</span> },
                                    ]}
                                />
                            </Form.Item> */}

                            <Form.Item<ICategoryFormData>
                                label='Values'
                                name='attributeIds'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please choose at least 1 attribute!' }]}
                            >
                                <Checkbox.Group options={attributeOptions} className='grid grid-cols-3 gap-2' />
                            </Form.Item>

                            <Form.Item className='flex justify-end'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    className='mr-3 px-5'
                                    size='large'
                                >
                                    Add Category
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;

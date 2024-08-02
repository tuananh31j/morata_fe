import { PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    CheckboxProps,
    Form,
    FormProps,
    GetProp,
    Input,
    Popover,
    Radio,
    Select,
    SelectProps,
    TreeSelect,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from '~/hooks/_common/useMessage';
import { useGetAllAtributesNew } from '~/hooks/attributes/Queries/useGetAllAttributes';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { mutate: createCategory, isPending, isSuccess, isError } = useMutationCreateCategory();

    const { data } = useGetAllAtributesNew();
    const attributes = data?.data;

    // const [attributeOptions, setAttributeOptions] = useState<{ label: string; value: string; values: string[] }[]>([]);

    const [attributeOptions, setAttributeOptions] = useState<
        { title: string; value: string; children: { title: string }[] }[]
    >([]);

    useEffect(() => {
        if (attributes) {
            // const options = attributes.map((attr: { _id: string; name: string; values: string[] }) => ({
            //     label: attr.name,
            //     value: attr._id,
            //     values: attr.values,
            // }));

            const options = attributes?.map((attr: { _id: string; name: string; values: string[] }) => ({
                title: attr.name,
                value: attr._id,
                children: attr.values?.map((value: string) => ({
                    title: value,
                    value,
                    selectable: false,
                })),
            }));
            setAttributeOptions(options);
        }
    }, [attributes]);

    const { handleMessage, contextHolder } = useMessage();

    // const handleChange = (value: string[]) => {
    //     console.log(`selected ${value}`);
    // };

    // const optionsWithTooltips = attributeOptions.map((option) => ({
    //     ...option,
    //     title: option.values ? option.values.join(', ') : 'No values available',
    // }));

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        console.log('Success:', values);

        createCategory(values);

        if (isSuccess) {
            showMessage('Category created successfully!', 'success');
            navigate('/admin/categories', { replace: true });
        }

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }

        if (isError) {
            showMessage('Category creation failed!', 'error');
        }
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (newValue: string[]) => {
        console.log('onChange ', newValue);
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

                            <Form.Item<ICategoryFormData>
                                label='Attributes'
                                name='attributeIds'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please choose at least 1 attribute!' }]}
                            >
                                {/* <Checkbox.Group options={attributeOptions} className='grid grid-cols-3 gap-2' /> */}

                                {/* <Select
                                    showSearch
                                    allowClear
                                    mode='multiple'
                                    optionFilterProp='label'
                                    style={{ width: '100%' }}
                                    placeholder='Please select attributes'
                                    onChange={handleChange}
                                    onSearch={onSearch}
                                    options={optionsWithTooltips}
                                    optionLabelProp='label'
                                /> */}

                                <TreeSelect
                                    showSearch
                                    multiple
                                    treeNodeFilterProp='title'
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={attributeOptions}
                                    placeholder='Please select attributes'
                                    onChange={onChange}
                                />

                                {/* <div className='grid grid-cols-3 gap-2'>
                                    {attributeOptions.map((option) => (
                                        <Checkbox key={option.value} value={option.value}>
                                            <Popover content={attributeValues(option)} title={option.label}>
                                                {option.label}
                                            </Popover>
                                        </Checkbox>
                                    ))}
                                </div> */}
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

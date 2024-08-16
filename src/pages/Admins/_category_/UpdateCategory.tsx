import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useGetAllAttributesScroll } from '~/hooks/attributes/Queries/useGetAllAttributesScroll';
import { IAttributesValue } from '~/types/Attributes';
import { ICategoryFormData, IValueCheckbox } from '~/types/Category';
import Annotaion from './_components/Annotaion';
import LableCheckbox from './_components/LableCheckbox';
import { useParams } from 'react-router-dom';
import useGetDetailCategory from '~/hooks/categories/Queries/useGetDetailCategory';
import { useMutationUpdateCategory } from '~/hooks/categories/Mutations/useUpdateCategory';
import showMessage from '~/utils/ShowMessage';

const CreateCategory = () => {
    const { id } = useParams();
    const category = useGetDetailCategory(id as string);
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: updateCategory, isPending } = useMutationUpdateCategory();

    const { Observer, data: attributesScroll } = useGetAllAttributesScroll();
    const attributes = attributesScroll?.pages.map((page) => page.data.attributes).flat();

    const [attributeOptions, setAttributeOptions] = useState<IValueCheckbox[]>([]);
    const [attributeChecked, setAttributeChecked] = useState<IValueCheckbox[]>([]);

    const handleCheckboxChange = (checkedValues: string[]) => {
        const attributeTag = attributeOptions.filter((attr) => checkedValues.includes(attr.value));
        setAttributeChecked(attributeTag);
    };

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        if (id) {
            updateCategory({ id, payload: values });
        } else {
            showMessage('Không tìm thấy _id danh mục', 'error');
        }
    };
    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (id && category.data && attributes) {
            const attributeCheckedIds = [];
            const newAttributesUnique: IValueCheckbox[] = [];
            const attributeCheckedsData: IValueCheckbox[] = [];
            const seenIds = new Set();

            const allAttributes = attributes.map((attr: IAttributesValue) => ({
                name: attr.name,
                label: (
                    <LableCheckbox
                        optionsValue={attr.values}
                        title={attr.name}
                        isRequired={attr.isRequired}
                        isVariant={attr.isVariant}
                    />
                ),
                value: attr._id,
            }));

            if (attributeChecked.length === 0) {
                category.data.data.attributeIds.forEach((attr) => {
                    attributeCheckedsData.push({
                        name: attr.name,
                        label: (
                            <LableCheckbox
                                optionsValue={attr.values}
                                title={attr.name}
                                isRequired={attr.isRequired}
                                isVariant={attr.isVariant}
                            />
                        ),
                        value: attr._id,
                    });
                });
                attributeCheckedIds.push(...category.data.data.attributeIds.map((attr) => attr._id));
            } else {
                attributeCheckedsData.push(...attributeChecked);
                attributeCheckedIds.push(...attributeChecked.map((attr) => attr.value));
            }
            [...allAttributes, ...attributeCheckedsData].forEach((item) => {
                if (!seenIds.has(item.value)) {
                    newAttributesUnique.push(item);
                    seenIds.add(item.value);
                }
            });
            form.setFieldsValue({
                name: category.data.data.name,
                attributeIds: attributeCheckedIds,
            });
            setAttributeChecked(attributeCheckedsData);
            setAttributeOptions(newAttributesUnique);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category.data, form, id, attributesScroll]);
    return (
        <>
            <div className='rounded-lg bg-white py-6'>
                <div className='col-span-9 m-auto'>
                    <Form
                        form={form}
                        layout='vertical'
                        className='grid grid-cols-12 '
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className='col-span-8'>
                            <div className='w-full rounded-lg p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Cập nhật thông tin danh mục</h3>

                                <Form.Item<ICategoryFormData>
                                    label='Name'
                                    name='name'
                                    className='font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Please enter category name!' }]}
                                >
                                    <Input placeholder='Nhập tên cho danh mục...' />
                                </Form.Item>
                                {!attributesScroll && <Skeleton active />}
                                {attributesScroll && (
                                    <>
                                        <Form.Item<ICategoryFormData>
                                            label='Attributes'
                                            name='attributeIds'
                                            className='font-medium text-[#08090F]'
                                            rules={[{ required: true, message: 'Please choose at least 1 attribute!' }]}
                                        >
                                            <Checkbox.Group
                                                value={attributeChecked.map((attr) => attr.value)}
                                                onChange={handleCheckboxChange}
                                                options={attributeOptions}
                                                className='grid grid-cols-3 gap-2'
                                            />
                                        </Form.Item>
                                        <Observer />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='col-span-4 flex flex-col justify-between border-s border-black border-opacity-20 px-4'>
                            <Annotaion attributeChecked={attributeChecked} />
                            <div className='sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 bg-white py-4'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    className='px-5'
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;

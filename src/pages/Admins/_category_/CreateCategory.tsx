import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useGetAllAttributesScroll } from '~/hooks/attributes/Queries/useGetAllAttributesScroll';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { IAttributesValue } from '~/types/Attributes';
import { ICategoryFormData, IValueCheckbox } from '~/types/Category';
import Annotation from './_components/Annotation';
import LableCheckbox from './_components/LableCheckbox';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';

const CreateCategory = () => {
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();

    const { Observer, data } = useGetAllAttributesScroll();
    const attributes = data?.pages.map((page) => page.data.attributes).flat();

    const [attributeOptions, setAttributeOptions] = useState<IValueCheckbox[]>([]);
    const [attributeChecked, setAttributeChecked] = useState<IValueCheckbox[]>([]);

    const handleCheckboxChange = (checkedValues: string[]) => {
        const attributeTag = attributeOptions.filter((attr) => checkedValues.includes(attr.value));
        setAttributeChecked(attributeTag);
    };

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        createCategory(values);
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (attributes) {
            const options = attributes.map((attr: IAttributesValue) => ({
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
                values: attr.values.map(String),
            }));
            setAttributeOptions(options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <WrapperPageAdmin
            title='Tạo mới danh mục'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES} className='underline'>
                    Quay lại
                </Link>
            }
        >
            <Form
                form={form}
                layout='vertical'
                className='grid grid-cols-12 '
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className='col-span-8'>
                    <div className='w-full rounded-lg p-2 px-4'>
                        <Form.Item<ICategoryFormData>
                            label='Tên danh mục'
                            name='name'
                            className='font-medium text-[#08090F]'
                            rules={[{ required: true, message: 'Điền tên cho danh mục sản phẩm...' }]}
                        >
                            <Input placeholder='Nhập tên cho danh mục...' />
                        </Form.Item>
                        {!data && <Skeleton active />}
                        {data && (
                            <>
                                <Form.Item<ICategoryFormData>
                                    label='Thuộc tính'
                                    name='attributeIds'
                                    className='font-medium text-[#08090F]'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                attributes?.length === 0
                                                    ? 'Chọn ít nhất là 1 thuộc tính cho danh mục!'
                                                    : 'Bạn cần tạo thuộc tính trước!',
                                        },
                                    ]}
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
                    <Annotation attributeChecked={attributeChecked} />
                    <div className='sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 p-4'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            icon={<PlusSquareOutlined />}
                            loading={isPending}
                            disabled={isPending}
                            size='large'
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
            </Form>
        </WrapperPageAdmin>
    );
};

export default CreateCategory;

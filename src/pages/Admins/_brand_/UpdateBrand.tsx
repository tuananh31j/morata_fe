import { EditOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateBrand } from '~/hooks/brands/Mutations/useUpdateBrand';
import useGetBrand from '~/hooks/brands/useGetBrand';
import { IBrand } from '~/types/Brand';
import { IAttributeFormData } from '~/types/Category';

const UpdateBrand = () => {
    const { id } = useParams();
    const [form] = Form.useForm<IBrand>();
    const { data: brandDetailsRes } = useGetBrand(id as string);
    const { mutate: updateBrandMutate, isPending } = useUpdateBrand();
    const onFinish: FormProps<IBrand>['onFinish'] = (values) => {
        updateBrandMutate(values);
    };
    useEffect(() => {
        if (brandDetailsRes) {
            form.setFieldsValue(brandDetailsRes.data as IBrand);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandDetailsRes, id]);

    return (
        <>
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
                                <h3 className='my-2 text-xl font-medium text-primary'>Cập nhật thương hiệu</h3>
                                <Form.Item<IAttributeFormData> label='Name' name='_id' className='hidden'>
                                    <Input />
                                </Form.Item>
                                <div className='flex gap-1'>
                                    <Form.Item<IAttributeFormData>
                                        label='Tên thương hiệu'
                                        name='name'
                                        className='w-1/2 font-medium text-[#08090F]'
                                        rules={[{ required: true, message: 'Please enter attribute name!' }]}
                                    >
                                        <Input size='large' />
                                    </Form.Item>
                                </div>
                                <Form.Item className='flex justify-end'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<EditOutlined />}
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
                </div>
            </div>
        </>
    );
};

export default UpdateBrand;

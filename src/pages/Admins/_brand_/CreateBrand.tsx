import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import useMessage from '~/hooks/_common/useMessage';
import { useCreateBrand } from '~/hooks/brands/Mutations/useCreateBrand';
import { IAttributeFormData } from '~/types/Category';
import showMessage from '~/utils/ShowMessage';

const CreateBrand = () => {
    const [form] = Form.useForm<{ name: string }>();
    const { mutate: createBrandMutate, isPending, isSuccess, isError } = useCreateBrand();
    const { handleMessage, contextHolder } = useMessage();

    const onFinish: FormProps<{ name: string }>['onFinish'] = (values) => {
        createBrandMutate(values);
    };

    useEffect(() => {
        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
        if (isError) {
            showMessage('Brand creation failed!', 'error');
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
                                <h3 className='my-2 text-xl font-medium text-primary'>Thêm mới thương hiệu</h3>
                                <div className='flex gap-1'>
                                    <Form.Item<IAttributeFormData>
                                        label='Name'
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
                </div>
            </div>
        </>
    );
};

export default CreateBrand;

import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useCreateBrand } from '~/hooks/brands/Mutations/useCreateBrand';
import { IAttributeFormData } from '~/types/Category';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { ADMIN_ROUTES } from '~/constants/router';
import { Link } from 'react-router-dom';

const CreateBrand = () => {
    const [form] = Form.useForm<{ name: string }>();
    const { mutate: createBrandMutate, isPending } = useCreateBrand();

    const onFinish: FormProps<{ name: string }>['onFinish'] = (values) => {
        console.log(values, 'values');
        createBrandMutate(values);
    };

    return (
        <>
            <WrapperPageAdmin
                title='Thêm mới thương hiệu'
                option={
                    <Link to={ADMIN_ROUTES.BRANDS} className='underline'>
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
                            <div className='flex gap-1'>
                                <Form.Item<IAttributeFormData>
                                    label='Tên thương hiệu'
                                    name='name'
                                    className='w-1/2 font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Please enter attribute name!' }]}
                                >
                                    <Input placeholder='Nhập tên thương hiệu sản phẩm...' size='large' />
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
            </WrapperPageAdmin>
        </>
    );
};

export default CreateBrand;

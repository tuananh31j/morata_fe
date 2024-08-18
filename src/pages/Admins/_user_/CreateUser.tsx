import { Button, Form, FormProps, Input, InputNumber, Select } from 'antd';

type FieldType = {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    address: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const CreateProduct = () => {
    return (
        <div className='mx-6 rounded-lg bg-white px-4 py-6'>
            <div className='m-auto'>
                <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>General information</h3>
                        <div className='grid grid-cols-2 gap-2'>
                            <Form.Item<FieldType>
                                label='Username'
                                name='name'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input size='large' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label='Email'
                                name='email'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input type='email' size='large'></Input>
                            </Form.Item>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <Form.Item<FieldType>
                                className='font-medium text-[#08090F]'
                                label='Phone Number'
                                name='phoneNumber'
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <InputNumber size='large' className='w-full' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                className='font-medium text-[#08090F]'
                                label='Role'
                                name='role'
                                rules={[{ required: true, message: 'Please input your role!' }]}
                            >
                                <Select
                                    size='large'
                                    onChange={handleChange}
                                    className='w-full'
                                    defaultValue={'lucy'}
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                    ]}
                                ></Select>
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            className='font-medium text-[#08090F]'
                            label='Address'
                            name='address'
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputNumber size='large' className='w-full' />
                        </Form.Item>
                        <Button type='primary' htmlType='button' className='mb-4 w-full'>
                            Create User
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateProduct;

import { BellFilled, FacebookFilled, PinterestOutlined, TikTokOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
};
const Contact = () => {
    const iconTitleList = {
        twitter: 'twitter',
        facebook: 'facebook',
        pinterest: 'pinterest',
        bell: 'bell',
        tiktok: 'tiktok',
    };
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='mb-10 mt-5 grid grid-cols-1 place-content-center  gap-10 md:grid-cols-2  '>
                <div>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold text-slate-700'>Get In Touch</h2>
                        <p className='mt-2 text-[1.063rem] text-stone-500'>
                            Your email address will not be published. Required fields are marked *
                        </p>
                    </div>
                    <Form>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <Form.Item<FieldType>
                                name='name'
                                rules={[{ required: true, message: 'Vui long nhập tên!' }]}
                            >
                                <Input placeholder='Name *' size='large' className='rounded-sm py-3 pl-4' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name='email'
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder='Email *' size='large' className='rounded-sm py-3 pl-4' />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            name='phoneNumber'
                            rules={[{ required: true, message: 'Please input your phone Number!' }]}
                        >
                            <Input placeholder='Phone Number *' size='large' className='rounded-sm py-3 pl-4' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='message'
                            className='text-black'
                            rules={[{ required: true, message: 'Please input your message!' }]}
                        >
                            <TextArea rows={8} placeholder='Message *' className='rounded-sm pl-4 ' />
                        </Form.Item>
                        <Button
                            htmlType='submit'
                            size='large'
                            className='m-auto block rounded-[4px] bg-black px-14 text-xs font-bold uppercase text-white
                            transition-colors duration-500 hover:bg-orange-500 '
                        >
                            send message
                        </Button>
                    </Form>
                </div>
                <div>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold text-slate-700'>Contact Information</h2>
                        <p className='mt-2 text-[1.063rem] text-stone-500 '>
                            Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos pretium.
                        </p>
                    </div>
                    <div className='mb-6'>
                        <h4 className='text-sm font-semibold uppercase text-slate-700'>LOCATION STORE:</h4>
                        <p className='mt-1 text-sm text-stone-500 '>268 St, South New York/NY 98944, United States.</p>
                    </div>
                    <div className='mb-6'>
                        <h4 className='text-sm font-semibold uppercase text-slate-700'>work time:</h4>

                        <ul>
                            <li className='mt-1 text-sm text-stone-500 '>Monday – Friday: 9:00-20:00</li>
                            <li className='mt-1 text-sm text-stone-500 '>Saturady: 11:00 – 15:00</li>
                        </ul>
                    </div>
                    <div className='mb-6'>
                        <h4 className='text-sm font-semibold uppercase text-slate-700'>Phone number:</h4>
                        <ul className='mt-2'>
                            <li className='leading-5 transition-colors duration-300 hover:text-orange-500'>
                                <a href='tel:212 654 3322'>212 654 3322</a>
                            </li>
                            <li className='leading-5 transition-colors duration-300 hover:text-orange-500'>
                                <a href='tel:212 654 3322'>(+100) 666-456-7890</a>
                            </li>
                        </ul>
                    </div>
                    <div className='mb-6'>
                        <h4 className='text-sm font-semibold uppercase text-slate-700'>EMAIL ADDRESS:</h4>
                        <ul className='mt-2'>
                            <li className='leading-5 transition-colors duration-300 hover:text-orange-500'>
                                <a href='mailto:aloshopify@alothemes.com'>aloshopify@alothemes.com</a>
                            </li>
                            <li className='leading-5 transition-colors duration-300 hover:text-orange-500'>
                                <a href='mailto:aloshopify@alothemes.com'>aloshopify@alothemes.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className='mb-6'>
                        <h4 className='text-sm font-semibold uppercase text-slate-700'>SOCIAL ACCOUNTS:</h4>
                        <ul className='mt-2 flex gap-[10px]'>
                            <Tooltip title={iconTitleList.twitter}>
                                <li className='flex h-[40px] w-[40px] justify-center rounded-sm bg-cyan-500 text-white'>
                                    <TwitterOutlined />
                                </li>
                            </Tooltip>
                            <Tooltip title={iconTitleList.facebook}>
                                <li className='flex h-[40px] w-[40px] justify-center rounded-sm bg-[#3c5b9b] text-white'>
                                    <FacebookFilled />
                                </li>
                            </Tooltip>
                            <Tooltip title={iconTitleList.pinterest}>
                                <li className='flex h-[40px] w-[40px] justify-center rounded-sm bg-[#e92e2e] text-white'>
                                    <PinterestOutlined />
                                </li>
                            </Tooltip>
                            <Tooltip title={iconTitleList.bell}>
                                <li className='flex h-[40px] w-[40px] justify-center rounded-sm bg-[#f6ea3c] text-white'>
                                    <BellFilled />
                                </li>
                            </Tooltip>
                            <Tooltip title={iconTitleList.tiktok}>
                                <li className='flex h-[40px] w-[40px] justify-center rounded-sm bg-[#ffffff]'>
                                    <TikTokOutlined />
                                </li>
                            </Tooltip>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;

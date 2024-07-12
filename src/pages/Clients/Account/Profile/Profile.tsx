import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import WrapperList from '~/components/_common/WrapperList';
import useWindowSize from '~/hooks/_common/useWindowSize';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';

const Profile = () => {
    // const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const windowSize = useWindowSize();

    const { data } = useGetProfile();
    const profile = data?.data;

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <WrapperList classic title='My Profile' className='my-0'>
                {/* @Content */}
                <div className='flex items-center justify-center'>
                    <div className='w-[80%] rounded-2xl bg-white px-6 py-4'>
                        {/* User avatar */}
                        <div className='mb-6 flex items-center justify-center'>
                            <div className='mt-4 flex w-24 select-none items-center justify-center rounded-full'>
                                <img src={profile?.avatar} loading='lazy' alt='user' className='w-full rounded-full ' />
                            </div>
                        </div>

                        <Form layout='vertical' className='w-full'>
                            <Form.Item label='Họ và tên' className='mt-1'>
                                <Input placeholder='Họ và tên' className='py-3' value={profile?.username} />
                            </Form.Item>

                            <Form.Item label='Số điện thoại'>
                                <Input placeholder='Số điện thoại' value={profile?.phone} className='py-3' />
                            </Form.Item>

                            {/* <Form.Item label='Ngày sinh'>
                                <DatePicker
                                    className='w-full py-3'
                                    defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                                    format={dateFormatList[0]}
                                />
                            </Form.Item> */}

                            <Form.Item label='Email' className='mt-1'>
                                <Input placeholder='Email' className='py-3' value={profile?.email} />
                            </Form.Item>

                            <Form.Item>
                                <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                    <Button
                                        className='block w-full rounded-3xl bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc] '
                                        size='large'
                                    >
                                        Cập nhật thông tin
                                    </Button>
                                    <Button
                                        type='primary'
                                        size='large'
                                        danger
                                        onClick={showModal}
                                        className='w-full rounded-3xl'
                                    >
                                        Thay đổi mật khẩu
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Modal
                    // title='Thay đổi mật khẩu'
                    open={open}
                    onOk={handleOk}
                    centered
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={
                        <Button
                            className='mb-8 block w-full rounded-3xl border-black bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                            size='large'
                        >
                            Cập nhật thông tin
                        </Button>
                    }
                    width={windowSize.windowWidth >= 768 ? '460px' : '90vw'}
                >
                    <div>
                        <div className='text-center'>
                            <h3 className='mb-2 mt-[52px] block text-xl font-medium'>Thay đổi mật khẩu</h3>
                            <p className='text-gray-500 mx-auto mb-8 w-[55%] text-sm'>
                                Bạn cần tạo mật khẩu từ 6 đến 16 ký tự để bảo vệ tài khoản tốt hơn.
                            </p>
                        </div>
                        <Form layout='vertical'>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu cũ' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Mật khẩu mới' className='py-3' />
                            </Form.Item>
                            <Form.Item className='mt-1'>
                                <Input.Password placeholder='Nhập lại mật khẩu' className='py-3' />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </WrapperList>
        </>
    );
};

export default Profile;

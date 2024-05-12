import WrapperList from '~/components/WrapperList';
import StaticImages from '~/assets';
import { Button, DatePicker, Form, Input, Modal, Radio } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import useWindowSize from '~/hooks/useWindowSize';

const Profile = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const windowSize = useWindowSize();

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
            <WrapperList title='My Profile' className='my-0'>
                {/* @Content */}
                <div className='flex w-[100vw] items-center justify-center md:w-[70vw]'>
                    <div className='w-[80%] rounded-2xl bg-white px-6 py-4 md:w-[70%]'>
                        {/* User avatar */}
                        <div className='mb-6 flex items-center justify-center'>
                            <div className='mt-4 flex w-24 select-none items-center justify-center rounded-full'>
                                <img
                                    src={StaticImages.userImageDf}
                                    loading='lazy'
                                    alt='user image'
                                    className='w-full rounded-full '
                                />
                            </div>
                        </div>
                        {/* End */}
                        {/* Infomation */}
                        {/* <div>
                            <div className='mb-3 flex items-center justify-between border-b-[1.6px] pb-3'>
                                <span className='text-gray-500'>Họ và tên</span>
                                <span className='capitalize lg:font-medium'> quy khach</span>
                            </div>
                            <div className='mb-3 flex items-center justify-between border-b-[1.6px] pb-3'>
                                <span className='text-gray-500'>Số điện thoại</span>
                                <span className='capitalize lg:font-medium'> 0964863742</span>
                            </div>
                            <div className='mb-3 flex items-center justify-between border-b-[1.6px] pb-3'>
                                <span className='text-gray-500'>Giới tính</span>
                                <span className='capitalize lg:font-medium'> nam</span>
                            </div>
                        </div> */}
                        {/* Edit btn infomation */}
                        {/* <button className='mt-5 block w-full rounded-3xl border-black bg-black py-2 text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc] lg:py-3 '>
                            Chỉnh sửa thông tin
                        </button> */}
                        <Form layout='vertical' className='w-full'>
                            <div className=''>Giới tính</div>
                            <Radio.Group name='gender' defaultValue={0}>
                                <Radio value={0}>Nam</Radio>
                                <Radio value={1}>Nữ</Radio>
                            </Radio.Group>
                            <Form.Item label='Họ và tên' className='mt-1'>
                                <Input placeholder='Họ và tên' className='py-3' value={'Nguyễn Tiến Đạt'} />
                            </Form.Item>
                            <Form.Item label='Số điện thoại'>
                                <Input placeholder='Số điện thoại' value={'0964963742'} className='py-3' />
                            </Form.Item>
                            <Form.Item label='Ngày sinh'>
                                <DatePicker
                                    className='w-full py-3'
                                    defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                                    format={dateFormatList[0]}
                                />
                            </Form.Item>
                            <Form.Item label='Email' className='mt-1'>
                                <Input placeholder='Email' className='py-3' value={''} />
                            </Form.Item>
                            <Form.Item>
                                <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                    {/* <Button type='primary' size='large' className='w-full'>
                                        Cập nhật thông tin
                                    </Button> */}
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
                            <p className='mx-auto mb-8 w-[55%] text-sm text-gray-500'>
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

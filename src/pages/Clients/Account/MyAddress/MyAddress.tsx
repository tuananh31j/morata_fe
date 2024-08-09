import { Button, List, Modal, Form, Input, Select } from 'antd';
import WrapperList from '~/components/_common/WrapperList';
import { PlusOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import useGetAllLocationByUser from '~/hooks/location/Query/useGetAllLocationByUser';
import { LOCATION_TYPES } from '~/constants/enum';
import { FormProps } from 'antd/lib';
import { FieldNamesType } from 'antd/es/cascader';
import useAddLocation from '~/hooks/location/Mutation/useAddLocation';
import useUpdateLocation from '~/hooks/location/Mutation/useUpdateLocation';
import useDeleteLocation from '~/hooks/location/Mutation/useDeleteLocation';
import { ILocation } from '~/types/Location';

const MyAddress = () => {
    const { data } = useGetAllLocationByUser();
    const [form] = Form.useForm<ILocation>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { mutate: createLocation } = useAddLocation();
    const { mutate: updateLocation } = useUpdateLocation();
    const { mutate: removeLocation } = useDeleteLocation();
    const handleAddAddress = () => {
        form.resetFields();
        setIsEdit(false);

        setIsModalVisible(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditAddress = (address: any) => {
        form.setFieldsValue(address);
        setIsEdit(true);
        setIsModalVisible(true);
    };

    const onFinish: FormProps<ILocation>['onFinish'] = (values) => {
        if (isEdit) {
            updateLocation(values);
        } else {
            createLocation(values);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <WrapperList classic title='My address' className='my-0'>
                {/* @Content */}
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className='text-xl font-bold text-[#32373d]'>Sổ địa chỉ nhận hàng </h2>
                    <Button
                        type='primary'
                        onClick={handleAddAddress}
                        className='flex items-center bg-green-500 text-white transition duration-200 hover:bg-green-700'
                    >
                        <PlusOutlined className='mr-1' />
                        <p>Thêm địa chỉ mới</p>
                    </Button>
                </div>
                {data && data.data && (
                    <List
                        className='rounded-lg bg-white p-4 shadow-md'
                        itemLayout='horizontal'
                        dataSource={data.data.data}
                        renderItem={(item) => (
                            <List.Item className='border-gray-200 border-b py-2 '>
                                <List.Item.Meta
                                    className=''
                                    avatar={
                                        <div className='rounded-full bg-blue-100 p-2'>
                                            <HomeOutlined className='text-2xl text-secondary' />
                                        </div>
                                    }
                                    title={
                                        <div className='space-y-2'>
                                            <div className='flex items-center justify-between'>
                                                <div className='mb-4'>
                                                    <label className='inline-block text-lg font-medium'>
                                                        {item.address.line1}
                                                    </label>
                                                    <br />
                                                    <label className='inline-block text-lg font-medium'>
                                                        {item.address.line2}
                                                    </label>
                                                </div>
                                                <Button
                                                    type='primary'
                                                    icon={<EditOutlined />}
                                                    onClick={() => handleEditAddress(item)}
                                                    className='bg-red-500 text-white transition duration-200 hover:bg-blue-700'
                                                >
                                                    Sửa
                                                </Button>
                                            </div>
                                            <label className='text-gray-500'>{item.phone}</label>{' '}
                                            {/* Make phone number gray */}
                                            {item.type === LOCATION_TYPES.DEFAULT && (
                                                <div>
                                                    <span className='text-gray-500 text-sm'>Mặc định</span>
                                                    {/* Make "Mặc định" smaller and gray */}
                                                </div>
                                            )}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
                <Modal
                    title={isEdit ? 'Edit Address' : 'Add New Address'}
                    open={isModalVisible}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout='vertical' onFinish={onFinish}>
                        {isEdit && (
                            <Form.Item className='hidden' name='_id'>
                                <Input />
                            </Form.Item>
                        )}
                        <Form.Item name='name' label='Full Name'>
                            <Input placeholder='Enter full name' />
                        </Form.Item>
                        <Form.Item name='email' label='Email'>
                            <Input placeholder='Enter your email' />
                        </Form.Item>
                        <Form.Item name='phone' label='Phone Number'>
                            <Input placeholder='Enter phone number' />
                        </Form.Item>
                        <Form.Item name={['address', 'city']} label='city' className='capitalize'>
                            <Input placeholder='Your city...' />
                        </Form.Item>
                        <Form.Item name={['address', 'country']} label='country' className='capitalize'>
                            <Input placeholder='Your country...' />
                        </Form.Item>
                        <Form.Item name={['address', 'line1']} label='line1' className='capitalize'>
                            <Input placeholder='Your line1...' />
                        </Form.Item>
                        <Form.Item name={['address', 'line2']} label='line2' className='capitalize'>
                            <Input placeholder='Your line2...' />
                        </Form.Item>
                        <Form.Item name={['address', 'postal_code']} label='postal code' className='capitalize'>
                            <Input placeholder='Your postal code...' />
                        </Form.Item>
                        <Form.Item name={['address', 'state']} label='state' className='capitalize'>
                            <Input placeholder='Your state...' />
                        </Form.Item>
                        <Form.Item name='type' label='Type'>
                            <Select placeholder='Selct your type address'>
                                <Select.Option value={LOCATION_TYPES.DEFAULT}>Default</Select.Option>
                                <Select.Option value={LOCATION_TYPES.SHIPPING_ADDRESS}>Normal</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='w-full'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </WrapperList>
        </>
    );
};

export default MyAddress;

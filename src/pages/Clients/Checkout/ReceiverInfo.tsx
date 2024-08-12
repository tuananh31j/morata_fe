import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';

const ReceiverInfo = () => {
    const form = Form.useFormInstance();
    const [showReceiverInfo, setShowReceiverInfo] = useState(false);

    const { data: customer } = useGetProfile();

    const handleClickAddReceiver = () => {
        setShowReceiverInfo(!showReceiverInfo);
    };

    useEffect(() => {
        if (customer) {
            form.setFieldsValue({
                customerName: customer.data.username,
                customerEmail: customer.data.email,
                customerPhone: customer.data.phone,
            });
        }
    }, [customer]);

    return (
        <Space direction='vertical' className='w-full rounded-lg border border-gray p-3'>
            <Typography.Text className='text-[1.2rem] font-semibold'>Thông tin khách hàng</Typography.Text>
            <Form.Item label='Tên khách hàng' name='customerName' rules={[{ required: true, message: <></> }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Email' name='customerEmail' rules={[{ required: true, message: <></> }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Số điện thoai' name='customerPhone' rules={[{ required: true, message: <></> }]}>
                <Input />
            </Form.Item>
            <Button onClick={handleClickAddReceiver} icon={<PlusCircleOutlined />}>
                Giao đến người nhận khác
            </Button>

            {showReceiverInfo && (
                <>
                    <Form.Item label='Tên người nhận' name='receiverName' rules={[{ required: true, message: <></> }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Email người nhận'
                        name='receiverEmail'
                        rules={[{ required: true, message: <></> }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Số điện thoại người nhận'
                        name='receiverPhone'
                        rules={[{ required: true, message: <></> }]}
                    >
                        <Input />
                    </Form.Item>
                </>
            )}
        </Space>
    );
};

export default ReceiverInfo;

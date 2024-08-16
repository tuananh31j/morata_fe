import { Button, Form, Modal, Radio } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCancelOrder from '~/hooks/orders/Mutations/useCancelOrder';

interface Values {
    reason: string;
}

interface Props {
    orderId: string;
}

const CancelOrderModal = ({ orderId }: Props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const cancelOrder = useCancelOrder(orderId);

    const handleOnTerminate = (values: Values) => {
        if (!values.reason) {
            return toast.error('Please select a reason to terminate the order');
        }
        cancelOrder.mutate(values.reason, {
            onSuccess: () => {
                form.resetFields();
                navigate(`/admin/orders/${orderId}/detail`);
                setOpen(false);
                return toast.success('Order terminated successfully');
            },
            onError: (error) => {
                return toast.error('Failed to terminate order');
            },
        });
        return null;
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <Button danger onClick={() => setOpen(true)}>
                Hủy đơn
            </Button>
            <Modal
                maskClosable={false}
                forceRender
                open={open}
                title='Bạn muốn hủy đơn hàng này?'
                okText='Hủy đơn'
                okType='danger'
                cancelText='Cancel'
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={handleCancel}
                destroyOnClose
                confirmLoading={cancelOrder.isPending}
                modalRender={(dom) => (
                    <Form
                        layout='vertical'
                        form={form}
                        name='form_in_modal'
                        initialValues={{ modifier: 'public' }}
                        onFinish={(values) => handleOnTerminate(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item name='reason' className='collection-create-form_last-form-item'>
                    <Radio.Group className='flex flex-col'>
                        <Radio value='Đơn hang bị hoãn'>Đơn hang bị hoãn</Radio>
                        <Radio value='Hết hàng'>Hết hàng</Radio>
                        <Radio value='Sai thông tin sản phẩm'>Sai thông tin sản phẩm</Radio>
                        <Radio value='Khách hàng yêu cầu hủy đơn'>Khách hàng yêu cầu hủy đơn</Radio>
                        <Radio value='Lỗi thanh toán'>Lỗi thanh toán</Radio>
                        <Radio value='Khác'>Khác</Radio>
                    </Radio.Group>
                </Form.Item>
            </Modal>
        </>
    );
};

export default CancelOrderModal;

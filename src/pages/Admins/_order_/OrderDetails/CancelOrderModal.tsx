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
                Terminate
            </Button>
            <Modal
                maskClosable={false}
                forceRender
                open={open}
                title='Are you sure you want to terminate this order?'
                okText='Terminate'
                okType='danger'
                cancelText='Cancel'
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={handleCancel}
                destroyOnClose
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
                        <Radio value='delayed'>Delayed</Radio>
                        <Radio value='out_of_stock'>Out of Stock</Radio>
                        <Radio value='wrong_item'>Wrong Item</Radio>
                        <Radio value='customer_request'>Customer Request</Radio>
                        <Radio value='payment_issue'>Payment Issue</Radio>
                        <Radio value='other'>Other</Radio>
                    </Radio.Group>
                </Form.Item>
            </Modal>
        </>
    );
};

export default CancelOrderModal;

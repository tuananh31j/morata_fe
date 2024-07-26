import { Button, Flex, Form, Modal, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ReactNode, useState } from 'react';
import WrapperList from '~/components/_common/WrapperList';
import { OrderStatus } from '~/constants/enum';
import useCancelOrder from '~/hooks/orders/Mutations/useCancelOrder';
import useConfirmOrder from '~/hooks/orders/Mutations/useConfirmOrder';
import useDeliverdOrder from '~/hooks/orders/Mutations/useDeliveredOrder';
import useFinishAnOrder from '~/hooks/orders/Mutations/useFinishAnOrder';
import useShipOrder from '~/hooks/orders/Mutations/useShipOrder';

const PopupFormCancelOrder = ({
    id,
    children,
    status,
    isCacelled,
}: {
    id: string;
    children: ReactNode;
    status: OrderStatus;
    isCacelled?: boolean;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutateAsync: cancelOrder } = useCancelOrder();
    const { mutateAsync: confirmOrder } = useConfirmOrder();
    const { mutateAsync: shipOrder } = useShipOrder();
    const { mutateAsync: deliveredOrder } = useDeliverdOrder();
    const { mutateAsync: finishOrder } = useFinishAnOrder();
    const onFinish = async (values: { reason: string }) => {
        switch (status) {
            case OrderStatus.pending:
                if (isCacelled) {
                    await cancelOrder({ orderId: id, reason: values.reason });
                } else {
                    await confirmOrder({ orderId: id, reason: values.reason });
                }
                setIsModalOpen(false);
                break;
            case OrderStatus.confirmed:
                await shipOrder({ orderId: id, reason: values.reason });
                setIsModalOpen(false);
                break;

            case OrderStatus.shipping:
                await deliveredOrder({ orderId: id, reason: values.reason });
                setIsModalOpen(false);
                break;

            case OrderStatus.delivered:
                await finishOrder(id);
                setIsModalOpen(false);
                break;
            case OrderStatus.canceled:
                console.log('is cacelled status');

                break;

            default:
                console.log('Invalid status');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal} type='primary' danger={isCacelled}>
                {children}
            </Button>
            <Modal open={isModalOpen} footer='' onCancel={handleCancel}>
                <WrapperList classic className='m-0' title='Enter a reason for updating this order status.'>
                    <Form onFinish={onFinish} className='w-full' name='layout-multiple-horizontal' layout='vertical'>
                        <Form.Item rules={[{ required: true, message: 'Please input your reason!' }]} label='Reason'>
                            <TextArea rows={10} />
                        </Form.Item>
                        <Flex align='end' justify='end' gap='small'>
                            <Button onClick={handleCancel} type='text'>
                                Cancel
                            </Button>
                            <Button htmlType='submit' type='primary'>
                                Send
                            </Button>
                        </Flex>
                    </Form>
                </WrapperList>
            </Modal>
        </>
    );
};

export default PopupFormCancelOrder;

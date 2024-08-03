import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useConfirmOrder } from '~/hooks/orders/Mutations/useConfirmOrder';

interface Props {
    orderId: string;
}

const PopConFirmOrder = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const confirmOrder = useConfirmOrder();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        confirmOrder.mutate(orderId, {
            onSuccess: () => {
                toast.success('Order confirmed successfully');
                navigate('/admin/orders');
                setOpen(false);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Popconfirm
            title='Confirm the order'
            description='Are you sure to confirm this order?'
            open={open}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Button type='default' onClick={showPopconfirm}>
                Confirm
            </Button>
        </Popconfirm>
    );
};

export default PopConFirmOrder;

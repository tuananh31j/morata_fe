import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { OrderStatus } from '~/constants/enum';

const OrderStatusTag = ({ status }: { status: OrderStatus }) => {
    switch (status) {
        case OrderStatus.pending:
            return (
                <Tag icon={<ClockCircleOutlined />} color='default'>
                    {status}
                </Tag>
            );
        case OrderStatus.confirmed:
            return <Tag color='processing'>{status}</Tag>;
        case OrderStatus.canceled:
            return (
                <Tag icon={<CloseCircleOutlined />} color='error'>
                    {status}
                </Tag>
            );
        case OrderStatus.shipping:
            return (
                <Tag icon={<ExclamationCircleOutlined />} color='warning'>
                    {status}
                </Tag>
            );
        case OrderStatus.delivered:
            return (
                <Tag icon={<ExclamationCircleOutlined />} color='purple'>
                    {status}
                </Tag>
            );
        case OrderStatus.done:
            return (
                <Tag icon={<CheckCircleOutlined />} color='success'>
                    {status}
                </Tag>
            );
        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color='default'>
                    Oops!!
                </Tag>
            );
    }
};

export default OrderStatusTag;

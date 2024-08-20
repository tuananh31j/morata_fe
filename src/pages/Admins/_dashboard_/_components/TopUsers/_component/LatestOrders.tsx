import React from 'react';
import { Card, Flex, Typography, Tag, Avatar, Tooltip, Button } from 'antd';
import { CreditCardOutlined, DollarOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Currency } from '~/utils';

const { Text } = Typography;

type LatestOrder = {
    _id: string;
    totalPrice: number;
    paymentMethod: 'cash' | 'card';
    orderStatus: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled' | 'done';
    createdAt: string;
    customerName: string;
    customerAvatar: string;
};

const getStatusColor = (status: LatestOrder['orderStatus']) => {
    const statusMap: Record<LatestOrder['orderStatus'], string> = {
        pending: '#faad14',
        confirmed: '#1890ff',
        shipping: '#13c2c2',
        delivered: '#52c41a',
        cancelled: '#f5222d',
        done: '#237804',
    };
    return statusMap[status] || '#d9d9d9';
};

const LatestOrders: React.FC<{ orders: LatestOrder[] }> = ({ orders }) => {
    const navigate = useNavigate();

    const handleViewDetails = (orderId: string) => {
        navigate(`/admin/orders/${orderId}/detail`);
    };

    return (
        <Flex className='my-4' gap={16}>
            {orders.slice(0, 2).map((order) => (
                <Card key={order._id} className='w-1/2 shadow-md transition-shadow duration-300 hover:shadow-lg'>
                    <Flex align='center' justify='space-between'>
                        <Flex align='center' className='w-2/5'>
                            <Avatar src={order.customerAvatar} size={48} className='mr-3' />
                            <Flex vertical>
                                <Text strong className='text-lg'>
                                    {order.customerName}
                                </Text>
                                <Text type='secondary'>{dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
                            </Flex>
                        </Flex>
                        <Flex align='center' className='w-3/5' justify='space-between'>
                            <Tooltip title={order.paymentMethod === 'cash' ? 'Thanh toán tiền mặt' : 'Thanh toán thẻ'}>
                                {order.paymentMethod === 'cash' ? (
                                    <DollarOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                                ) : (
                                    <CreditCardOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                                )}
                            </Tooltip>
                            <Text strong className='text-lg' style={{ color: '#f5222d' }}>
                                {Currency.format(order.totalPrice)}
                            </Text>
                            <Tag color={getStatusColor(order.orderStatus)} className='px-3 py-1 text-base'>
                                {order.orderStatus.toUpperCase()}
                            </Tag>
                            <Tooltip title='Xem chi tiết'>
                                <Button
                                    type='primary'
                                    icon={<EyeOutlined />}
                                    shape='circle'
                                    onClick={() => handleViewDetails(order._id)}
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default LatestOrders;

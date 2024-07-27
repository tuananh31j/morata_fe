import { DownOutlined, EyeOutlined } from '@ant-design/icons';
import { Collapse, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import IsPaidTag from '~/components/IsPaidTag';
import OrderStatusTag from '~/components/OrderStatusTag';
import PaymentMethodTag from '~/components/PaymentMethodTag';
import { formatDate } from '~/utils/formatDate';
import { OrderStatus, PaymentMethod } from '~/constants/enum';
import { ADMIN_ROUTES } from '~/constants/router';

interface OrderItem {
    _id: string;
    name: string;
    image: string;
    quantity: number;
}
interface Order {
    _id: string;
    createdAt: string;
    name: string;
    isPaid: boolean;
    items: OrderItem[];
    orderCode: string;
    currentOrderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    totalPrice: number;
}

const OrderRow: React.FC<{ order: Order }> = ({ order }) => {
    const collapseItems = [
        {
            key: '1',
            label: (
                <div className='flex items-center space-x-2'>
                    <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className='h-16 w-16 rounded-md object-cover shadow-sm'
                    />
                    <div>
                        <div className='text-sm font-semibold'>{order.items[0].name}</div>
                        {order.items.length > 1 && (
                            <div className='text-gray-500 text-sm'>and {order.items.length - 1} products other</div>
                        )}
                    </div>
                </div>
            ),
            children: (
                <div className='border-gray-200 absolute left-0 z-10 w-full rounded-b-lg border bg-white p-4 shadow-md'>
                    {order.items.slice(1).map((product) => (
                        <div key={product._id} className='mt-2 flex items-center space-x-2'>
                            <img
                                src={product.image}
                                alt={product.name}
                                className='h-10 w-10 rounded-md object-cover shadow-sm'
                            />
                            <div>
                                <div className='font-medium'>{product.name}</div>
                                <div className='text-gray-500 text-sm'>SL: {product.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];
    return (
        <div
            key={order._id}
            className='overflow-visible rounded-lg border border-[#B9D5F3] bg-white text-[#01070E] shadow-sm transition-shadow duration-300 hover:shadow-md'
        >
            <div className='border-b border-[#B9D5F3]  p-4'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-[#666666]'>Order ID: #{order._id}</span>
                    <span className='text-gray-600 text-sm '>Customer: {order.name}</span>
                </div>
            </div>
            <div className=''>
                <div className='grid grid-cols-10 items-center gap-6 p-4'>
                    <div className='relative col-span-3'>
                        <Collapse
                            ghost
                            items={collapseItems}
                            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                        />
                    </div>
                    <div className='text-gray-700 font-semibold'>${order.totalPrice.toFixed(2)}</div>
                    <div>
                        <PaymentMethodTag method={order.paymentMethod} />
                    </div>
                    <div>
                        <OrderStatusTag status={order.currentOrderStatus} />
                    </div>
                    <div>
                        <IsPaidTag isPaid={order.isPaid} />
                    </div>
                    <div>{formatDate(order.createdAt)}</div>
                    <div className='col-span-2 flex justify-end'>
                        <Space size='middle'>
                            <Tooltip title='Get detail'>
                                <Link to={`${ADMIN_ROUTES.ORDERS}/${order._id}/detail`} className='text-cyan-500'>
                                    <EyeOutlined
                                        className='hover:bg-gray-100 cursor-pointer rounded-full p-2 transition-colors'
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                </Link>
                            </Tooltip>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderRow;

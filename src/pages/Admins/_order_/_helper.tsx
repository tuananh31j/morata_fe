import { TableProps } from 'antd';
import { ORDER_STATUS_ARR, OrderStatus, PaymentMethod } from '~/constants/enum';
import OrderRow from '~/pages/Admins/_order_/OrdersList/OrderRow';

import { IOrderParams } from '~/types/Order';

export interface DataType {
    _id: string;
    paymentMethod: PaymentMethod;
    orderStatus: OrderStatus;
    totalPrice: number;
    createdAt: string;
}

export const ordersListColums = (filtered: IOrderParams): TableProps['columns'] => {
    return [
        {
            title: (
                <div className='rounded-t-lg border border-[#B9D5F3] bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm'>
                    <div className='grid grid-cols-10 items-center gap-8 p-4 text-[#01070E]'>
                        <div className='col-span-3 font-bold '>Product</div>
                        <div className='font-bold '>Total</div>
                        <div className='font-bold '>Payment Method</div>
                        <div className='font-bold '>Status</div>
                        <div className='font-bold '>Paid</div>
                        <div className='font-bold '>Created Date</div>
                        <div className='col-span-2 text-right font-bold '>Action</div>
                    </div>
                </div>
            ),
            key: 'order',
            render: (_, record) => <OrderRow order={record} />,
        },
    ];
};
export const orderItemsColums: TableProps['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (img) => <img src={img} alt='' width={100} />,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <span>${price}</span>,
    },
];

export const renderSteps = ({ currentStep }: { currentStep: OrderStatus }) => {
    let newArr = ORDER_STATUS_ARR;
    if (currentStep === OrderStatus.canceled) {
        newArr = ORDER_STATUS_ARR.filter((item) => item !== OrderStatus.confirmed);
    } else {
        newArr = ORDER_STATUS_ARR.filter((item) => item !== OrderStatus.canceled);
    }
    const items = newArr.map((step) => ({
        title: step,
    }));
    return {
        items,
        steps: newArr,
    };
};

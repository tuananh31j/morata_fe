import { Descriptions, Space } from 'antd';
import { DescriptionsProps } from 'antd/lib';

interface Props {
    serviceInfo: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
    };
}

const ServiceInfo = ({ serviceInfo }: Props) => {
    const items: DescriptionsProps['items'] = [
        {
            key: 'Payment Method',
            label: <span className='font-semibold capitalize'>Payment Method</span>,
            children: <p className='capitalize'>{serviceInfo.paymentMethod}</p>,
        },
        {
            key: 'Shipping Fee',
            label: <span className='font-semibold capitalize'>Shipping Fee</span>,
            children: <p>{Number(serviceInfo.shippingFee)}</p>,
        },
        {
            key: 'Tax',
            label: <span className='font-semibold capitalize'>Tax</span>,
            children: <p>{`${Number(serviceInfo.tax) * 100}% VAT `}</p>,
        },
        {
            key: 'Total Price',
            label: <span className='font-semibold capitalize'>Total Price</span>,
            children: <p>{serviceInfo.totalPrice}</p>,
        },
        {
            key: 'Payment Status',
            label: <span className='font-semibold capitalize'>Is Paid</span>,
            children: <p>{serviceInfo.isPaid ? 'Paid' : 'Not Paid'}</p>,
        },
    ];

    return (
        <Space className='mt-5 w-full rounded-lg bg-[#fff] p-4'>
            <Descriptions title='Service Info' items={items} />
        </Space>
    );
};

export default ServiceInfo;

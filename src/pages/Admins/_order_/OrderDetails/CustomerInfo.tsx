import { Descriptions, Space } from 'antd';
import { DescriptionsProps } from 'antd/lib';

interface User {
    email: string;
    name: string;
    phone: string;
}

interface Props {
    customerInfo: User;
    receiverInfo: User;
    shippingAddress: {
        city: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    };
}

const CustomerInfo = ({ customerInfo, receiverInfo, shippingAddress }: Props) => {
    const customerItems: DescriptionsProps['items'] =
        customerInfo &&
        Object.entries(customerInfo!).map(([key, value]) => {
            return {
                key,
                label: <span className='font-semibold capitalize'>{key}</span>,
                children: <p>{value}</p>,
            };
        });
    const receiverItems: DescriptionsProps['items'] =
        receiverInfo &&
        Object.entries(receiverInfo).map(([key, value]) => ({
            key,
            label: <span className='font-semibold capitalize'>{key}</span>,
            children: <p>{value}</p>,
        }));

    const shippingAddressItems: DescriptionsProps['items'] =
        shippingAddress &&
        Object.entries(shippingAddress).map(([key, value]) => ({
            key,
            label: <span className='font-semibold capitalize'>{key}</span>,
            children: <p>{value}</p>,
        }));

    return (
        <Space className='mt-5 w-full  rounded-lg bg-[#fff] p-4 ' direction='vertical'>
            <Descriptions title='Customer' items={customerItems} />
            {receiverInfo && receiverInfo.name ? <Descriptions title='Receiver' items={receiverItems} /> : ''}
            <Descriptions title='Shipping Address' items={shippingAddressItems} />
        </Space>
    );
};

export default CustomerInfo;

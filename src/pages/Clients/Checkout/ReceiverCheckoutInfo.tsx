import { Descriptions, Space } from 'antd';
import type { DescriptionsProps } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const ReceiverCheckoutInfo = () => {
    const { receiverInfo, shippingAddress, shippingFee, tax, description } = useSelector(
        (state: RootState) => state.order
    );
    const customerItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tên khách hàng',
            children: `${receiverInfo.customer.name}`,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: `${receiverInfo.customer.phone}`,
        },
        {
            key: '3',
            label: 'Email',
            children: `${receiverInfo.customer.email}`,
        },
    ];

    const addReceiverItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tên người nhận mới',
            children: `${receiverInfo.addReceiver.name}`,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: `${receiverInfo.addReceiver.phone}`,
        },
        {
            key: '3',
            label: 'Email',
            children: `${receiverInfo.addReceiver.email}`,
        },
    ];

    const shippingAddressItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tinh/Thành phố',
            children: `${shippingAddress.province}`,
        },
        {
            key: '2',
            label: 'Quận/Huyện',
            children: `${shippingAddress.district}`,
        },
        {
            key: '3',
            label: 'Phường/Xã',
            children: `${shippingAddress.ward}`,
        },
        {
            key: '3',
            label: 'Đia chỉ',
            children: `${shippingAddress.address}`,
        },
    ];
    const serviceItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Cước phí vận chuyển',
            children: `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}`,
        },
        {
            key: '2',
            label: 'Thuế VAT',
            children: `${tax * 100}%`,
        },
        {
            key: '3',
            label: 'Ghi chú từ khách hàng',
            children: `${description}`,
        },
        {
            key: '4',
            label: 'Thời giang giao hàng dự kiến',
            children: `3-5 ngày từ khi admin xác nhận đơn hàng`,
        },
    ];

    return (
        <Space direction='vertical' className='gap-5 border-r-2 '>
            <Descriptions layout='vertical' title='Thông tin khách hàng' items={customerItems} />
            <Descriptions
                className='border-t-2 border-gray pt-3'
                layout='vertical'
                title='Thông tin người nhận mới'
                items={addReceiverItems}
            />
            <Descriptions
                className='border-t-2 border-gray pt-3'
                layout='vertical'
                title='Địa Chỉ giao hàng'
                items={shippingAddressItems}
            />
            <Descriptions
                className='border-t-2 border-gray pt-3'
                layout='vertical'
                title='Thông tin dịch vụ'
                items={serviceItems}
            />
        </Space>
    );
};

export default ReceiverCheckoutInfo;

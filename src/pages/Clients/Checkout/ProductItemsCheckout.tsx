import React, { useState } from 'react';
import { Button, Card, List, Typography, Divider, Tag, Image, Space, Checkbox, CheckboxProps, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useCreateOrder } from '~/hooks/orders/Mutations/useCreateOrder';
import { clearCheckoutInfo } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';
import PolicyModal from '~/components/PolicyPopup/Policy';

const { Text, Title } = Typography;

const ProductItemsCheckout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);

    const { description, receiverInfo, shippingAddress, tax, shippingFee } = useSelector(
        (state: RootState) => state.order
    );
    const cartItems = useSelector((state: RootState) => state.cartReducer.items);
    const items = cartItems?.map((item) => ({
        productId: item.productVariation.productId._id,
        productVariationId: item.productVariation._id,
        name: item?.productVariation?.productId?.name,
        price: item?.productVariation?.price,
        image: item?.productVariation?.image,
        quantity: item.quantity,
        variants: item.productVariation.variantAttributes,
    }));

    const subTotal = cartItems?.reduce((acc, item) => acc + +item.productVariation.price * item.quantity, 0) || 0;

    const taxAmount = tax * subTotal;
    const totalPrice = subTotal + taxAmount + shippingFee;

    const createOrder = useCreateOrder();

    const handleCheckout = () => {
        createOrder.mutate(
            {
                items: items as [],
                customerInfo: receiverInfo.customer,
                receiverInfo: receiverInfo.addReceiver,
                description: description ?? '',
                shippingAddress: {
                    province: shippingAddress.province,
                    district: shippingAddress.district,
                    ward: shippingAddress.ward,
                    address: shippingAddress.address,
                    provinceId: shippingAddress.provinceId!,
                    districtId: shippingAddress.districtId!,
                    wardCode: shippingAddress.wardCode,
                },
                totalPrice,
                tax,
                shippingFee,
            },
            {
                onSuccess: () => {
                    navigate('/success');
                },
                onError: () => {
                    toast.error('Đặt hàng thất bại');
                },
            }
        );
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const onChange: CheckboxProps['onChange'] = (e) => {
        setPolicyAgreed(e.target.checked);
    };

    return (
        <div className='flex h-full flex-col'>
            <Title level={4} className='mb-4'>
                Đơn hàng của bạn
            </Title>

            <div className='mb-4 flex-grow overflow-auto' style={{ maxHeight: '400px' }}>
                <List
                    itemLayout='horizontal'
                    dataSource={items}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image width={60} src={item.image} preview={false} />}
                                title={<Text strong>{item.name}</Text>}
                                description={
                                    <>
                                        <Space wrap>
                                            {item.variants.map((variant, index) => (
                                                <Tag key={index} color='blue'>
                                                    {variant.name}: {variant.value}
                                                </Tag>
                                            ))}
                                        </Space>
                                        <div className='mt-2'>
                                            <Text>Đơn giá: {formatCurrency(item.price)}</Text>
                                            <Text className='ml-4'>Số lượng: {item.quantity}</Text>
                                        </div>
                                    </>
                                }
                            />
                            <div>
                                <Text strong>{formatCurrency(item.price * item.quantity)}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </div>

            <div>
                <Divider />

                <Space direction='vertical' className='w-full'>
                    <div className='flex justify-between'>
                        <Text>Tạm tính:</Text>
                        <Text>{formatCurrency(subTotal)}</Text>
                    </div>

                    <div className='flex justify-between'>
                        <Text>Thuế VAT ({tax * 100}%):</Text>
                        <Text>{formatCurrency(taxAmount)}</Text>
                    </div>

                    <div className='flex justify-between'>
                        <Text>Phí vận chuyển:</Text>
                        <Text>{formatCurrency(shippingFee)}</Text>
                    </div>

                    <Checkbox onChange={onChange} defaultChecked={false} className='cursor-default'>
                        Tôi đồng ý với <PolicyModal />
                    </Checkbox>

                    <Divider />

                    <div className='flex justify-between'>
                        <Title level={3}>Tổng cộng:</Title>
                        <Title level={3} type='danger'>
                            {formatCurrency(totalPrice)}
                        </Title>
                    </div>
                </Space>

                <Card className='mt-4 border-blue-200 bg-blue-50'>
                    <Tooltip
                        title={
                            policyAgreed
                                ? ''
                                : 'Bạn cần đồng ý với điều khoản và chính sách của chúng tôi để tiếp tục đặt hàng'
                        }
                        color='blue'
                    >
                        <Button
                            type='primary'
                            loading={createOrder.isPending}
                            size='large'
                            block
                            onClick={handleCheckout}
                            className='h-12 text-lg font-semibold'
                            disabled={!policyAgreed}
                        >
                            Đặt hàng
                        </Button>
                    </Tooltip>
                </Card>
            </div>
        </div>
    );
};

export default ProductItemsCheckout;

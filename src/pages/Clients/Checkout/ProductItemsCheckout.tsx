import { Button, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useCreateOrder } from '~/hooks/orders/Mutations/useCreateOrder';
import { clearCheckoutInfo } from '~/store/slice/orderSlice';
import { RootState } from '~/store/store';

const ProductItemsCheckout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { description, receiverInfo, shippingAddress, tax, shippingFee } = useSelector(
        (state: RootState) => state.order
    );
    const { data: cartItems } = useGetMyCart();
    const items = cartItems?.data?.items?.map((item) => {
        return {
            productId: item.productVariation._id,
            name: item?.productVariation?.productId?.name,
            price: item?.productVariation?.price,
            image: item?.productVariation?.image,
            quantity: item.quantity,
        };
    });

    const subTotal = cartItems?.data?.items?.reduce((acc, item) => {
        return acc + +item.productVariation.price * item.quantity;
    }, 0);

    const totalPrice = Number(subTotal) + Number(tax * subTotal!) + shippingFee;

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
                totalPrice: totalPrice,
                tax: tax,
                shippingFee: shippingFee,
            },
            {
                onSuccess: () => {
                    dispatch(clearCheckoutInfo());
                    navigate('/success');
                },
                onError: () => {
                    toast.error('Đặt hàng thất bại');
                },
            }
        );
    };

    return (
        <>
            <Space className='w-full' direction='vertical'>
                {cartItems && cartItems.data.items && cartItems.data.items.length ? (
                    cartItems.data.items.map((item, index) => {
                        return (
                            <Space key={index} className='w-full justify-between rounded-lg border-2 bg-[#fff] px-5 '>
                                <Space className='h-[8rem] w-[8rem]'>
                                    <img src={item.productVariation?.image} alt='' />
                                </Space>

                                <Space className='flex flex-col'>
                                    {item.productVariation.variantAttributes.map((variant, index: number) => {
                                        return (
                                            <Typography.Text key={index}>
                                                {variant.name} {variant.value}
                                            </Typography.Text>
                                        );
                                    })}
                                </Space>
                                <Space>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        item.productVariation.price
                                    )}
                                </Space>
                                <Space>Số lượng: {item.quantity}</Space>
                            </Space>
                        );
                    })
                ) : (
                    <></>
                )}

                <Space className='w-full px-5' direction='vertical' align='end'>
                    <Typography.Text className='font-bold'>Tạm tính</Typography.Text>
                    <Typography.Text>
                        {subTotal &&
                            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subTotal)}
                    </Typography.Text>
                    <Typography.Text className='font-bold'>Thuế VAT</Typography.Text>
                    <Typography.Text>{tax * 100}%</Typography.Text>

                    <Typography.Text className='font-bold'>Phí vận chuyển</Typography.Text>
                    <Typography.Text>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}
                    </Typography.Text>
                </Space>
                <Button className='mt-5 w-full p-5 font-semibold' type='primary' onClick={handleCheckout}>
                    Đặt hàng
                </Button>
            </Space>
        </>
    );
};

export default ProductItemsCheckout;

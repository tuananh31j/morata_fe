import { Button, Form, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDescription, setReceiver } from '~/store/slice/orderSlice';
import DeliveryMethod from './DeliveryMethod';
import ReceiverInfo from './ReceiverInfo';
import ShippingAddress from './ShippingAdress';

const Shipping = () => {
    const [form] = Form.useForm();
    const districtId = Form.useWatch('districtId', form);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleDescriptionChange = (e: any) => {
        dispatch(setDescription({ description: e.target.value }));
    };

    const onClickProceed = (values: any) => {
        dispatch(
            setReceiver({
                customer: {
                    name: values.customerName,
                    email: values.customerEmail,
                    phone: values.customerPhone,
                },
                receiver: {
                    name: values.receiverName || values.customerName,
                    email: values.receiverEmail || values.customerEmail,
                    phone: values.receiverPhone || values.customerPhone,
                },
            })
        );

        navigate('/checkout');
    };

    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onClickProceed}
            className='grid grid-cols-2 gap-3 rounded-lg bg-[#fff] p-5'
        >
            <Space className='w-full' direction='vertical'>
                <ReceiverInfo />
                <ShippingAddress />

                <Form.Item label='Ghi chú cho đơn hàng này (Tùy chọn)' name='description'>
                    <Input.TextArea rows={3} onChange={handleDescriptionChange} />
                </Form.Item>
            </Space>

            <Space className='w-full bg-[#fff]' direction='vertical'>
                {districtId && (
                    <>
                        <DeliveryMethod districtId={districtId} />
                        <Button className='h-[3rem] w-full text-lg font-semibold' type='primary' htmlType='submit'>
                            Tiếp tục thanh toán
                        </Button>
                    </>
                )}
            </Space>
        </Form>
    );
};

export default Shipping;

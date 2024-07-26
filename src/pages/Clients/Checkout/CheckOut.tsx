import { Button, ConfigProvider, Form, FormInstance, Input, Radio, Select } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MiniProduct from '~/components/ProductCard/MiniProduct';
import { useMutationCreateOrder } from '~/hooks/checkout/useCreateOrder';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { RootState } from '~/store/store';
import { ICheckoutForm } from '~/types/checkout/Checkout';
import { Currency, cn } from '~/utils';
import showMessage from '~/utils/ShowMessage';
import { PaymentMethod } from '~/constants/enum';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useVnPayOrder } from '~/hooks/checkout/useVnPayOrder';

interface SubmitButtonProps {
    form: FormInstance;
}
const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type='primary' htmlType='submit' disabled={!submittable}>
            {children}
        </Button>
    );
};

const CheckOut = () => {
    const user = useSelector((state: RootState) => state.authReducer.user);
    const [form] = useForm();
    const { mutate: cashCheckout } = useMutationCreateOrder();
    const { mutate: vnPayCheckOut } = useVnPayOrder();
    const { mutate: stripeCheckout } = useMutationCheckOutSession();
    const { data: orderItem, responsePayloadCheckout } = useGetMyCart(user?._id);
    const totalPrice = orderItem
        ? orderItem?.data?.items?.reduce(
              (total: number, product) => total + product.productVariation.price * product.quantity,
              0
          )
        : 0;
    const totalQuantity = orderItem
        ? orderItem.data.items.reduce((total: number, product) => total + product.quantity, 0)
        : 0;
    const handleOnsubmit = (value: ICheckoutForm) => {
        const bodyData = {
            userId: user?._id,
            receiverInfo: {
                name: value.name,
                email: value.email,
                phone: value.phone,
            },
            shippingAddress: {
                city: value.city,
                country: value.country,
                line1: value.line1,
                line2: value.line2,
                postal_code: value.postal_code,
                state: value.state,
            },
            items: responsePayloadCheckout,
            totalPrice: value.paymentMethods === 1 ? totalPrice : totalPrice * 24560,
            paymentMethod: PaymentMethod.cash,
        };
        if (value.paymentMethods === 1) {
            if (totalPrice < 1000) {
                cashCheckout(bodyData);
            } else {
                showMessage(
                    'Your order has exceeded $1000. Please choose a different payment method.',
                    'warning',
                    3000
                );
            }
        } else if (value.paymentMethods === 2) {
            vnPayCheckOut(bodyData);
        }
    };
    const handlePayStripe = () => {
        stripeCheckout({
            items: responsePayloadCheckout,
        });
    };

    return (
        <>
            <div className='mx-auto mt-[5px] max-w-[1280px]'>
                <Link to={'/'} className='font-bold duration-300 hover:text-cyan-500'>
                    &lt; Back To Home
                </Link>
            </div>
            <div className='mx-auto mt-[25px] flex max-w-[1280px] flex-col-reverse gap-10 md:flex-row'>
                <div className='w-full rounded-lg border-[1px] border-[#7777] p-5'>
                    <h3 className='text-center text-[#777777]'>Express checkout</h3>
                    <div className='my-2'>
                        <button
                            onClick={handlePayStripe}
                            className='flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-blue-700 text-white'
                        >
                            <img
                                src='https://asset.brandfetch.io/idxAg10C0L/idTHPdqoDR.jpeg'
                                width={40}
                                height={40}
                                className='rounded-full'
                                alt=''
                            />
                            <span className='font-medium'>Stripe Pay</span>
                        </button>
                    </div>
                    {totalPrice < 1000 ? (
                        <>
                            <h3 className='text-center text-[#777777]'>Or</h3>
                            <hr />
                        </>
                    ) : (
                        <>
                            <h3 className='text-red-500 text-center'>
                                Your order has exceeded the checkout limit of $1000, please proceed to online checkout!
                            </h3>
                        </>
                    )}
                    <Form
                        name='checkout'
                        form={form}
                        onFinish={handleOnsubmit}
                        layout='vertical'
                        style={{ maxWidth: 600 }}
                    >
                        <h3 className='text-[21px] font-semibold'>Contact</h3>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Your Name'
                                name='name'
                                initialValue={user?.username}
                                rules={[{ required: true, message: 'Enter your name' }]}
                            >
                                <Input placeholder='Your Name' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Your email'
                                name='email'
                                initialValue={user?.email}
                                rules={[{ required: true, message: 'Enter your email' }]}
                            >
                                <Input placeholder='Your Email' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Phone Number'
                                name='phone'
                                rules={[{ required: true, message: 'Enter your phone number' }]}
                            >
                                <Input placeholder='phone number' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <hr />
                        <h3 className='mt-4 text-[21px] font-semibold'>Delivery</h3>
                        <div className=''>
                            <Form.Item
                                name='country'
                                label='Country'
                                rules={[{ required: true, message: 'Please select gender!' }]}
                            >
                                <Select placeholder='select your country' className='h-[48px]'>
                                    <Select.Option value='Việt Nam'>Viet Nam</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='City'
                                name='city'
                                rules={[{ required: true, message: 'Enter an email or phone number' }]}
                            >
                                <Select placeholder='select your city' className='h-[48px]'>
                                    <Select.Option value='Hà Nội'>Ha Noi</Select.Option>
                                    <Select.Option value='Hồ Chí Minh'>Ho Chi Minh</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='District'
                                name='state'
                                rules={[{ required: true, message: 'Enter District' }]}
                            >
                                <Input placeholder='District' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Street Address'
                                name='line1'
                                rules={[{ required: true, message: 'Enter Street Address' }]}
                            >
                                <Input placeholder='Street Address' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Apartment / suite/ etc'
                                name='line2'
                                rules={[{ required: true, message: 'Enter Apartment, suite, etc.r' }]}
                            >
                                <Input placeholder='Apartment, suite, etc' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Zip Code'
                                name='postal_code'
                                rules={[{ required: true, message: 'Enter Zip Code' }]}
                            >
                                <Input placeholder='0000000' className='mt-[5px] h-[48px]' />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                name={'paymentMethods'}
                                rules={[{ required: true, message: 'Please select a payment method.' }]}
                            >
                                <Radio.Group optionType='default' buttonStyle='solid'>
                                    <div className='space-y-4'>
                                        <Radio disabled={totalPrice > 1000} value={1} className=' flex items-center'>
                                            Cash on Delivery (COD)
                                        </Radio>
                                        <Radio value={2} className=' flex items-center'>
                                            VNPAY
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className='mt-[35px]'>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Button: {
                                            defaultBg: '#3c535e',
                                            defaultHoverBg: '#2a3b44',
                                            defaultHoverBorderColor: 'none',
                                        },
                                    },
                                }}
                            >
                                <Button
                                    htmlType='submit'
                                    className='h-[58px] w-full text-[16px] font-semibold text-white disabled:bg-[#3c535e] disabled:bg-opacity-70'
                                >
                                    Order Now
                                </Button>
                            </ConfigProvider>
                        </div>
                    </Form>
                </div>

                <div className=' w-full'>
                    <div className='-order-1 flex flex-col gap-[15px] px-5 '>
                        {orderItem?.data.items.map((item, index) => (
                            <MiniProduct
                                quantity={item.quantity}
                                productVariation={item.productVariation}
                                key={index}
                            />
                        ))}
                        {!orderItem?.data.items.length && (
                            <div>
                                <h3 className='text-center font-medium'>Not found product in your cart</h3>
                            </div>
                        )}
                        <div className='mt-[44px]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[14px]'>Total quantity</h3>
                                <span>{totalQuantity} Product</span>
                            </div>

                            <div className='mt-[12px] flex justify-between '>
                                <h3 className='text-[19px] font-medium'>Total </h3>
                                <span className='text-[19px] font-medium'>
                                    <span className='text-[12px] text-[#777777]'>CAD</span>{' '}
                                    {Currency.format(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;

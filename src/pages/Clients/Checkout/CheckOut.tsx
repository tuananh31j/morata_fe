import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MiniProduct from '~/components/ProductCard/MiniProduct';
import { useMutationCreateOrder } from '~/hooks/Mutations/Checkout/useCreateOrder';
import { useMutationCheckOutSession } from '~/hooks/Mutations/Checkout/useCreateOrderSession';
import useGetMyCart from '~/hooks/Queries/Cart/useGetMyCart';
import { RootState } from '~/store/store';
import { ICheckoutForm } from '~/types/checkout/Checkout';
import { Currency, cn } from '~/utils';
import showMessage from '~/utils/ShowMessage';

const CheckOut = () => {
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { mutate: cashCheckout } = useMutationCreateOrder();
    const { mutate: stripeCheckout } = useMutationCheckOutSession();
    const { data: orderItem, responsePayloadCheckout } = useGetMyCart(user?._id);
    const totalPrice = orderItem
        ? orderItem?.data?.items?.reduce(
              (total: number, product) => total + product.productId.price * product.quantity,
              0
          )
        : 0;
    const totalQuantity = orderItem
        ? orderItem.data.items.reduce((total: number, product) => total + product.quantity, 0)
        : 0;
    const handleOnsubmit = (value: ICheckoutForm) => {
        if (totalPrice > 1000) {
            showMessage(
                'Your order has exceeded the checkout limit of $1000, please proceed to online checkout!',
                'warning',
                3000
            );
        } else {
            const bodyData = {
                userId: user?._id,
                customerInfo: {
                    name: user?.username,
                    email: user?.email,
                    phone: value.phone,
                },
                shippingAddress: value,
                items: responsePayloadCheckout,
                totalPrice,
                paymentMethod: 'cash',
            };
            cashCheckout(bodyData);
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
                            <h3 className='text-center text-red-500'>
                                Your order has exceeded the checkout limit of $1000, please proceed to online checkout!
                            </h3>
                        </>
                    )}
                    <Form
                        name='checkout'
                        className={cn({
                            ['opacity-65']: totalPrice > 1000,
                        })}
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
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='Your Name'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>
                        <div className='mt-[15px]'>
                            <Form.Item
                                label='Phone Number'
                                name='phone'
                                rules={[{ required: true, message: 'Enter your phone number' }]}
                            >
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='Email or phone number'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>

                        <h3 className='text-[21px] font-semibold'>Delivery</h3>

                        <div className=''>
                            <Form.Item
                                name='country'
                                label='Country'
                                rules={[{ required: true, message: 'Please select gender!' }]}
                            >
                                <Select
                                    disabled={totalPrice > 1000}
                                    placeholder='select your country'
                                    className='h-[48px]'
                                >
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
                                <Select
                                    disabled={totalPrice > 1000}
                                    placeholder='select your city'
                                    className='h-[48px]'
                                >
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
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='District'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Street Address'
                                name='line1'
                                rules={[{ required: true, message: 'Enter Street Address' }]}
                            >
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='Street Address'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Apartment / suite/ etc'
                                name='line2'
                                rules={[{ required: true, message: 'Enter Apartment, suite, etc.r' }]}
                            >
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='Apartment, suite, etc'
                                    className='mt-[5px] h-[48px]'
                                />
                            </Form.Item>
                        </div>
                        <div className=''>
                            <Form.Item
                                label='Zip Code'
                                name='postal_code'
                                rules={[{ required: true, message: 'Enter Zip Code' }]}
                            >
                                <Input
                                    disabled={totalPrice > 1000}
                                    placeholder='0000000'
                                    className='mt-[5px] h-[48px]'
                                />
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
                                    disabled={totalPrice > 1000}
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
                            <MiniProduct quantity={item.quantity} productId={item.productId} key={index} />
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

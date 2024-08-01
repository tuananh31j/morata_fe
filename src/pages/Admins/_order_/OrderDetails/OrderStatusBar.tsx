import { Space, Steps } from 'antd';

const OrderStatusBar = () => {
    return (
        <Space className='mt-5 flex w-full items-center justify-center rounded-md bg-[#fff] p-4'>
            <Steps
                size='small'
                current={1}
                className='mx-auto '
                items={[
                    {
                        title: 'Pending',
                        className: 'text-primary w-[20rem]',
                    },
                    {
                        title: 'Confirmed',
                        className: 'text-primary w-[20rem]',
                    },
                    {
                        title: 'Shipping',
                        className: 'text-primary w-[20rem]',
                    },
                    {
                        title: 'Delivered',
                        className: 'text-primary w-[20rem]',
                    },
                    {
                        title: 'Done',
                        className: 'text-primary w-[20rem]',
                    },
                ]}
            />
        </Space>
    );
};

export default OrderStatusBar;

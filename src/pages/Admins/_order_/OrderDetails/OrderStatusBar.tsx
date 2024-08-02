import { Space, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { ORDER_STATUS } from '~/constants/order';

interface Props {
    orderStatus: string;
}

const OrderStatusBar = ({ orderStatus }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const handleStepChange = () => {
        switch (orderStatus) {
            case ORDER_STATUS.PENDING:
                return setCurrentStep(0);
            case ORDER_STATUS.CONFIRMED:
                return setCurrentStep(1);
            case ORDER_STATUS.SHIPPING:
                return setCurrentStep(2);
            case ORDER_STATUS.DELIVERED:
                return setCurrentStep(3);
            case ORDER_STATUS.DONE:
                return setCurrentStep(4);

            default:
                return currentStep;
        }
    };

    useEffect(() => {
        handleStepChange();
    }, [orderStatus]);

    return (
        <Space className='mt-5 flex w-full items-center justify-center rounded-md bg-[#fff] p-4'>
            <Steps
                size='small'
                current={currentStep}
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

import { FC } from 'react';
import { PaymentMethod } from '~/types/enum';
import { ICustomerInfo, IShippingAddress } from '~/types/Order';

type IPurchaseInformationProps = {
    customerInfo: ICustomerInfo;
    description: string;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    shippingAddress: IShippingAddress;
    totalPrice: number;
    tax: number;
    shippingFee: number;
    created: string;
};
const PurchaseInformation: FC<IPurchaseInformationProps> = ({
    customerInfo,
    description,
    paymentMethod,
    isPaid,
    shippingAddress,
    totalPrice,
    tax,
    shippingFee,
    created,
}) => {
    return (
        <div className='grid grid-cols-12 md:gap-7'>
            <div className='border-default-200 col-span-12 rounded-lg border md:col-span-6'>
                <div className='border-default-200 border-b p-4'>
                    <h4 className='text-default-800 text-sm font-medium capitalize'>shipment details</h4>
                </div>
                <div className='p-4'>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold'>Name: </span>
                        <span className='capitalize'>{customerInfo.name}</span>
                    </h4>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold'>Email: </span>
                        <span className='capitalize'>{customerInfo.email}</span>
                    </h4>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold'>Phone: </span>
                        <span className='capitalize'>{customerInfo.phone}</span>
                    </h4>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold'>Description: </span>
                        <span className='capitalize'>{description}</span>
                    </h4>
                    <div>
                        <h4 className='text-default-800 mb-4 text-base font-medium'>
                            <span className='font-semibold'>Address: </span>
                        </h4>
                        <ul className='ml-6 list-disc'>
                            <li className='text-default-600 mb-1 text-sm'>Country: {shippingAddress?.country}</li>
                            <li className='text-default-600 mb-1 text-sm'>City: {shippingAddress?.city}</li>
                            <li className='text-default-600 mb-1 text-sm'>State: {shippingAddress?.state}</li>
                            <li className='text-default-600 mb-1 text-sm'>
                                Postal code: {shippingAddress?.postal_code}
                            </li>
                            <li className='text-default-600 mb-1 text-sm'>Line 1: {shippingAddress?.line1}</li>
                            <li className='text-default-600 mb-1 text-sm'>Line 2: {shippingAddress?.line2}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='border-default-200 col-span-12 rounded-lg border md:col-span-6'>
                <div className='border-default-200 border-b p-4'>
                    <h4 className='text-default-800 text-sm font-medium capitalize'>Transaction details</h4>
                </div>
                <div className='p-4'>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold capitalize'>payment method: </span>
                        <span className='capitalize'>{paymentMethod}</span>
                    </h4>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold capitalize'>payment status: </span>
                        <span className='capitalize'>{isPaid ? 'paid' : 'unpaid'}</span>
                    </h4>
                    <h4 className='text-default-800 mb-4 text-base font-medium'>
                        <span className='font-semibold capitalize'>Created: </span>
                        <span className='capitalize'>{created}</span>
                    </h4>
                </div>
                <div className='p-4'>
                    <div className='border-default-200 flex justify-between border-b pb-4'>
                        <h4 className='text-default-700 text-sm'>Subtotal: </h4>
                        <h4 className='text-default-800 text-sm font-medium'>${totalPrice}</h4>
                    </div>
                    <div className='border-default-200 flex justify-between border-b py-4'>
                        <h4 className='text-default-700 text-sm'>Tax: </h4>
                        <h4 className='text-default-800 text-sm font-medium'>{tax}%</h4>
                    </div>
                    <div className='border-default-200 flex justify-between border-b py-4'>
                        <h4 className='text-default-700 text-sm'>Shipping: </h4>
                        <h4 className='text-default-800 text-sm font-medium'>{shippingFee === 0 && 'Free'}</h4>
                    </div>
                    <div className='flex justify-between py-4'>
                        <h4 className='text-default-700 text-lg'>Total: </h4>
                        <h4 className='text-default-800 text-lg font-medium'>${totalPrice}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseInformation;

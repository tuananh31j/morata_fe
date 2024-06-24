import { OrderStatus } from './enum';

export interface IOrder {
    _id?: string;
    items: {
        name: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    totalPrice: number;
    tax: number;
    shippingFee: number;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    receiverInfo: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    };
    paymentMethod: string;
    isPaid: boolean;
    orderStatus: OrderStatus;
    createdAt: string;
}
export interface IAllOrder {
    _id: string;
    name: string;
    totalPrice: number;
    paymentMethod: string;
    orderStatus: string;
    isPaid: boolean;
    createdAt: string;
}

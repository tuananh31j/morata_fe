import { OrderStatus } from './enum';

export interface IOrderDetails {
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

export interface IOrderResponse {
    orders: Array<{
        _id: string;
        totalPrice: number;
        paymentMethod: string;
        isPaid: boolean;
        orderStatus: OrderStatus;
        createdAt: string;
    }>;
    page: number;
    totalDocs: number;
    totalPages: number;
}

export type IOrderHead = {
    _id: string;
    name: string;
    totalPrice: number;
    paymentMethod: string;
    orderStatus: OrderStatus;
    isPaid: boolean;
    createdAt: string;
};
export type IOrderParams = {
    paymentMethod: string;
    isPaid: string;
    orderStatus: string;
    page: string;
    limit: string;
    sort: string;
    search?: string;
};

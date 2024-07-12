import { OrderStatus, PaymentMethod } from './enum';

export type IShippingAddress = {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
};
export type ICustomerInfo = {
    name: string;
    email: string;
    phone: string;
};

export type IOrderItem = {
    name: string;
    quantity: number;
    price: number;
    image: string;
};
export interface IOrderDetails {
    items: IOrderItem[];
    totalPrice: number;
    tax: number;
    shippingFee: number;
    customerInfo: ICustomerInfo;
    receiverInfo: ICustomerInfo;
    shippingAddress: IShippingAddress;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    orderStatus: OrderStatus;
    createdAt: string;
    description: string;
}

export interface IOrderResponse {
    orders: Array<{
        _id: string;
        totalPrice: number;
        paymentMethod: PaymentMethod;
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

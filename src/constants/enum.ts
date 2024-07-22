/* eslint-disable no-shadow */
export enum OrderStatus {
    pending = 'pending',
    canceled = 'canceled',
    confirmed = 'confirmed',
    shipping = 'shipping',
    delivered = 'delivered',
    done = 'done',
}

export enum PaymentMethod {
    cash = 'cash',
    card = 'card',
}

export const ORDER_STATUS_ARR = Object.values(OrderStatus);

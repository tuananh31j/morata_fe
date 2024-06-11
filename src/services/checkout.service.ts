import { CHECKOUT_ENDPOINT } from '~/constants/endpoint';
import { ICheckoutCash, IPayloadItemsOrder } from '~/types/checkout/Checkout';
import instance from '~/utils/api/axiosIntance';

export const checkoutService = {
    async createOrder(body: ICheckoutCash) {
        const res = await instance.post(`${CHECKOUT_ENDPOINT.ORDERS}`, body);
        return res.data;
    },
    async createOrderSession(body: { items: IPayloadItemsOrder[] | undefined }) {
        const res = await instance.post(`${CHECKOUT_ENDPOINT.SESSION}`, body);
        return res.data;
    },
};

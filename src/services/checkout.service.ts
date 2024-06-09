import { CHECKOUT_ENDPOINT } from '~/constants/endpoint';
import { instance } from '~/utils/api/axiosIntance';

export const checkoutService = {
    async createOrder(body: any) {
        const res = await instance.post(`${CHECKOUT_ENDPOINT.ORDERS}`, body);
    },
    async createOrderSession(body: any) {
        const res = await instance.post(`${CHECKOUT_ENDPOINT.SESSION}`, body);
    },
};

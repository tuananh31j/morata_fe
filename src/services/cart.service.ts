import { AddCartBody, HandleCart } from '~/types/Cart';
import { instance } from '~/utils/api/axiosIntance';

const endPoint = `carts`;
export const cartService = {
    async getItemCart(id?: string) {
        const res = await instance.get(`${endPoint}/${id}`);
        return res.data;
    },
    async addToCart(body: AddCartBody) {
        const res = await instance.post(`${endPoint}/add`, body);
        return res.data;
    },
    async increase(body: HandleCart) {
        const res = await instance.patch(`${endPoint}/increase`, body);
        return res.data;
    },
    async removeCart(body: HandleCart) {
        const res = await instance.patch(`${endPoint}/remove`, body);
        return res.data;
    },
    async decrease(body: HandleCart) {
        const res = await instance.patch(`${endPoint}/decrease`, body);
        return res.data;
    },
};

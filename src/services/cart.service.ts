import { CART_ENDPOINT } from '~/constants/endpoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IActionCartPayload, IAddCartPayload } from '~/types/cart/CartPayload';
import { ICartDataResponse } from '~/types/cart/CartResponse';
import instance from '~/utils/api/axiosIntance';

export const cartService = {
    async getItemCart(id?: string) {
        const res = await instance.get<IAxiosResponse<ICartDataResponse>>(`${CART_ENDPOINT.GET}/${id}`);
        return res.data;
    },
    async addToCart(body: IAddCartPayload) {
        const res = await instance.post<IAxiosResponse<ICartDataResponse>>(`${CART_ENDPOINT.ADDCART}`, body);
        return res.data;
    },
    async updateQuantity(body: IAddCartPayload) {
        const res = await instance.patch(`${CART_ENDPOINT.UPDATEQUANTITY}`, body);
        return res.data;
    },
    async removeCart(body: IActionCartPayload) {
        const res = await instance.patch<IAxiosResponse<ICartDataResponse>>(`${CART_ENDPOINT.REMOVEITEM}`, body);
        return res.data;
    },
    async removeAllCart(body: { userId: string }) {
        await instance.patch(`${CART_ENDPOINT.GET}/removeAll`, body);
    },
};

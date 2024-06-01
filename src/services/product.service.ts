import { RequestRelated } from '~/types/request';
import { axiosClassic } from '~/utils/api/axiosIntance';

const endPoint = '/products';

const productService = {
    async getAll() {
        const res = await axiosClassic.get(`${endPoint}/all`);
        return res.data;
    },

    async getTopDeals() {
        const res = await axiosClassic.get(`${endPoint}/deals`);
        return res.data;
    },
    async getDetail(id: string) {
        const res = await axiosClassic.get(`${endPoint}/${id}`);
        return res.data;
    },
    async getRelated(body: RequestRelated) {
        const res = await axiosClassic.get(`${endPoint}/related`, {
            data: body,
        });
        return res.data;
    },
};

export default productService;

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
};

export default productService;

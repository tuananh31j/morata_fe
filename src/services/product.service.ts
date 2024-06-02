import { axiosClassic } from '~/utils/api/axiosIntance';

const endPoint = '/products';

const productService = {
    async getAll() {
        const res = await axiosClassic.get(`${endPoint}/all`);
        return res.data;
    },
    async getProductsByCatregory(id: string, params: { page: number; limit: number }) {
        const res = await axiosClassic.get(`${endPoint}/byCate/${id}`, { params });
        return res.data;
    },
};

export default productService;

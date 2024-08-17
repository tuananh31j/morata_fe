import { BRAND_ENDPOINT } from '~/constants/endpoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IBrand } from '~/types/Brand';
import instance from '~/utils/api/axiosIntance';

const brandService = {
    async getAll() {
        const res = await instance.get<IAxiosResponse<IBrand[]>>(`${BRAND_ENDPOINT.ALL}`);
        return res.data;
    },
    async getBrand(id: string) {
        const res = await instance.get<IAxiosResponse<IBrand>>(`${BRAND_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
    async create(payload: { name: string }) {
        const res = await instance.post<IAxiosResponse<null>>(`${BRAND_ENDPOINT.CREATE}`, payload);
        return res.data;
    },
    async update(payload: IBrand) {
        const id = payload._id;
        const res = await instance.patch<IAxiosResponse<null>>(`${BRAND_ENDPOINT.UPDATE}/${id}`, payload);
        return res.data;
    },
};

export default brandService;

import { BRAND_ENDPOINT } from '~/constants/endpoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IBrand } from '~/types/Brand';
import instance from '~/utils/api/axiosIntance';

const brandService = {
    async getAll() {
        const res = await instance.get<IAxiosResponse<IBrand[]>>(`${BRAND_ENDPOINT.ALL}`);
        return res.data;
    },
};

export default brandService;

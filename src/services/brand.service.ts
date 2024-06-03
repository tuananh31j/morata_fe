import { IAxiosResponse } from '~/types/AxiosResponse';
import { IBrand } from '~/types/Brand';
import { axiosClassic } from '~/utils/api/axiosIntance';

const endPoint = '/brands';

const brandService = {
    async getAll() {
        const res = await axiosClassic.get<IAxiosResponse<IBrand[]>>(`${endPoint}/all`);
        return res.data;
    },
};

export default brandService;

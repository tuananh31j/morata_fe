import { IAxiosResponse } from '~/types/AxiosResponse';
import { ICategory } from '~/types/Category';
import { axiosClassic } from '~/utils/api/axiosIntance';

const endPoint = '/categories';

const categoryService = {
    async getAll() {
        const res = await axiosClassic.get<IAxiosResponse<ICategory[]>>(`${endPoint}/all`);
        return res.data;
    },
    async getPopular() {
        const res = await axiosClassic.get(`${endPoint}/popular`);
        return res.data;
    },
};

export default categoryService;

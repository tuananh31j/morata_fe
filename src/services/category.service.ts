import { axiosClassic } from '~/utils/api/axiosIntance';

const endPoint = 'categories';

const cateogoryService = {
    async getPopular() {
        const res = await axiosClassic.get(`${endPoint}/popular`);
        return res.data;
    },
};
export default cateogoryService;

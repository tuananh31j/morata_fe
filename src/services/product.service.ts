import { IAllProductsResponse, IProduct } from '~/types/Product';
import { IParams } from '~/types/Api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { PRODUCT_ENDPOINT } from '~/constants/endpoint';

const productService = {
    async getAll(params?: IParams) {
        const res = await instance.get<IAxiosResponse<IAllProductsResponse>>(`${PRODUCT_ENDPOINT.ALL}`, {
            params,
        });
        return res.data;
    },
    async getProductsByCategory(id: string, params: IParams) {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.BYCATE}/${id}`, {
            params,
        });
        return res.data;
    },
    async getLatest() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.LATEST}`);
        return res.data;
    },
    async getTopDeals() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.DEALS}`);
        return res.data;
    },
    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<IProduct>>(`${PRODUCT_ENDPOINT.PRODUCT}/${id}`);
        return res.data;
    },
    async getTopReviews() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.REVIEWS}`);
        return res.data;
    },
    async getRelated(params: { id: string; cateId: string }) {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.RELATED}`, {
            params,
        });
        return res.data;
    },
};

export default productService;

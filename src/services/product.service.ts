import { IAllProductsResponse, IProduct, IAllProductResponseNew, IProductItemNew } from '~/types/Product';
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

    // new model
    async getAllProducts() {
        const res = await instance.get<IAxiosResponse<IAllProductResponseNew>>(`${PRODUCT_ENDPOINT.ALL}`);
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
        const res = await instance.get<IAxiosResponse<IProductItemNew>>(`${PRODUCT_ENDPOINT.PRODUCT}/${id}`);
        return res.data;
    },
    async getTopReviews() {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.REVIEWS}`);
        return res.data;
    },
    async getRelated(params: { id: string; cateId: string }) {
        const res = await instance.get<IAxiosResponse<IProductItemNew[]>>(`${PRODUCT_ENDPOINT.RELATED}`, {
            params,
        });
        return res.data;
    },
    async createProduct(data: FormData) {
        const res = await instance.post<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.CREATE}`, data);
        return res.data;
    },
    async updateProduct(data: FormData, id: string) {
        const res = await instance.patch<IAxiosResponse<IProduct>>(`${PRODUCT_ENDPOINT.UPDATE}/${id}`, data);
        return res.data;
    },
    async deleteProduct(id: string) {
        const res = await instance.delete<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.DELETE}/${id}`);
        return res.data;
    },
};

export default productService;

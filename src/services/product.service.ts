import {
    IAllProductsResponse,
    IProduct,
    IAllProductResponseNew,
    IProductItemNew,
    IProductDetailsAdmin,
    IFilterResponse,
} from '~/types/Product';
import { Params } from '~/types/Api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { PRODUCT_ENDPOINT } from '~/constants/endpoint';

const productService = {
    /* eslint-disable */
    async getAllProductForAdmin(params?: Params) {
        const res = await instance.get<IAxiosResponse<IAllProductsResponse>>(`${PRODUCT_ENDPOINT.ALL_ADMIN}`, {
            params,
        });
        return res.data;
    },

    async getDetailsProductForAdmin(proId: string) {
        const res = await instance.get<IAxiosResponse<IProductDetailsAdmin>>(
            `${PRODUCT_ENDPOINT.PRODUCT}/portal/${proId}`
        );
        return res.data;
    },
    // new model
    async getAllProducts(params?: Params) {
        const res = await instance.get<IAxiosResponse<IAllProductResponseNew>>(`${PRODUCT_ENDPOINT.ALL}`, {
            params,
        });
        return res.data;
    },
    /* eslint-enable */
    async getProductsByCategory(id: string, params: Params) {
        const res = await instance.get<IAxiosResponse<IProduct[]>>(`${PRODUCT_ENDPOINT.BYCATE}/${id}`, {
            params,
        });
        return res.data;
    },
    async getLatest() {
        const res = await instance.get<IAxiosResponse<IProductItemNew[]>>(`${PRODUCT_ENDPOINT.LATEST}`);
        return res.data;
    },
    async getTopDeals() {
        const res = await instance.get<IAxiosResponse<IProductItemNew[]>>(`${PRODUCT_ENDPOINT.DEALS}`);
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
        const res = await instance.patch<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.UPDATE}/${id}`, data);
        return res.data;
    },
    async updateProductVariant(data: FormData, variantId: string) {
        const res = await instance.patch<IAxiosResponse<null>>(
            `${PRODUCT_ENDPOINT.UPDATE}/variation/${variantId}`,
            data
        );
        return res.data;
    },
    async createProductVariant(data: FormData) {
        const res = await instance.post<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.UPDATE}/variation`, data);
        return res.data;
    },
    async updateVariations(data: FormData, id: string) {
        const res = await instance.patch<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.UPDATE_VARIATIONS}/${id}`, data);
        return res.data;
    },
    async createVariationsToProduct(data: FormData) {
        const res = await instance.post<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.CREATE_VARIATIONS}`, data);
        return res.data;
    },
    async deleteProduct(id: string) {
        const res = await instance.delete<IAxiosResponse<null>>(`${PRODUCT_ENDPOINT.DELETE}/${id}`);
        return res.data;
    },
    async getFilterByCategory(id: string) {
        const res = await instance.get<IAxiosResponse<IFilterResponse[]>>(`${PRODUCT_ENDPOINT.FILTER}/${id}`);
        return res.data;
    },
};

export default productService;

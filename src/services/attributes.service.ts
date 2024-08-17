import { ATTRIBUTES_ENDPOINT } from '~/constants/endpoint';
import { Params } from '~/types/Api';
import { IAllAttributesResponse, IAttributeReponse, IAttributesValue } from '~/types/Attributes';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IAttributeFormData } from '~/types/Category';
import instance from '~/utils/api/axiosIntance';

export const attributesServices = {
    async getAllAttributesByCate(cateId: string) {
        const res = await instance.get<IAxiosResponse<IAttributeReponse>>(`${ATTRIBUTES_ENDPOINT.ALL}/${cateId}`);
        return res.data;
    },

    async getAllAttributes(params: Params) {
        const res = await instance.get<IAxiosResponse<IAllAttributesResponse>>(ATTRIBUTES_ENDPOINT.All, { params });
        return res.data;
    },
    async getAttributeDetails(id: string) {
        const res = await instance.get<IAxiosResponse<IAttributesValue>>(`${ATTRIBUTES_ENDPOINT.DETAILS}/${id}`);
        return res.data;
    },

    async createAttribute(payload: IAttributeFormData) {
        const res = await instance.post<IAxiosResponse<IAttributesValue>>(ATTRIBUTES_ENDPOINT.CREATE, payload);
        return res.data;
    },
    async updateAttibute(payload: IAttributeFormData) {
        const id = payload._id;
        const res = await instance.put<IAxiosResponse<IAttributesValue>>(
            `${ATTRIBUTES_ENDPOINT.UPDATE}/${id}`,
            payload
        );
        return res.data;
    },
};

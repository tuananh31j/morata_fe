import { ATTRIBUTES_ENDPOINT } from '~/constants/endpoint';
import { IAttributeReponse, IAttributeResponseNew } from '~/types/Attributes';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IAttributeFormData } from '~/types/Category';
import instance from '~/utils/api/axiosIntance';

export const attributesServices = {
    async getAllAttributesByCate(cateId: string) {
        const res = await instance.get<IAxiosResponse<IAttributeReponse[]>>(`${ATTRIBUTES_ENDPOINT.ALL}/${cateId}`);
        return res.data;
    },

    async getAllAttributes() {
        const res = await instance.get<IAxiosResponse<IAttributeResponseNew[]>>(ATTRIBUTES_ENDPOINT.All);
        return res.data;
    },

    async createAttribute(payload: IAttributeFormData) {
        const res = await instance.post<IAxiosResponse<IAttributeResponseNew>>(ATTRIBUTES_ENDPOINT.CREATE, payload);
        return res.data;
    },
};

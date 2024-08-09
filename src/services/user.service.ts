import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { USER_ENDPOINT } from '~/constants/endpoint';
import { IAllUsersResponse, IUserProfileResponse, IUsersResponse } from '~/types/User ';

const userService = {
    async getProfile() {
        const res = await instance.get<IAxiosResponse<IUserProfileResponse>>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },

    async getAll() {
        const res = await instance.get<IAxiosResponse<IAllUsersResponse>>(`${USER_ENDPOINT.ALL}`);
        return res.data;
    },
    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<IUsersResponse>>(`${USER_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
    async updateUser(data: FormData, id: string) {
        const res = await instance.patch<IAxiosResponse<IUsersResponse>>(`${USER_ENDPOINT.UPDATE}/${id}`, data);
        return res.data;
    },
};

export default userService;

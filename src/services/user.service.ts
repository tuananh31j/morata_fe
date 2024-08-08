import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { USER_ENDPOINT } from '~/constants/endpoint';
import { IAllUsersResponse, IUserProfileResponse } from '~/types/User ';

const userService = {
    async getProfile() {
        const res = await instance.get<IAxiosResponse<IUserProfileResponse>>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },

    async getAll() {
        const res = await instance.get<IAxiosResponse<IAllUsersResponse>>(`${USER_ENDPOINT.ALL}`);
        return res.data;
    },
};

export default userService;

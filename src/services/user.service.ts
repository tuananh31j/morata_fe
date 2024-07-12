import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { USER_ENDPOINT } from '~/constants/endpoint';
import { IUserProfileResponse } from '~/types/User ';

const userService = {
    async getProfile() {
        const res = await instance.get<IAxiosResponse<IUserProfileResponse>>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },
};

export default userService;

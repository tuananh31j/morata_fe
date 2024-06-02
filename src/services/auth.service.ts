import { axiosClassic } from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ILoginResponse, IRegisterResponse, LoginFormData } from '~/types/Schemas/Auth';

const URL = '/auth';

const AuthService = {
    login(body: LoginFormData) {
        return axiosClassic.post<IAxiosResponse<ILoginResponse>>(`${URL}/login`, body);
    },
    register(body: { username: string; email: string; password: string }) {
        return axiosClassic.post<IAxiosResponse<IRegisterResponse>>(`${URL}/register`, body);
    },
    getNewToken() {
        return axiosClassic.post<IAxiosResponse<{ accessToken: string }>>(`${URL}/refresh`);
    },
};

export default AuthService;

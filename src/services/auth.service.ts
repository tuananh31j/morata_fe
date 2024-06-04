import { axiosClassic } from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ILoginResponse, IRegisterResponse, LoginFormData } from '~/types/Schemas/Auth';
import { AUTH_ENDPOINT } from '~/constants/endpoint';

const AuthService = {
    login(body: LoginFormData) {
        return axiosClassic.post<IAxiosResponse<ILoginResponse>>(`${AUTH_ENDPOINT.LOGIN}`, body);
    },
    register(body: { username: string; email: string; password: string }) {
        return axiosClassic.post<IAxiosResponse<IRegisterResponse>>(`${AUTH_ENDPOINT.REGISTER}`, body);
    },
    getNewToken() {
        return axiosClassic.post<IAxiosResponse<{ accessToken: string }>>(`${AUTH_ENDPOINT.REFRESH}`);
    },
    logout() {
        return axiosClassic.post(`${AUTH_ENDPOINT.LOGOUT}`);
    },
};

export default AuthService;

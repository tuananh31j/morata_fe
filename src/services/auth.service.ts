import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ILoginResponse, IRegisterResponse, LoginFormData } from '~/types/Schemas/Auth';
import { AUTH_ENDPOINT } from '~/constants/endpoint';

const AuthService = {
    login(body: LoginFormData) {
        return instance.post<IAxiosResponse<ILoginResponse>>(`${AUTH_ENDPOINT.LOGIN}`, body);
    },
    register(body: { username: string; email: string; password: string }) {
        return instance.post<IAxiosResponse<IRegisterResponse>>(`${AUTH_ENDPOINT.REGISTER}`, body);
    },
    sendVerify(body: { email: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.SENDMAIL}`, body);
    },
    sendResetPassword(body: { email: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.SENDRESETPASS}`, body);
    },
    verify(body: { token: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.VERIFY}`, body);
    },
    resetPassword(body: { token: string; password: string }) {
        return instance.post<IAxiosResponse<null>>(`${AUTH_ENDPOINT.RESETPASSWORD}`, body);
    },
    getNewToken() {
        return instance.post<IAxiosResponse<{ accessToken: string }>>(`${AUTH_ENDPOINT.REFRESH}`);
    },
    logout() {
        return instance.post(`${AUTH_ENDPOINT.LOGOUT}`);
    },
};

export default AuthService;

/* eslint-disable no-shadow */
import { instance } from './axiosIntance';
import { getAccessToken, setAccessToken } from './apiHelper';
import AuthService from '~/services/auth.service';

instance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config && config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
            originalRequest._isRetry = true;

            try {
                const { data } = await AuthService.getNewToken();
                setAccessToken(data.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
                return instance.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
        throw error;
    }
);

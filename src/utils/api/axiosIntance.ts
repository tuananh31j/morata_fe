/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getContentType } from './apiHelper';

export const errorCatch = (error: any): string => {
    const message = error?.message?.data?.message;

    // eslint-disable-next-line no-nested-ternary
    return message ? (typeof error.response.data.message === 'object' ? message[0] : message) : error.message;
};
const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    headers: getContentType(),
    withCredentials: true,
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);

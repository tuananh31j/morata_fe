import axios from 'axios';
import { getContentType } from './apiHelper';

const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    headers: getContentType(),
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);

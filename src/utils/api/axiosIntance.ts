import axios from 'axios';
import { getContentType } from './apiHelper';

const axiosOptions = {
    baseURL: 'http://localhost:5000/api/v1',
    headers: getContentType(),
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);

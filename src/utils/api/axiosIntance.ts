/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getContentType } from './apiHelper';
import queryString from 'query-string';
import { IParams } from '~/types/Api';

const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_API_URL,
    headers: getContentType(),
    withCredentials: true,
    paramsSerializer: (params: IParams) => queryString.stringify(params),
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);

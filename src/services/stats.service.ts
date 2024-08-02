import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { IOrderStatsResponse, IProductStatsResponse } from '~/types/Stats';
import { Dayjs } from 'dayjs';

const statsService = {
    async getOrderAndRevenueByRange(startDate: Dayjs, endDate: Dayjs) {
        if (!startDate || !endDate) {
            return { data: [] };
        }

        const { data } = await instance.get<IAxiosResponse<IOrderStatsResponse>>(`${STATS_ENDPOINT.DATE_RANGE}`, {
            params: {
                startDate: startDate.format('DD-MM-YYYY'),
                endDate: endDate.format('DD-MM-YYYY'),
            },
        });
        return data;
    },

    async getProductByRange(startDate: Dayjs, endDate: Dayjs) {
        if (!startDate || !endDate) {
            return { data: [] };
        }

        const { data } = await instance.get(`${STATS_ENDPOINT.PRODUCTS}`, {
            params: {
                startDate: startDate.format('DD-MM-YYYY'),
                endDate: endDate.format('DD-MM-YYYY'),
            },
        });
        return data;
    },
};

export default statsService;

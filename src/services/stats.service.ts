import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { IOrderStatsResponse, IProductStatsResponse, ITotalStatsResponse } from '~/types/Stats';
import dayjs, { Dayjs } from 'dayjs';

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
    async getOrderAndRevenueByYear(year: number) {
        const { data } = await instance.get(`${STATS_ENDPOINT.YEARLY_STATS}`, {
            params: {
                year,
            },
        });
        return data;
    },
    async getOrderAndRevenueByMonthly(year: number) {
        const { data } = await instance.get<IAxiosResponse<IOrderStatsResponse>>(`${STATS_ENDPOINT.MONTHLY_STATS}`, {
            params: {
                year,
            },
        });
        return data;
    },
    async getTotalStats(dateFilter: string, startDate?: Dayjs, endDate?: Dayjs, month?: number, year?: number) {
        const params: any = { dateFilter };

        if (startDate) params.startDate = startDate.format('DD-MM-YYYY');
        if (endDate) params.endDate = endDate.format('DD-MM-YYYY');
        if (month) params.month = month;
        if (year) params.year = year;

        const { data } = await instance.get<IAxiosResponse<ITotalStatsResponse>>(`${STATS_ENDPOINT.TOTAL}`, { params });
        return data;
    },
    async getTopBuyers(
        dateFilter: string,
        startDate?: dayjs.Dayjs,
        endDate?: dayjs.Dayjs,
        month?: number,
        year?: number
    ) {
        const params: any = { dateFilter };

        if (startDate) params.startDate = startDate.format('DD-MM-YYYY');
        if (endDate) params.endDate = endDate.format('DD-MM-YYYY');
        if (month) params.month = month;
        if (year) params.year = year;

        const { data } = await instance.get<IAxiosResponse<any>>(`${STATS_ENDPOINT.TOP_BUYERS}`, { params });
        return data;
    },
};

export default statsService;

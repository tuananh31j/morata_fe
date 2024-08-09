import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';
import moment from 'moment';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

export const useTotalStats = (dateInput: DateInput) => {
    return useQuery({
        queryKey: [QUERY_KEY.TOTAL_STATS, dateInput],
        queryFn: async () => {
            let params: Record<string, string | number> = {};

            switch (dateInput.type) {
                case 'single':
                    params = { dateFilter: 'single', startDate: moment(dateInput.date).format('DD-MM-YYYY') };
                    break;
                case 'range':
                    params = {
                        dateFilter: 'range',
                        startDate: moment(dateInput.start).format('DD-MM-YYYY'),
                        endDate: moment(dateInput.end).format('DD-MM-YYYY'),
                    };
                    break;
                case 'monthly':
                    params = { month: dateInput.month, year: dateInput.year };
                    break;
                case 'yearly':
                    params = { year: dateInput.year };
                    break;
                default:
                    throw new Error('Invalid date input type');
            }

            const { data } = await instance.get(STATS_ENDPOINT.TOTAL, { params });
            return data;
        },
    });
};

import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';
import { Dayjs } from 'dayjs';

export const UseRangePicker = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    return useQuery({
        queryKey: [QUERY_KEY.DATE_RANGE, startDate, endDate],
        queryFn: async () => {
            if (!startDate || !endDate) {
                return { data: [] };
            }
            const { data } = await instance.get(STATS_ENDPOINT.DATE_RANGE, {
                params: {
                    startDate: startDate.format('DD-MM-YYYY'),
                    endDate: endDate.format('DD-MM-YYYY'),
                },
            });
            return data;
        },
        enabled: !!startDate && !!endDate,
    });
};

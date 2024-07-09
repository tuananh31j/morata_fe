import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

export const useTotalStats = () => {
    return useQuery({
        queryKey: [QUERY_KEY.TOTAL_STATS],
        queryFn: async () => {
            const { data } = await instance.get(STATS_ENDPOINT.TOTAL);
            return data;
        },
    });
};

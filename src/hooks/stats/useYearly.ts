import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

export const useYearlyStats = () =>
    useQuery({
        queryKey: [QUERY_KEY.YEARLY_STATS],
        queryFn: async () => {
            const { data } = await instance.get(STATS_ENDPOINT.YEARLY_STATS);
            return data;
        },
    });

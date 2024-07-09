import { useQuery } from '@tanstack/react-query';
import { STATS_ENDPOINT } from '~/constants/endpoint';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

export const useOrderMonthly = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDER_MONTHLY],
        queryFn: async () => {
            const { data } = await instance.get(STATS_ENDPOINT.ORDER_MONTHLY);
            return data;
        },
    });
};

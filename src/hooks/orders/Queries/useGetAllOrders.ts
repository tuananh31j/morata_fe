import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { Params } from '~/types/Api';
import instance from '~/utils/api/axiosIntance';

const useGetAllOrders = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, ...Object.values(params)],
        queryFn: async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await instance<Promise<any>>({
                method: 'GET',
                url: '/orders',
                params,
            });
            return result && result.data ? result.data : null;
        },
    });
};

export default useGetAllOrders;

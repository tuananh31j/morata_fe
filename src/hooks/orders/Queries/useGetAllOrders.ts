import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

const useGetAllOrders = (params?: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS],
        queryFn: async () => {
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

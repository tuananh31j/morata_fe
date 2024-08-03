import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

const useOrderDetails = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, id],
        queryFn: async () => {
            const response = await instance<any>({
                method: 'GET',
                url: `/orders/${id}`,
            });
            return response && response.data && response.data.data;
        },
    });
};

export default useOrderDetails;

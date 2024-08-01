import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const useGetAllOrders = (params?: any) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS],
        queryFn: () => orderService.getAllOrders(params),
    });
};

export default useGetAllOrders;

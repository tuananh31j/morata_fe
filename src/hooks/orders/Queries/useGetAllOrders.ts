import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const useGetAllOrders = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS],
        queryFn: () => orderService.getAllOrders(),
    });
};

export default useGetAllOrders;

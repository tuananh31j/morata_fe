import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const useGetMyOrders = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS],
        queryFn: () => orderService.myOrder(),
    });
};

export default useGetMyOrders;

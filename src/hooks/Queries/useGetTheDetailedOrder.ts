import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const useGetTheDetailedOrder = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, id],
        queryFn: () => orderService.orderDetails(id),
    });
};

export default useGetTheDetailedOrder;

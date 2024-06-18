import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const useGetAllOrdersStatus = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS],
        queryFn: () => orderService.orderStatus,
    });
};

export default useGetAllOrdersStatus;

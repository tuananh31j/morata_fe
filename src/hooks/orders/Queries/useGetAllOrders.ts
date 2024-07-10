import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import { IOrderParams } from '~/types/Order';

const useGetAllOrders = (params: IOrderParams) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, ...Object.values(params)],
        queryFn: () => orderService.getAllOrders(params),
    });
};

export default useGetAllOrders;

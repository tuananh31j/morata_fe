import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import { IPagination } from '~/types/Api';
import { IOrderParams } from '~/types/Order';
import { removeNullKeys } from '~/utils/removeKeyNull';

const useGetAllOrders = (params: IOrderParams, pagination: IPagination) => {
    const removeQueryNull = removeNullKeys(params);
    const query = { ...removeQueryNull, ...pagination };
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS, ...Object.values(params), ...Object.values(pagination)],
        queryFn: () => orderService.getAllOrders(query),
    });
};

export default useGetAllOrders;

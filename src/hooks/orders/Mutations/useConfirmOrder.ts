import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';
import useFilterOrder from '~/hooks/_common/useFilterOrder';

export default function useConfirmOrder() {
    const queryClient = useQueryClient();
    const { queryParams, pagination } = useFilterOrder();
    return useMutation({
        mutationKey: ['CONFIRM_ORDER'],
        mutationFn: (id: string) => orderService.confirmOrder(id),
        onSuccess: (_, id) => {
            showMessage('Order confirmed successfully.', 'success');
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS, id] });
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.ORDERS, ...Object.values(queryParams), ...Object.values(pagination)],
                    queryFn: () => orderService.getAllOrders(),
                });
            }, 500);
        },
        onError: () => {
            showMessage('Order confirmation failed.', 'error');
        },
    });
}

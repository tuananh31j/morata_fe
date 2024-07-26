import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';

export default function useFinishAnOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['FINISH_ORDER'],
        mutationFn: (id: string) => orderService.finishOrder(id),
        onSuccess: (_, id) => {
            showMessage('Order is done.', 'success');
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS, id] });
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.ORDERS],
                    queryFn: () => orderService.getAllOrders(),
                });
            }, 500);
        },
        onError: () => {
            showMessage('Order change to done failed.', 'error');
        },
    });
}

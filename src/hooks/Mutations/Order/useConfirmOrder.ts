import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';

export default function useConfirmOrder(orderId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['CONFIRM_ORDER'],
        mutationFn: (id: string) => orderService.confirmOrder(id),
        onSuccess: () => {
            showMessage('Order confirmed successfully.', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
            setTimeout(() => {
                queryClient.prefetchQuery({ queryKey: [QUERY_KEY.ORDERS], queryFn: () => orderService.getAllOrders() });
            }, 300);
        },
        onError: () => {
            showMessage('Order confirmation failed.', 'error');
        },
    });
}

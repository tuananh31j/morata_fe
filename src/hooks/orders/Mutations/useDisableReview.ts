import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

export default function useDisabledReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { orderId: string; productVariationId: string; productId: string }) =>
            orderService.disabledReview(data),
        onSuccess(res) {
            const orderId = res?.data.data.orderId;
            if (!res.data.data.isReviewable) {
                showMessage(res.data.message, 'warning');
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS, orderId] });
        },
        onError: (error: errorResponse) => {
            console.log(error.response.data.message);
        },
    });
}

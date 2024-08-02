import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

const useCancelOrder = (orderId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reason: string) =>
            instance({
                url: '/orders/cancel',
                method: 'PATCH',
                data: { orderId, description: reason },
            }),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
    });
};

export default useCancelOrder;

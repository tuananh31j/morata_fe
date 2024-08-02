import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosIntance';

export const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) =>
            instance({
                method: 'PATCH',
                url: '/orders/confirm',
                data: { orderId },
            }),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
    });
};

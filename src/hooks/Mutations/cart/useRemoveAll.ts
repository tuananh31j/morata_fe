import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

export const useMutationRemoveAll = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['REMOVE'],
        mutationFn: (userId: { userId: string }) => cartService.removeAllCart(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

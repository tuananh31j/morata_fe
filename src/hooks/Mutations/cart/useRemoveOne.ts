import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationRemoveItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['REMOVEITEMS'],
        mutationFn: (payload: IActionCartPayload) => cartService.removeCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

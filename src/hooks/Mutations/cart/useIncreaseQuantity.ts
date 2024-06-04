import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationIncreaseCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['INCREASECART'],
        mutationFn: (payload: IActionCartPayload) => cartService.increase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

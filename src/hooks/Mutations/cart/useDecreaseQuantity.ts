import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationDecreaseCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['DECREASECART'],
        mutationFn: (body: IActionCartPayload) => cartService.decrease(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

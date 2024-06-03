import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';
import { HandleCart } from '~/types/Cart';

export const useMutationDecreaseCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['DECREASECART'],
        mutationFn: (body: HandleCart) => cartService.decrease(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CART'],
            });
        },
    });
};

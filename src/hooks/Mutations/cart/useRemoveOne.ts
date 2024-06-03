import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';
import { HandleCart } from '~/types/Cart';

export const useMutationRemoveItem = () => {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationKey: ['REMOVEITEMS'],
        mutationFn: (payload: HandleCart) => cartService.removeCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CART'],
            });
        },
    });
    return { mutate, ...rest };
};

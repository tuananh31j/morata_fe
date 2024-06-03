import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';

export const useMutationIncreaseCart = () => {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationKey: ['INCREASECART'],
        mutationFn: (payload: any) => cartService.increase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['CART'],
            });
        },
    });
    return { mutate, ...rest };
};

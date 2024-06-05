import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

export const useMutationIncreaseCart = () => {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationKey: ['INCREASECART'],
        mutationFn: (payload: any) => cartService.increase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
    return { mutate, ...rest };
};

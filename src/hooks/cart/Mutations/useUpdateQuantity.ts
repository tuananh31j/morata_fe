import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { IAddCartPayload } from '~/types/cart/CartPayload';

export const useUpdateQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['UPDATE_QUANTITY'],
        mutationFn: (payload: IAddCartPayload) => cartService.updateQuantity(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

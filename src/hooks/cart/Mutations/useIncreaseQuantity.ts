import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { RootState } from '~/store/store';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationIncreaseCart = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const { mutate: increase, ...rest } = useMutation({
        mutationKey: ['INCREASECART'],
        mutationFn: (payload: IActionCartPayload) => cartService.increase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
    const handleIncreaseQuantity = (id: string) => {
        if (user) {
            const data = {
                productId: id,
                userId: user._id,
            };
            increase(data);
        }
    };
    return { handleIncreaseQuantity, ...rest };
};

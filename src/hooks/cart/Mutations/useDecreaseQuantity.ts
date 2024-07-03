import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { RootState } from '~/store/store';
import { IActionCartPayload } from '~/types/cart/CartPayload';

export const useMutationDecreaseCart = () => {
    const queryClient = useQueryClient();
    const user = useSelector((state: RootState) => state.authReducer.user);

    const { mutate: decrease, ...rest } = useMutation({
        mutationKey: ['DECREASECART'],
        mutationFn: (body: IActionCartPayload) => cartService.decrease(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
    const handleDecreaseQuantity = (id: string) => {
        if (user) {
            const data = {
                productId: id,
                userId: user._id,
            };
            decrease(data);
        }
    };
    return { ...rest, handleDecreaseQuantity };
};
